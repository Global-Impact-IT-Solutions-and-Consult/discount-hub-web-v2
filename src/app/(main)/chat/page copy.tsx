"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  FiSend,
  FiUser,
  FiBox,
  FiShoppingBag,
  FiClock,
  FiTag,
  FiHelpCircle,
} from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "@/api/products.api";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  isTyping?: boolean;
};

interface QuickQuestion {
  id: string;
  text: string;
  category: "products" | "orders" | "promotions" | "help";
}

const Chat = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your AI shopping assistant. How can I help you find great deals today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Quick questions for user
  const [quickQuestions] = useState<QuickQuestion[]>([
    { id: "q1", text: "Show me trending products", category: "products" },
    { id: "q2", text: "Track my order", category: "orders" },
    { id: "q3", text: "Current promotions", category: "promotions" },
    { id: "q4", text: "How to return an item?", category: "help" },
  ]);

  // Fetch categories for product suggestions
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const userInput = input.trim();
      if (!userInput) return;

      // Add user message
      const userMessage: Message = {
        id: Date.now().toString(),
        content: userInput,
        sender: "user",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setIsTyping(true);

      try {
        // Simulate API call
        const response = await new Promise<{ response: string }>((resolve) => {
          setTimeout(() => {
            resolve({ response: getAIResponse(userInput) });
          }, 1000);
        });

        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: response.response,
          sender: "ai",
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, aiMessage]);
      } catch (error) {
        console.error("Error getting AI response:", error);
        const errorMessage: Message = {
          id: (Date.now() + 2).toString(),
          content: "Sorry, I encountered an error. Please try again later.",
          sender: "ai",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsTyping(false);
      }
    },
    [input]
  );

  // Define Category type for better type safety
  type Category = {
    id: string;
    name: string;
    // Add other category properties as needed
  };

  // Type the categories from the API
  type ApiCategories = Array<Category>;

  const getAIResponse = (userInput: string): string => {
    // Safely type the categories from the query
    const typedCategories = categories as unknown as ApiCategories | undefined;
    const input = userInput.toLowerCase();

    // Greetings
    if (
      /^(hi|hello|hey|greetings|good\s*(morning|afternoon|evening))/i.test(
        input
      )
    ) {
      return 'Hello! I\'m your shopping assistant. How can I help you find great deals today?';
    }

    // Help
    if (
      input.includes("help") ||
      input.includes("support") ||
      input.includes("assistance")
    ) {
      return 'I can help you with:\n• Finding products and deals\n• Tracking orders\n• Information about promotions\n• Returns and refunds\n• Account assistance\n\nWhat would you like help with?';
    }

    // Products
    if (
      input.includes("product") ||
      input.includes("item") ||
      input.includes("thing")
    ) {
      if (typedCategories && typedCategories.length > 0) {
        const categoryList = typedCategories
          .slice(0, 5)
          .map((cat: Category) => `• ${cat.name}`)
          .join("\n");
        return `Here are some popular categories you might like:\n${categoryList}\n\nWould you like to browse any of these categories?`;
      }
      return 'What type of product are you looking for? I can help you find the best deals!';
    }

    // Orders
    if (
      input.includes("order") ||
      input.includes("purchase") ||
      input.includes("track")
    ) {
      return 'To track your order, please provide your order number. You can also check the status in your account under "My Orders".';
    }

    // Promotions
    if (
      input.includes("sale") ||
      input.includes("discount") ||
      input.includes("promo") ||
      input.includes("deal")
    ) {
      return 'We have amazing deals going on right now! Check out our "Deals" section for the latest promotions and limited-time offers.';
    }

    // Returns
    if (
      input.includes("return") ||
      input.includes("refund") ||
      input.includes("exchange")
    ) {
      return 'You can return most items within 30 days of delivery. To start a return, please visit the "Returns Center" in your account or contact our customer service for assistance.';
    }

    // Thank you
    if (
      input.includes("thank") ||
      input.includes("thanks") ||
      input.includes("appreciate")
    ) {
      return "You're welcome! 😊 Is there anything else I can help you with?";
    }

    // Fallback response
    return "Thanks for your message! I'm here to help you with your shopping needs. You can ask me about products, orders, promotions, or any other questions you might have.";
  };

  // Format time for messages
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Handle quick question click
  const handleQuickQuestion = (question: string) => {
    setInput(question);
    // Small delay to allow input to update before submitting
    setTimeout(() => {
      const form = document.querySelector("form");
      if (form) {
        const submitEvent = new Event("submit", { cancelable: true });
        form.dispatchEvent(submitEvent);
      }
    }, 50);
  };

  // Define valid category types for quick questions
  type QuickQuestionCategory = "products" | "orders" | "promotions" | "help";

  // Get icon for quick question category
  const getCategoryIcon = (category: QuickQuestionCategory) => {
    switch (category) {
      case "products":
        return <FiShoppingBag className="mr-2" />;
      case "orders":
        return <FiClock className="mr-2" />;
      case "promotions":
        return <FiTag className="mr-2" />;
      case "help":
        return <FiHelpCircle className="mr-2" />;
      default:
        const _exhaustiveCheck: never = category;
        return null;
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-gray-50">
      {/* Header */}
      <div className="bg-brand-main text-white p-4 shadow-md">
        <h1 className="text-xl font-semibold flex items-center">
          <FiBox className="mr-2" /> AI Shopping Assistant
        </h1>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.2 }}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex flex-col max-w-[85%] p-3 rounded-lg shadow ${
                  message.sender === "user"
                    ? "bg-brand-main text-white rounded-br-none"
                    : "bg-white text-gray-800 rounded-bl-none"
                }`}
              >
                <div className="flex items-start">
                  {message.sender === "ai" && (
                    <div className="bg-brand-main/10 p-1.5 rounded-full mr-2">
                      <FiBox className="text-brand-main" />
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="whitespace-pre-line">{message.content}</p>
                    <span
                      className={`text-xs opacity-70 mt-1 block text-right ${
                        message.sender === "user"
                          ? "text-white/80"
                          : "text-gray-500"
                      }`}
                    >
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                  {message.sender === "user" && (
                    <div className="bg-white/20 p-1.5 rounded-full ml-2">
                      <FiUser className="text-white" />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex space-x-1 p-2 w-16 bg-white rounded-full shadow-sm ml-4"
          >
            <div className="w-2 h-2 rounded-full bg-brand-main animate-bounce"></div>
            <div
              className="w-2 h-2 rounded-full bg-brand-main animate-bounce"
              style={{ animationDelay: "150ms" }}
            ></div>
            <div
              className="w-2 h-2 rounded-full bg-brand-main animate-bounce"
              style={{ animationDelay: "300ms" }}
            ></div>
          </motion.div>
        )}

        {/* Quick Questions */}
        {messages.length <= 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-4"
          >
            <p className="text-sm text-gray-500 mb-2">Quick questions:</p>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((q) => (
                <button
                  key={q.id}
                  onClick={() => handleQuickQuestion(q.text)}
                  className="flex items-center px-3 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  {getCategoryIcon(q.category)}
                  {q.text}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="p-4 border-t bg-white">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-brand-main focus:border-transparent"
            aria-label="Type your message"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="bg-brand-main text-white p-3 rounded-full hover:bg-brand-main/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Send message"
          >
            <FiSend />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
