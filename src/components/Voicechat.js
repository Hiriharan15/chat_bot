import React, { useState, useEffect } from "react";

const VoiceChat = ({ onClose }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isListening) {
      startListening();
    }

    return () => {
      window.speechSynthesis.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isListening]);

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
      setTranscript(speechResult);
      setIsListening(false);
      fetchBotResponse(speechResult);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    recognition.start();
  };

  const fetchBotResponse = async (userSpeech) => {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: userSpeech }),
      });

      const data = await response.json();

      if (response.ok) {
        setResponse(data.answer);
        speak(data.answer);
      } else {
        setResponse("Sorry, I couldn't understand.");
        speak("Sorry, I couldn't understand.");
      }
    } catch (error) {
      console.error("API Error:", error);
      setResponse("Error: Unable to get a response.");
      speak("Error: Unable to get a response.");
    } finally {
      setLoading(false);
    }
  };

  const speak = (text) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      window.speechSynthesis.speak(utterance);
    } else {
      console.error("Speech synthesis not supported in this browser.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 sm:p-6 w-full max-w-md mx-auto bg-white shadow-lg rounded-lg">
      {/* Transcript & Response */}
      <p className="mb-2 text-center text-gray-800 font-medium">
        You said: <span className="font-semibold">{transcript || "..."}</span>
      </p>
      <p className="mb-4 text-center text-gray-700">
        Reply: <span className="font-semibold">{loading ? "Processing..." : response || "..."}</span>
      </p>

      {/* Start Voice Chat Button */}
      {!isListening ? (
        <button
          className="px-4 py-2 w-full sm:w-auto bg-green-500 text-white font-semibold rounded-lg transition hover:bg-green-600"
          onClick={() => setIsListening(true)}
        >
          Start Voice Chat
        </button>
      ) : (
        <p className="text-blue-500 font-semibold text-lg">Listening...</p>
      )}

      {/* Close Button */}
      <button
        className="mt-4 px-4 py-2 w-full sm:w-auto bg-red-500 text-white font-semibold rounded-lg transition hover:bg-red-600"
        onClick={() => {
          setIsListening(false);
          window.speechSynthesis.cancel();
          onClose();
        }}
      >
        Close
      </button>
    </div>
  );
};

export default VoiceChat;
