import { useCallback, useState } from 'react';
import Header from './components/Header';
import HeroScene from './components/HeroScene';
import Controls from './components/Controls';
import Transcript from './components/Transcript';

function App() {
  const [messages, setMessages] = useState([]);

  const onUserUtterance = useCallback((text) => {
    setMessages((prev) => [...prev, { role: 'user', text }]);
  }, []);

  const onAssistantReply = useCallback((text) => {
    setMessages((prev) => [...prev, { role: 'assistant', text }]);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <div className="px-4 sm:px-6 md:px-8 py-10">
        <Header />
        <HeroScene />
        <Controls onUserUtterance={onUserUtterance} onAssistantReply={onAssistantReply} />
        <Transcript items={messages} />
        <div className="w-full max-w-3xl mx-auto text-center text-xs text-gray-500 mt-6">
          Tip: Ask for time, date, a quick joke, or say “open YouTube”.
        </div>
      </div>
    </div>
  );
}

export default App;
