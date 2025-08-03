'use client';

import { useState } from 'react';
import { createWorker, PSM, OEM } from 'tesseract.js';
import { Button } from '../../components/ui/button';

// Language options for Tesseract.js
const LANGUAGE_OPTIONS = [
  { code: 'eng', name: 'English', flag: '🇺🇸' },
  { code: 'spa', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fra', name: 'French', flag: '🇫🇷' },
  { code: 'deu', name: 'German', flag: '🇩🇪' },
  { code: 'ita', name: 'Italian', flag: '🇮🇹' },
  { code: 'por', name: 'Portuguese', flag: '🇵🇹' },
  { code: 'rus', name: 'Russian', flag: '🇷🇺' },
  { code: 'chi_sim', name: 'Chinese (Simplified)', flag: '🇨🇳' },
  { code: 'chi_tra', name: 'Chinese (Traditional)', flag: '🇹🇼' },
  { code: 'jpn', name: 'Japanese', flag: '🇯🇵' },
  { code: 'kor', name: 'Korean', flag: '🇰🇷' },
  { code: 'ara', name: 'Arabic', flag: '🇸🇦' },
  { code: 'hin', name: 'Hindi', flag: '🇮🇳' },
  { code: 'tha', name: 'Thai', flag: '🇹🇭' },
  { code: 'vie', name: 'Vietnamese', flag: '🇻🇳' },
  { code: 'nld', name: 'Dutch', flag: '🇳🇱' },
  { code: 'swe', name: 'Swedish', flag: '🇸🇪' },
  { code: 'nor', name: 'Norwegian', flag: '🇳🇴' },
  { code: 'dan', name: 'Danish', flag: '🇩🇰' },
  { code: 'fin', name: 'Finnish', flag: '🇫🇮' },
  { code: 'pol', name: 'Polish', flag: '🇵🇱' },
  { code: 'ces', name: 'Czech', flag: '🇨🇿' },
  { code: 'hun', name: 'Hungarian', flag: '🇭🇺' },
  { code: 'tur', name: 'Turkish', flag: '🇹🇷' },
  { code: 'heb', name: 'Hebrew', flag: '🇮🇱' },
  { code: 'ukr', name: 'Ukrainian', flag: '🇺🇦' },
  { code: 'bul', name: 'Bulgarian', flag: '🇧🇬' },
  { code: 'hrv', name: 'Croatian', flag: '🇭🇷' },
  { code: 'slk', name: 'Slovak', flag: '🇸🇰' },
  { code: 'slv', name: 'Slovenian', flag: '🇸🇮' },
  { code: 'srp', name: 'Serbian (Cyrillic)', flag: '🇷🇸' },
  { code: 'srp_latn', name: 'Serbian (Latin)', flag: '🇷🇸' },
  { code: 'auto', name: 'Auto-detect', flag: '🌐' }
];

// Optimal dimensions based on Tesseract research
const OPTIMAL_DPI = 300;
const MIN_TEXT_HEIGHT = 20;
const MAX_IMAGE_DIMENSION = 2000;
const MIN_EFFECTIVE_DIMENSION = 1000;

// Advanced image preprocessing with multiple techniques
const preprocessImage = (imageFile: File): Promise<Blob | null> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          console.error("Could not get 2D context for canvas.");
          resolve(null);
          return;
        }

        let { width: originalWidth, height: originalHeight } = img;
       
        // --- Step 1: Calculate optimal dimensions for 300 DPI equivalent ---
        let newWidth = originalWidth;
        let newHeight = originalHeight;
       
        // Calculate scale factor to achieve effective 300 DPI
        const dpiScaleFactor = OPTIMAL_DPI / 72;
       
        // Apply DPI scaling first
        newWidth = Math.round(originalWidth * dpiScaleFactor);
        newHeight = Math.round(originalHeight * dpiScaleFactor);
       
        // Then apply size constraints
        if (newWidth > MAX_IMAGE_DIMENSION || newHeight > MAX_IMAGE_DIMENSION) {
          const aspectRatio = newWidth / newHeight;
          if (newWidth > newHeight) {
            newWidth = MAX_IMAGE_DIMENSION;
            newHeight = Math.round(MAX_IMAGE_DIMENSION / aspectRatio);
          } else {
            newHeight = MAX_IMAGE_DIMENSION;
            newWidth = Math.round(MAX_IMAGE_DIMENSION * aspectRatio);
          }
        }
       
        // Ensure minimum dimensions for text recognition
        if (newWidth < MIN_EFFECTIVE_DIMENSION || newHeight < MIN_EFFECTIVE_DIMENSION) {
          const aspectRatio = newWidth / newHeight;
          if (aspectRatio > 1) {
            newWidth = Math.max(newWidth, MIN_EFFECTIVE_DIMENSION);
            newHeight = Math.round(newWidth / aspectRatio);
          } else {
            newHeight = Math.max(newHeight, MIN_EFFECTIVE_DIMENSION);
            newWidth = Math.round(newHeight * aspectRatio);
          }
        }

        canvas.width = newWidth;
        canvas.height = newHeight;

        // --- Step 2: High-quality image rendering ---
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, newWidth, newHeight);

        // --- Step 3: Convert to grayscale with simple thresholding ---
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
       
        // Simple but effective preprocessing
        for (let i = 0; i < data.length; i += 4) {
          // Convert to grayscale using luminance formula
          const gray = Math.round(0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]);
         
          // Apply threshold for binarization
          const threshold = 128;
          const binaryValue = gray > threshold ? 255 : 0;
         
          data[i] = binaryValue;
          data[i + 1] = binaryValue;
          data[i + 2] = binaryValue;
        }
       
        ctx.putImageData(imageData, 0, 0);

        // --- Step 4: Add border for better recognition ---
        const borderSize = 20;
        const borderedCanvas = document.createElement('canvas');
        const borderedCtx = borderedCanvas.getContext('2d');
       
        if (borderedCtx) {
          borderedCanvas.width = canvas.width + (borderSize * 2);
          borderedCanvas.height = canvas.height + (borderSize * 2);
         
          // Fill with white background
          borderedCtx.fillStyle = 'white';
          borderedCtx.fillRect(0, 0, borderedCanvas.width, borderedCanvas.height);
         
          // Draw the processed image with border
          borderedCtx.drawImage(canvas, borderSize, borderSize);
         
          // Convert to PNG format
          borderedCanvas.toBlob((blob) => {
            if (blob) {
              resolve(blob);
            } else {
              console.error("Failed to create blob from bordered canvas.");
              resolve(null);
            }
          }, 'image/png', 1.0);
        } else {
          canvas.toBlob((blob) => {
            resolve(blob);
          }, 'image/png', 1.0);
        }
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(imageFile);
  });
};

