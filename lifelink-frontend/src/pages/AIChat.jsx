import { useState } from "react";
import api from "../services/api";

function AIChat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm LifeLink AI. Ask me anything about blood donation, emergency requests, eligibility, or health tips.",
    },
  ]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = {
      role: "user",
      content: message,
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await api.post("/api/ai/chat", {
        message,
      });

      const data = response.data;

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.response,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, AI service unavailable.",
        },
      ]);
    }

    setMessage("");
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <div className="bg-slate-900 text-white px-4 py-5 sm:px-6">
        <h1 className="text-2xl font-bold">🤖 LifeLink AI Assistant</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-200">
          Chat with LifeLink AI for blood donation guidance, emergency help, donor matching, and health recommendations.
        </p>
      </div>

      <main className="flex-1 overflow-hidden px-4 py-6 sm:px-6">
        <div className="mx-auto flex h-full max-w-4xl flex-col gap-4">
          <div className="flex-1 space-y-4 overflow-y-auto pr-1">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`max-w-full rounded-3xl p-4 shadow-sm sm:max-w-[80%] ${
                  msg.role === "user"
                    ? "ml-auto bg-sky-600 text-white"
                    : "bg-white text-slate-900"
                }`}
              >
                {msg.content}
              </div>
            ))}
          </div>
        </div>
      </main>

      <div className="border-t border-slate-200 bg-white px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-4xl flex-col gap-3 sm:flex-row">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            placeholder="Ask LifeLink AI..."
          />
          <button
            onClick={sendMessage}
            className="inline-flex h-fit items-center justify-center rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default AIChat;
