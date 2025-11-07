import { Sparkles } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full max-w-3xl mx-auto text-center py-8">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium">
        <Sparkles className="w-4 h-4" />
        Live AI Voice Assistant
      </div>
      <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900">
        Your Personal Voice Companion
      </h1>
      <p className="mt-3 text-gray-600">
        Tap the mic, speak naturally, and get instant answers. No setup required.
      </p>
    </header>
  );
}
