export default function Transcript({ items }) {
  return (
    <div className="w-full max-w-3xl mx-auto mt-6 bg-white/70 backdrop-blur border border-gray-200 rounded-xl p-4">
      <h2 className="text-sm font-semibold text-gray-700 mb-2">Conversation</h2>
      <div className="space-y-3 max-h-64 overflow-auto pr-1">
        {items.length === 0 && (
          <p className="text-gray-500 text-sm">Your conversation will appear here.</p>
        )}
        {items.map((msg, i) => (
          <div key={i} className="flex gap-3 items-start">
            <div className={`shrink-0 w-6 h-6 rounded-full ${msg.role === 'user' ? 'bg-blue-600' : 'bg-emerald-600'}`}></div>
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-400">{msg.role === 'user' ? 'You' : 'Assistant'}</p>
              <p className="text-gray-800 leading-relaxed">{msg.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
