"use client";
import { sendEmail } from "@/actions/email";
import { useState } from "react";
import { Button } from '@/components/ui/button';

const Contact = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Email validation regex (simple version)
  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    const res = await sendEmail({
      message,
      email,
      name,
      subject: "New message from Service Catalogue Contact Form",
    });
    if(res == true){
        setIsOpen(true);
        setIsLoading(false);
        setName("");
        setMessage("");
        setEmail("");
    }else{
        alert("Error occured")
    }
  }

  return (
    <section
      id="contact"
      className="min-h-screen font-lora bg-product-background pt-32 md:pt-40 pb-32"
    >
      {/* Success Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-product-background rounded-2xl p-8 max-w-md mx-4 shadow-2xl border border-product-border">
            <div className="text-center">
              <div className="w-16 h-16 bg-product-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-product-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-product-foreground mb-2">
                Message Sent!
              </h3>
              <p className="text-product-foreground-accent mb-6">
                Thank you for reaching out! We have received your message and
                will respond to you via email shortly.
              </p>
              <Button
                onClick={() => setIsOpen(false)}
                variant="contact"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-product-foreground mb-4">
            Get In{" "}
            <span className="text-product-primary">
              Touch
            </span>
          </h1>
          <p className="text-xl text-product-foreground-accent max-w-2xl mx-auto">
            Ready to start your next project? We'd love to hear from you. Send
            us a message and we'll respond as soon as possible.
          </p>
        </div>

        {/* Contact Form */}
        <div className="bg-product-background rounded-3xl shadow-md p-8 md:p-12 border border-product-border">
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Name Field */}
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-product-foreground mb-2"
                >
                  Your Name
                </label>
                <div className="relative">
                  <input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-4 py-4 bg-product-background border-2 border-product-border rounded-xl text-product-foreground placeholder-product-foreground-accent/60 focus:outline-none focus:border-product-primary focus:bg-product-hover-background transition-all duration-300 shadow-product-shadow hover:shadow-product-hover-shadow"
                    required
                  />
                  <div className="absolute inset-y-0 right-4 flex items-center">
                    <svg
                      className="w-5 h-5 text-product-icon"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-product-foreground mb-2"
                >
                  Your Email
                </label>
                <div className="relative">
                  <input
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="john@example.com"
                    className={`w-full px-4 py-4 bg-product-background border-2 rounded-xl text-product-foreground placeholder-product-foreground-accent/60 focus:outline-none focus:border-product-primary focus:bg-product-hover-background transition-all duration-300 shadow-product-shadow hover:shadow-product-hover-shadow ${email && !isValidEmail(email) ? 'border-red-500' : 'border-product-border'}`}
                    required
                  />
                  <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 flex items-center">
                    <svg
                      className="w-5 h-5 text-product-icon"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                  </div>
                </div>
                <div style={{ minHeight: '1.25rem' }}>
                  {email && !isValidEmail(email) && (
                    <p className="text-xs text-red-500 mt-1 ml-1">Please enter a valid email address</p>
                  )}
                </div>
              </div>
            </div>

            {/* Message Field */}
            <div className="space-y-2">
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-product-foreground mb-2"
              >
                Your Message
              </label>
              <div className="relative">
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={6}
                  placeholder="Tell us about your project..."
                  className="w-full px-4 py-4 bg-product-background border-2 border-product-border rounded-xl text-product-foreground placeholder-product-foreground-accent/60 focus:outline-none focus:border-product-primary focus:bg-product-hover-background transition-all duration-300 shadow-product-shadow hover:shadow-product-hover-shadow resize-none"
                  required
                />
                <div className="absolute top-4 right-4">
                  <svg
                    className="w-5 h-5 text-product-icon"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <Button
                type="submit"
                disabled={isLoading || !name.trim() || !email.trim() || !message.trim() || !isValidEmail(email)}
                variant="contact"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-product-foreground"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </div>
                ) : (
                  <div
                    className="flex items-center justify-center"
                    onClick={handleSubmit}
                  >
                    Send Message
                    <svg
                      className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  </div>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-20">
          <div className="bg-product-secondary rounded-3xl shadow-product-shadow p-8 md:p-12 overflow-hidden relative">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-product-primary/10 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-product-primary/20 rounded-full translate-y-16 -translate-x-16"></div>

            <div className="relative z-10">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Ready to Connect?
                </h2>
                <p className="text-product-hover-background text-lg">
                  Reach out through any of these channels
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="group text-center">
                  <div className="relative">
                    <div className="w-16 h-16 bg-product-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-product-shadow">
                      <svg
                        className="w-8 h-8 text-product-foreground"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  </div>
                  <h3 className="font-bold text-white mb-2 text-xl">Email</h3>
                  <p className="text-product-hover-background text-lg">hello@digital-menu.com</p>
                  <div className="mt-4 h-1 bg-product-primary/20 rounded-full overflow-hidden">
                    <div className="h-full bg-product-primary rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                  </div>
                </div>

                <div className="group text-center">
                  <div className="relative">
                    <div className="w-16 h-16 bg-product-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-product-shadow">
                      <svg
                        className="w-8 h-8 text-product-foreground"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                  </div>
                  <h3 className="font-bold text-white mb-2 text-xl">Phone</h3>
                  <p className="text-product-hover-background text-lg">+1 (555) 123-4567</p>
                  <div className="mt-4 h-1 bg-product-primary/20 rounded-full overflow-hidden">
                    <div className="h-full bg-product-primary rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 delay-100"></div>
                  </div>
                </div>

                <div className="group text-center">
                  <div className="relative">
                    <div className="w-16 h-16 bg-product-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-product-shadow">
                      <svg
                        className="w-8 h-8 text-product-foreground"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  <h3 className="font-bold text-white mb-2 text-xl">Office</h3>
                  <p className="text-product-hover-background text-lg">New York, NY</p>
                  <div className="mt-4 h-1 bg-product-primary/20 rounded-full overflow-hidden">
                    <div className="h-full bg-product-primary rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 delay-200"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
