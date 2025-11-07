import Spline from '@splinetool/react-spline';

export default function HeroScene() {
  return (
    <div className="w-full max-w-5xl mx-auto h-[260px] sm:h-[360px] md:h-[420px] rounded-2xl overflow-hidden border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 relative">
      {/* 3D Scene */}
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/CV9JbUUp6QXLn7rL/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      {/* Gradient overlay - doesn't block interaction */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/60 via-white/20 to-transparent" />
    </div>
  );
}
