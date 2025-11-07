import { useEffect, useRef, useState } from 'react';
import { Mic, MicOff, Volume2, Loader2 } from 'lucide-react';

const synth = typeof window !== 'undefined' ? window.speechSynthesis : null;

export default function Controls({ onUserUtterance, onAssistantReply }) {
  const [recording, setRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const mediaRecorderRef = useRef(null);
  const recognitionRef = useRef(null);

  // Try Web Speech API for STT
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.lang = 'en-US';
      rec.continuous = false;
      rec.interimResults = true;
      recognitionRef.current = rec;

      rec.onresult = (e) => {
        let finalTranscript = '';
        for (let i = e.resultIndex; i < e.results.length; i++) {
          const transcript = e.results[i][0].transcript;
          if (e.results[i].isFinal) finalTranscript += transcript;
        }
        if (finalTranscript.trim()) {
          onUserUtterance(finalTranscript.trim());
          handleLLM(finalTranscript.trim());
        }
      };

      rec.onend = () => setRecording(false);
    }
  }, [onUserUtterance]);

  const speak = (text) => {
    if (!synth) return;
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 1;
    utter.pitch = 1;
    synth.cancel();
    synth.speak(utter);
  };

  const handleLLM = async (prompt) => {
    try {
      setLoading(true);
      // Simple offline assistant using a ruleset for demo
      let answer = '';
      const lower = prompt.toLowerCase();
      const now = new Date();
      if (lower.includes('time')) {
        answer = `It's ${now.toLocaleTimeString()}.`;
      } else if (lower.includes('date') || lower.includes('day')) {
        answer = `Today is ${now.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}.`;
      } else if (lower.startsWith('open ') || lower.includes('open youtube')) {
        answer = 'Opening YouTube.';
        window.open('https://youtube.com', '_blank');
      } else if (lower.includes('joke')) {
        answer = "Here’s a quick one: Why did the developer go broke? Because they used up all their cache!";
      } else if (lower.match(/weather|temperature/)) {
        answer = 'I cannot access weather data yet. Connect me to an API to enable this.';
      } else if (lower.match(/who are you|what can you do/)) {
        answer = 'I am a lightweight voice assistant. I can listen, respond, speak back, and handle quick actions like opening sites.';
      } else {
        answer = "Here's a thoughtful answer: " +
          'I am running locally without an external AI model in this demo, but you can connect me to any LLM API from the backend for richer responses.';
      }

      onAssistantReply(answer);
      speak(answer);
    } catch (e) {
      const fail = 'Sorry, I ran into an issue.';
      onAssistantReply(fail);
      speak(fail);
    } finally {
      setLoading(false);
    }
  };

  const startListening = async () => {
    if (!recognitionRef.current) {
      alert('Speech Recognition is not supported in this browser. Try Chrome.');
      return;
    }
    setRecording(true);
    recognitionRef.current.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) recognitionRef.current.stop();
    setRecording(false);
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-6 flex items-center justify-center gap-3">
      <button
        onClick={recording ? stopListening : startListening}
        className={`inline-flex items-center gap-2 px-5 py-3 rounded-full text-white transition shadow ${recording ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}`}
      >
        {recording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        {recording ? 'Stop' : 'Tap to Speak'}
      </button>
      <div className="inline-flex items-center gap-2 text-gray-600">
        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Volume2 className="w-5 h-5" />}
        <span className="text-sm">{loading ? 'Thinking…' : 'Voice enabled'}</span>
      </div>
    </div>
  );
}