// Auto-detect language based on character patterns
const detectLanguage = (text: string): string => {
  // Simple language detection based on character sets
  const patterns = [
    { code: 'chi_sim', pattern: /[\u4e00-\u9fff]/ },
    { code: 'chi_tra', pattern: /[\u4e00-\u9fff]/ },
    { code: 'jpn', pattern: /[\u3040-\u309f\u30a0-\u30ff\u4e00-\u9fff]/ },
    { code: 'kor', pattern: /[\uac00-\ud7af\u1100-\u11ff\u3130-\u318f\ua960-\ua97f\ud7b0-\ud7ff]/ },
    { code: 'ara', pattern: /[\u0600-\u06ff\u0750-\u077f\u08a0-\u08ff\ufb50-\ufdff\ufe70-\ufeff]/ },
    { code: 'rus', pattern: /[\u0400-\u04ff]/ },
    { code: 'hin', pattern: /[\u0900-\u097f]/ },
    { code: 'tha', pattern: /[\u0e00-\u0e7f]/ },
    { code: 'heb', pattern: /[\u0590-\u05ff]/ }
  ];

  for (const { code, pattern } of patterns) {
    if (pattern.test(text)) {
      return code;
    }
  }
  
  return 'eng'; // Default to English
};

// Get language-specific OCR parameters
const getLanguageParameters = (languageCode: string) => {
  const baseParams = {
    tessedit_pageseg_mode: PSM.AUTO,
    tessedit_ocr_engine_mode: OEM.LSTM_ONLY,
    preserve_interword_spaces: '1',
  };

  // Language-specific optimizations
  const languageParams: { [key: string]: any } = {
    'chi_sim': {
      ...baseParams,
      tessedit_pageseg_mode: PSM.SINGLE_BLOCK,
      tessedit_char_whitelist: '',
    },
    'chi_tra': {
      ...baseParams,
      tessedit_pageseg_mode: PSM.SINGLE_BLOCK,
      tessedit_char_whitelist: '',
    },
    'jpn': {
      ...baseParams,
      tessedit_pageseg_mode: PSM.SINGLE_BLOCK,
      tessedit_char_whitelist: '',
    },
    'kor': {
      ...baseParams,
      tessedit_pageseg_mode: PSM.SINGLE_BLOCK,
    },
    'ara': {
      ...baseParams,
      tessedit_pageseg_mode: PSM.SINGLE_BLOCK,
    },
    'rus': {
      ...baseParams,
      tessedit_char_whitelist: '',
    },
    'srp': {
      ...baseParams,
      tessedit_char_whitelist: '', // Cyrillic characters
    },
    'srp_latn': {
      ...baseParams,
      tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzČčĆćĐđŠšŽž0123456789.,!?;:()[]{}"-\' ',
    }
  };

  return languageParams[languageCode] || baseParams;
};

