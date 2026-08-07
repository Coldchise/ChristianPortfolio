import { useEffect, useRef, useState } from "react";
import { Bot, Send, Sparkles, X } from "lucide-react";
import { apiFetch } from "../lib/api";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const STARTER_QUESTIONS = [
  "Who is Christian Vergara?",
  "What projects did Christian Vergara Create?",
  "What is his Contact Details?",
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi! 👋 I'm Christian Vergara's AI Assistant. Ask me about his projects, technical stack, experience, or personal interests!",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend ?? input).trim();
    if (!text || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    if (!textToSend) setInput("");
    setIsLoading(true);

    try {
      // Send conversation history to backend chat API
      const apiPayload = newMessages
        .filter((m) => m.id !== "welcome")
        .map((m) => ({ role: m.role, content: m.content }));

      // If payload is empty (e.g. only welcome message previously), send current userMsg
      const messagesForApi =
        apiPayload.length > 0
          ? apiPayload
          : [{ role: userMsg.role, content: userMsg.content }];

      const data = await apiFetch<{ reply: string }>("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: messagesForApi }),
      });

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.reply,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "Sorry, I couldn't process your request right now. Please try again or contact Christian directly at yvergarachristian1@gmail.com.",
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Toggle AI Assistant Chat"
        className="cursor-target fixed bottom-6 right-6 z-[250] flex h-14 w-14 items-center justify-center rounded-full bg-[#141917] border border-[#5ed29c]/40 text-[#5ed29c] shadow-[0_8px_32px_rgba(0,0,0,0.6),0_0_20px_rgba(94,210,156,0.3)] transition-all duration-300 hover:scale-105 hover:border-[#5ed29c] hover:bg-[#1b221f] active:scale-95"
      >
        {isOpen ? (
          <X size={24} className="text-white" />
        ) : (
          <div className="relative">
            <Bot size={26} />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5ed29c] opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#5ed29c]" />
            </span>
          </div>
        )}
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-[250] flex h-[540px] max-h-[80vh] w-[calc(100vw-2rem)] sm:w-[400px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0c0f0e]/95 backdrop-blur-2xl shadow-[0_24px_80px_rgba(0,0,0,0.85),0_0_50px_rgba(94,210,156,0.15)] animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 bg-[#121614]/90 px-4 py-3.5">
            <div className="flex items-center gap-3">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-[#5ed29c]/15 border border-[#5ed29c]/30 text-[#5ed29c]">
                <Bot size={20} />
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-[#5ed29c] ring-2 ring-[#0c0f0e]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 font-inter text-[14px] font-semibold text-white">
                  Christian's AI
                  <Sparkles size={14} className="text-[#5ed29c]" />
                </div>
                <div className="font-mono text-[10px] text-white/40">
                  Portfolio Assistant • Online
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1.5 text-white/50 transition duration-150 hover:bg-white/10 hover:text-white"
              aria-label="Close Chat"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 no-scrollbar">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.role === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed font-inter ${
                    msg.role === "user"
                      ? "bg-[#5ed29c] text-black font-medium rounded-br-xs shadow-[0_4px_14px_rgba(94,210,156,0.25)]"
                      : "bg-[#181c1a] text-white/90 border border-white/10 rounded-bl-xs shadow-md"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Starter Questions (Shown when only welcome message or few messages exist) */}
            {messages.length <= 2 && !isLoading && (
              <div className="pt-2 flex flex-col gap-2">
                <div className="font-mono text-[10px] uppercase tracking-wider text-white/40 mb-1">
                  Suggested Questions
                </div>
                {STARTER_QUESTIONS.map((question, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(question)}
                    className="cursor-target text-left rounded-xl border border-white/10 bg-[#141816] px-3.5 py-2 font-inter text-[12px] text-white/80 transition-all hover:border-[#5ed29c]/50 hover:bg-[#1b211e] hover:text-[#5ed29c]"
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex items-start">
                <div className="rounded-2xl rounded-bl-xs border border-white/10 bg-[#181c1a] px-4 py-3 text-white/60">
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#5ed29c]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#5ed29c] [animation-delay:0.2s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#5ed29c] [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="border-t border-white/10 bg-[#121614]/90 p-3 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Christian..."
              disabled={isLoading}
              className="flex-1 rounded-xl border border-white/10 bg-[#0a0d0c] px-3.5 py-2 font-inter text-[13px] text-white placeholder-white/40 focus:border-[#5ed29c]/60 focus:outline-none disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="cursor-target flex h-9 w-9 items-center justify-center rounded-xl bg-[#5ed29c] text-black transition-all hover:bg-[#6ee6ad] active:scale-95 disabled:opacity-40 disabled:hover:bg-[#5ed29c]"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
