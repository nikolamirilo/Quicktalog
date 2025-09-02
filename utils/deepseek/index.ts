import { layouts } from "@/constants"
import OpenAI from "openai"

const openai = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: process.env.DEEPSEEK_API_KEY,
})

export async function chatCompletion(prompt: string) {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: prompt }],
    model: "deepseek-chat",
  })
  return completion.choices[0].message.content
}

export function createGenerationPrompt(
  inputText: string,
  formData: any,
  isOcrMode: boolean
): string {
  const baseSchema = {
    services: [
      {
        name: "Name of category (e.g. lunch, breakfast, welness, etc.)",
        layout: isOcrMode ? "variant_3" : "variant_1",
        order: 1,
        items: [
          {
            name: "Item Name",
            description: "Description of Item",
            price: 12,
            image: "leave as empty string as I will populate this later via unsplash API",
          },
        ],
      },
    ],
  }

  if (isOcrMode) {
    return `
      Role: You are an expert in creating service offers (restaurant services, beauty center service offer, etc.).
      Based on the following prompt, generate a complete service offer configuration in JSON format.
      The JSON object should strictly follow the type definition from the project.
      
      Prompt: Create services array based on text extracted from service catalogue: ${inputText}
      
      Schema: ${JSON.stringify(baseSchema)}

    For layout use always variant_3

    Detect categories in text (breakfast, lunch, etc.) if you dont see it there group items by similarity. 

    General information about service catalogue: ${JSON.stringify(formData)}
      
      IMPORTANT REQUIREMENTS:
      1. Return ONLY the JSON object, no additional text, explanations, or formatting
      2. Start your response directly with { and end with }
      3. Service offer should be created in the language and alphabet of the text.
      4. Ensure the JSON is valid and well-formed  
      5. If you cannot find price for an item, you set price. Keep in mind currency and make sure price is not 0.
      6. Set order for each category starting from 1. Order items in logical way. They will be displayed in this ascending order.
      7. Wherecver you have string it should be valid string. It should not contain any special character like /,-,",' etc."
      `
  } else {
    const layoutData = layouts.map((l) => ({
      key: l.key,
      description: l.description,
    }))

    return `
    Role: You are an expert in creating service offers (restaurant services, beauty center service offer, etc.).
    Based on the following prompt, generate a complete service offer configuration in JSON format.
    The JSON object should strictly follow the type definition from the project.
    
    Prompt: ${inputText}
    
    Schema: ${JSON.stringify(baseSchema)}

  Layouts keys and description of each variant: ${JSON.stringify(layoutData)}. For drinks for example use without image.

  General information about service catalogue: ${JSON.stringify(formData)}
    
    IMPORTANT REQUIREMENTS:
    1. Return ONLY the JSON object, no additional text, explanations, or formatting
    2. Start your response directly with { and end with }
    3. Service offer should be created in the language and alphabet of the prompt.
    4. The services field should be an ARRAY of categories, NOT an object
    5. Add at least 3 categories with at least 5 items each
    6. Name all items in full name of the dish e.g. "Spaghetti Carbonara", "Caesar Salad", "Pizza Margarita" etc.
    7. Ensure the JSON is valid and well-formed
    8. Set order for each category starting from 1. Order items in logical way. They will be displayed in this ascending order.
    9. Wherecver you have string it should be valid string. It should not contain any special character like /,-,",' etc."
    `
  }
}