const OcrReader = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [processedImageUrl, setProcessedImageUrl] = useState<string>('');
  const [ocrResult, setOcrResult] = useState<string>('');
  const [ocrStatus, setOcrStatus] = useState<string>('');
  const [confidence, setConfidence] = useState<number>(0);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('auto');
  const [detectedLanguage, setDetectedLanguage] = useState<string>('');

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
      setOcrResult('');
      setOcrStatus('');
      setProcessedImageUrl('');
      setConfidence(0);
      setDetectedLanguage('');
    }
  };

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(event.target.value);
  };

  const readImageText = async () => {
    if (!selectedImage) return;

    setOcrStatus('Preprocessing image with advanced filters...');
   
    try {
      const preprocessedBlob = await preprocessImage(selectedImage);

      if (!preprocessedBlob) {
        setOcrStatus('Image preprocessing failed. Please try another image.');
        return;
      }

      const processedUrl = URL.createObjectURL(preprocessedBlob);
      setProcessedImageUrl(processedUrl);

      const imageToProcess = new File([preprocessedBlob], 'processed-image.png', { type: 'image/png' });

      // Determine which language to use
      let languageToUse = selectedLanguage;
      
      // Handle Serbian Latin script mapping
      if (selectedLanguage === 'srp_latn') {
        // Use Croatian model for Serbian Latin script (they're very similar)
        languageToUse = 'hrv';
      }
      
      if (selectedLanguage === 'auto') {
        setOcrStatus('Auto-detecting language...');
        // First pass with English to get some text for detection
        const quickWorker = await createWorker('eng');
        const quickResult = await quickWorker.recognize(imageToProcess);
        await quickWorker.terminate();
        
        const detectedLang = detectLanguage(quickResult.data.text);
        setDetectedLanguage(detectedLang);
        languageToUse = detectedLang;
        setOcrStatus(`Detected language: ${LANGUAGE_OPTIONS.find(lang => lang.code === detectedLang)?.name || 'Unknown'}`);
      }

      setOcrStatus(`Initializing OCR worker for ${selectedLanguage === 'auto' ? 
        (LANGUAGE_OPTIONS.find(lang => lang.code === languageToUse)?.name || languageToUse) : 
        (LANGUAGE_OPTIONS.find(lang => lang.code === selectedLanguage)?.name || selectedLanguage)}...`);
      
      const worker = await createWorker(languageToUse, OEM.LSTM_ONLY, {
        logger: m => {
          if (m.status === 'recognizing text') {
            setOcrStatus(`Analyzing text: ${(m.progress * 100).toFixed(0)}%`);
          } else {
            setOcrStatus(`OCR Status: ${m.status}`);
          }
        },
      });

      // Apply language-specific parameters
      const languageParams = getLanguageParameters(languageToUse);
      await worker.setParameters(languageParams);

      setOcrStatus('Performing advanced OCR analysis...');
     
      const {
        data: { text, confidence: ocrConfidence },
      } = await worker.recognize(imageToProcess);

      setOcrResult(text);
      setConfidence(ocrConfidence);
      
      // Show the language that was actually selected by the user, not the internal mapping
      const displayLanguage = selectedLanguage === 'auto' ? languageToUse : selectedLanguage;
      const langName = LANGUAGE_OPTIONS.find(lang => lang.code === displayLanguage)?.name || displayLanguage;
      setOcrStatus(`OCR Completed (${langName})! Confidence: ${ocrConfidence.toFixed(1)}%`);
     
      await worker.terminate();
     
    } catch (error) {
      console.error("Error during OCR recognition:", error);
      setOcrStatus('Error occurred during OCR processing. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center p-4 sm:p-6 md:p-8 bg-product-background text-product-foreground min-h-screen">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-product-secondary">
        Multi-Language OCR Reader
      </h1>
     
      <div className="text-center mb-6 p-4 bg-hero-product-background rounded-lg border border-product-border">
        <p className="text-sm text-product-foreground-accent">
          Advanced image preprocessing • Multi-language support • Neural network OCR • Auto-language detection
        </p>
      </div>

      {/* Language Selection */}
      <div className="mb-6 w-full max-w-md">
        <label className="block text-sm font-medium text-product-foreground mb-2">
          Select Language:
        </label>
        <select
          value={selectedLanguage}
          onChange={handleLanguageChange}
          className="w-full p-3 rounded-lg border border-product-border bg-hero-product-background text-product-foreground focus:outline-none focus:ring-2 focus:ring-product-primary-accent"
        >
          {LANGUAGE_OPTIONS.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.flag} {lang.name}
            </option>
          ))}
        </select>
        {detectedLanguage && selectedLanguage === 'auto' && (
          <p className="text-xs text-product-foreground-accent mt-1">
            Auto-detected: {LANGUAGE_OPTIONS.find(lang => lang.code === detectedLanguage)?.name}
          </p>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6 sm:mb-8 items-center w-full max-w-lg">
        <label className="w-full sm:w-auto px-4 py-2 rounded-lg bg-product-primary text-product-secondary font-semibold text-center cursor-pointer
                          transition-all duration-300 ease-in-out hover:bg-product-primary-accent hover:shadow-md hover:scale-105
                          focus-within:outline-none focus-within:ring-2 focus-within:ring-product-primary-accent focus-within:ring-opacity-50">
          Upload from Gallery
          <input
            type='file'
            accept='image/*'
            onChange={handleImageChange}
            className="hidden"
          />
        </label>

        <label className="w-full sm:w-auto px-4 py-2 rounded-lg bg-product-secondary text-product-primary font-semibold text-center cursor-pointer
                          transition-all duration-300 ease-in-out hover:bg-blue-800 hover:shadow-md hover:scale-105
                          focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-400 focus-within:ring-opacity-50">
          Open Camera App
          <input
            type='file'
            accept='image/*'
            capture='environment'
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
      </div>

      {selectedImage && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 w-full max-w-4xl">
          <div className="p-4 rounded-xl border border-product-border bg-hero-product-background shadow-product">
            <h3 className="text-lg font-semibold mb-3 text-product-foreground">Original Image</h3>
            <img
              src={URL.createObjectURL(selectedImage)}
              alt='Original content'
              className="max-w-full h-auto rounded-lg"
            />
          </div>
         
          {processedImageUrl && (
            <div className="p-4 rounded-xl border border-product-border bg-hero-product-background shadow-product">
              <h3 className="text-lg font-semibold mb-3 text-product-foreground">Processed Image</h3>
              <img
                src={processedImageUrl}
                alt='Processed content'
                className="max-w-full h-auto rounded-lg"
              />
            </div>
          )}
        </div>
      )}

      <div className="mb-8">
        <Button
          onClick={readImageText}
          disabled={!selectedImage || ocrStatus.includes('Processing') || ocrStatus.includes('Initializing') || ocrStatus.includes('Analyzing')}
          variant="file-action"
          className={selectedImage && !ocrStatus.includes('Processing') && !ocrStatus.includes('Initializing') && !ocrStatus.includes('Analyzing')
            ? 'bg-product-primary text-product-secondary hover:bg-product-primary-accent hover:shadow-product-hover hover:scale-105 cursor-pointer'
            : 'bg-gray-300 text-gray-600 cursor-not-allowed'}
        >
          Extract Text
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <div className="p-6 rounded-xl border border-product-border bg-hero-product-background shadow-product">
          <h3 className="font-bold text-xl mb-4 text-product-foreground flex items-center gap-2">
            Analysis Status
            {confidence > 0 && (
              <span className={`text-sm px-3 py-1 rounded-full ${
                confidence > 80 ? 'bg-green-100 text-green-800' :
                confidence > 60 ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {confidence.toFixed(1)}% confidence
              </span>
            )}
          </h3>
          <p className="text-product-foreground-accent">{ocrStatus || 'Ready to process image'}</p>
        </div>

        <div className="p-6 rounded-xl border border-product-border bg-hero-product-background shadow-product">
          <h3 className="font-bold text-xl mb-4 text-product-secondary">Extracted Text</h3>
          <div className="border border-product-border bg-hero-product-background p-4 rounded-lg text-left text-product-foreground-accent break-words whitespace-pre-wrap min-h-[150px] max-h-[400px] overflow-auto">
            {ocrResult ? (
              <span dangerouslySetInnerHTML={{
                __html: ocrResult
                  .replace(/\n/g, '<br />')
                  .replace(/[=,—,+,_]{2,}/g, ' ')
                  .replace(/\s+/g, ' ')
                  .trim()
              }} />
            ) : (
              <span className="text-product-foreground-accent opacity-60 italic">Extracted text will appear here...</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OcrReader;