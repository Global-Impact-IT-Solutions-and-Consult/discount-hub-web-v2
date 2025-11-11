"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { FiSend, FiLoader } from "react-icons/fi";
import { createAIChat, getAIChat, sendAIChatMessage } from "@/api/products.api";
import { SparklesIcon } from "@heroicons/react/24/solid";

interface Message {
  _id: string;
  content: string;
  type: "USER" | "AI";
}

const Chat = () => {
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [chatId, setChatId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  // // Handle sending a message
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const messageContent = input.trim();

      if (!messageContent) return;
      if (!chatId) {
        console.error("No chat ID available");
        setError("No chat ID available");
        return;
      }

      try {
        // Add user message to local state immediately for better UX
        const userMessage: Message = {
          _id: `user_${Date.now()}`,
          content: messageContent,
          type: "USER",
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsTyping(true);

        // Send message to API
        const response = await sendAIChatMessage({
          chatId,
          message: messageContent,
        });

        console.log("AI response: ", response);

        // fetch the chat
        getAIChat({ chatId }).then((chat) => {
          setMessages(chat);
          setIsLoading(false);
        });
      } catch (error) {
        console.error("Error sending message:", error);
        const errorMessage: Message = {
          _id: `error_${Date.now()}`,
          content: "I'm sorry, I encountered an error. Please try again later.",
          type: "AI",
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsTyping(false);
      }
    },
    [input, chatId]
  );

  // // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Get chat ID from localStorage or create a new chat
  useEffect(() => {
    const savedChatId = localStorage.getItem("aiChatId");
    if (savedChatId) {
      setChatId(savedChatId);
      // fetch the chat
      getAIChat({ chatId: savedChatId }).then((chat) => {
        setMessages(chat);
        setIsLoading(false);
      });
    } else {
      createAIChat().then((chatId) => {
        setChatId(chatId);
        localStorage.setItem("aiChatId", chatId);
        setIsLoading(false);
      });
    }
  }, []);

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-gray-50">
      {/* Header */}
      <div className="bg-brand-main text-white p-4 shadow-md">
        <h1 className="text-xl font-semibold flex items-center">
          <SparklesIcon className="w-5 h-5 mr-2" />
          AI Shopping Assistant
        </h1>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 mt-2">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.type === "USER" ? "justify-end" : "justify-start"}`}
          >
            <div className="flex flex-col max-w-[80%] space-y-1">
              <div
                className={`p-3 rounded-2xl shadow-sm ${
                  message.type === "USER"
                    ? "bg-brand-main text-white rounded-tr-none"
                    : "bg-white text-gray-800 border border-gray-200 rounded-tl-none"
                }`}
              >
                {message.content.split(/\n/).map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    {index < message.content.split(/\n/).length - 1 ? (
                      <br />
                    ) : null}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Typing indicator - positioned after messages */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex flex-col max-w-[80%] space-y-1">
              <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-200 rounded-tl-none">
                <div className="flex items-center justify-center space-x-1">
                  <div className="w-2 h-2 rounded-full bg-brand-main animate-bounce"></div>
                  <div
                    className="w-2 h-2 rounded-full bg-brand-main animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 rounded-full bg-brand-main animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      {isLoading ? (
        <div className="p-4 border-t flex items-center justify-center gap-2 bg-white text-center text-gray-500">
          Loading chat <FiLoader className="animate-spin" />
        </div>
      ) : error ? (
        <div className="p-4 border-t bg-white text-center text-red-500">
          {error}
        </div>
      ) : (
        <>
          <form
            onSubmit={handleSubmit}
            className="p-4 px-0 border-t bg-brand-white"
          >
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e as any);
                  }
                }}
                placeholder="Type your message..."
                className="flex-1 p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-brand-main focus:border-transparent"
                aria-label="Type your message"
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping || !chatId}
                className="bg-brand-main text-white flex items-center justify-center w-12 h-12 rounded-full hover:bg-brand-main/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                {isTyping ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <FiSend className="w-6 h-6" />
                )}
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default Chat;
