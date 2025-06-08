import React, { useState, useRef } from "react";
import { FaMicrophone, FaPaperPlane, FaPlay, FaPause } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const [speakingMessageId, setSpeakingMessageId] = useState(null);
  const utteranceRef = useRef(null);

  const handleSendMessage = async (text, sender = "user", isVoice = false) => {
    if (!text.trim()) return;

    const userMessage = { text, sender, id: Date.now() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // const response = await fetch("http://127.0.0.1:5000/ask", {
      const response = await fetch("https://server-bot-i1cf.onrender.com/ask",{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: text }),
      });

      const data = await response.json();

      if (response.ok && data.status === "success") {
        const botMessage = {
          text: data.data.answer,
          sender: "bot",
          locations: data.data.locations || [],
          image_url: data.data.image_url || null, // New field for image URL
          id: Date.now() + 1,
        };
        setMessages((prev) => [...prev, botMessage]);

        if (isVoice) {
          speak(botMessage.id, data.data.answer);
        }
      } else {
        setMessages((prev) => [
          ...prev,
          { text: "Error: Could not get response", sender: "bot", id: Date.now() },
        ]);
      }
    } catch (error) {
      console.error("API Error:", error);
      setMessages((prev) => [
        ...prev,
        { text: "Error: Something went wrong!", sender: "bot", id: Date.now() },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error("Speech Recognition API not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      setIsListening(false);
      handleSendMessage(speechResult, "user", true);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    recognition.start();
    setIsListening(true);
  };

  const speak = (messageId, text) => {
    if ("speechSynthesis" in window) {
      if (utteranceRef.current) {
        window.speechSynthesis.cancel();
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.onend = () => {
        setSpeakingMessageId(null);
        utteranceRef.current = null;
      };
      utteranceRef.current = utterance;
      setSpeakingMessageId(messageId);
      window.speechSynthesis.speak(utterance);
    } else {
      console.error("Speech synthesis not supported in this browser.");
    }
  };

  const toggleSpeech = (messageId, text) => {
    if (speakingMessageId === messageId) {
      window.speechSynthesis.pause();
      setSpeakingMessageId(null);
    } else if (window.speechSynthesis.paused && utteranceRef.current) {
      window.speechSynthesis.resume();
      setSpeakingMessageId(messageId);
    } else {
      speak(messageId, text);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(input);
    }
  };

  return (
    <div className="h-full flex flex-col px-2 sm:px-20 lg:px-40 xl:px-80">
      {/* Chat Messages */}
      <div className="flex-1 p-4 rounded-lg">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`mb-6 ${msg.sender === "user" ? "text-right" : "text-left"}`}
          >
            <div className="flex items-start">
              {msg.sender === "bot" && (
                <button
                  onClick={() => toggleSpeech(msg.id, msg.text)}
                  className="mr-2 p-2 rounded-full bg-gray-300 hover:bg-gray-400"
                >
                  {speakingMessageId === msg.id && !window.speechSynthesis.paused ? (
                    <FaPause className="text-sm" />
                  ) : (
                    <FaPlay className="text-sm" />
                  )}
                </button>
              )}
              <span
                className={`inline-block px-4 py-3 rounded-lg ${
                  msg.sender === "user" ? "bg-gray-900 text-white" : "bg-gray-200 text-black"
                }`}
              >
                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                  {msg.text}
                </ReactMarkdown>
              </span>
            </div>

            {/* Show image if bot message includes one */}
            {msg.sender === "bot" && msg.image_url && (
              <div className="mt-4">
                <img
                  src={msg.image_url}
                  alt="Bot response"
                  className="w-full max-w-md h-auto object-cover rounded-lg shadow-md"
                />
              </div>
            )}

            {/* Show locations if bot message includes them */}
            {msg.sender === "bot" && msg.locations?.length > 0 && (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {msg.locations.map((loc, locIndex) => (
                  <div
                    key={locIndex}
                    className="bg-white shadow-md border rounded-lg overflow-hidden"
                  >
                    {loc.image_url && (
                      <img
                        src={loc.image_url}
                        alt={loc.name}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-3">
                      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                        {loc.name}
                      </ReactMarkdown>
                      <a
                        href={loc.map_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline text-sm"
                      >
                        View on Google Maps
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        {loading && <div className="text-gray-500 text-center mt-2">Bot is typing...</div>}
      </div>

      {/* Input Section */}
      <div className="mb-10 flex items-center">
        <div className="relative w-full">
          <textarea
            className="w-full flex-1 p-4 border rounded-lg resize-none"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            name="question"
            rows="1"
          />
          {input === "" && (
            <span
              onClick={startListening}
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
            >
              {isListening ? "Listening..." : <FaMicrophone className="text-xl" />}
            </span>
          )}
        </div>

        {/* Send Button */}
        <button
          className="ml-2 mb-2 px-5 py-4 bg-gray-900 text-white rounded-lg whitespace-nowrap"
          onClick={() => handleSendMessage(input)}
          disabled={loading}
        >
          {loading ? "Sending..." : <FaPaperPlane />}
        </button>
      </div>
    </div>
  );
};

export default ChatPage;