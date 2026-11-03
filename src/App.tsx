import { useState, useEffect, useRef, useCallback } from 'react';
import { planets, Planet } from './data/planets';

function App() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);
  const [angles, setAngles] = useState<number[]>(planets.map(() => Math.random() * Math.PI * 2));
  const animationRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  const animate = useCallback((timestamp: number) => {
    if (!lastTimeRef.current) lastTimeRef.current = timestamp;
    const delta = (timestamp - lastTimeRef.current) / 1000;
    lastTimeRef.current = timestamp;

    setAngles(prev =>
      prev.map((angle, i) => {
        const baseSpeed = planets[i].speed * 0.5;
        return angle + baseSpeed * speed * delta;
      })
    );

    animationRef.current = requestAnimationFrame(animate);
  }, [speed]);

  useEffect(() => {
    if (isPlaying) {
      lastTimeRef.current = 0;
      animationRef.current = requestAnimationFrame(animate);
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, animate]);

  const handlePlanetClick = (planet: Planet) => {
    setSelectedPlanet(prev => prev?.id === planet.id ? null : planet);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-hidden relative select-none">
      {/* Star background */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 200 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              width: Math.random() * 2 + 1 + 'px',
              height: Math.random() * 2 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animationDelay: Math.random() * 3 + 's',
              animationDuration: Math.random() * 3 + 2 + 's',
              opacity: Math.random() * 0.7 + 0.3,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 text-center pt-4 pb-2">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 bg-clip-text text-transparent">
          🌌 交互式太阳系教学演示
        </h1>
        <p className="text-gray-400 text-sm mt-1">点击行星查看详细信息</p>
      </header>

      {/* Solar System Visualization */}
      <div className="relative z-10 flex items-center justify-center" style={{ height: 'calc(100vh - 180px)' }}>
        <div className="relative" style={{ width: '900px', height: '900px' }}>
          {/* Sun */}
          <div
            className="absolute rounded-full cursor-pointer"
            style={{
              width: '50px',
              height: '50px',
              background: 'radial-gradient(circle, #fff700, #ff8c00, #ff4500)',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              boxShadow: '0 0 60px 20px rgba(255, 165, 0, 0.5), 0 0 100px 40px rgba(255, 69, 0, 0.3)',
            }}
          >
            <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ background: 'radial-gradient(circle, #fff700, transparent)' }} />
          </div>

          {/* Orbits and Planets */}
          {planets.map((planet, index) => {
            const x = Math.cos(angles[index]) * planet.orbitRadius;
            const y = Math.sin(angles[index]) * planet.orbitRadius * 0.35;
            const centerX = 450;
            const centerY = 450;
            const isBehind = Math.sin(angles[index]) < 0;

            return (
              <div key={planet.id}>
                {/* Orbit path */}
                <div
                  className="absolute rounded-full"
                  style={{
                    width: planet.orbitRadius * 2 + 'px',
                    height: planet.orbitRadius * 2 * 0.35 + 'px',
                    top: centerY - planet.orbitRadius * 0.35 + 'px',
                    left: centerX - planet.orbitRadius + 'px',
                    border: `1px solid ${isBehind ? 'rgba(100,100,150,0.15)' : 'rgba(100,100,150,0.3)'}`,
                  }}
                />
                {/* Planet */}
                <div
                  className="absolute cursor-pointer transition-transform duration-200 hover:scale-150 group"
                  style={{
                    width: planet.size + 'px',
                    height: planet.size + 'px',
                    left: centerX + x - planet.size / 2 + 'px',
                    top: centerY + y - planet.size / 2 + 'px',
                    zIndex: isBehind ? 5 : 20,
                    opacity: isBehind ? 0.7 : 1,
                  }}
                  onClick={() => handlePlanetClick(planet)}
                >
                  <div
                    className="w-full h-full rounded-full relative"
                    style={{
                      background: `radial-gradient(circle at 30% 30%, ${lightenColor(planet.color, 30)}, ${planet.color}, ${adjustColor(planet.color, -50)})`,
                      boxShadow: `0 0 ${planet.size}px ${planet.color}50, inset -2px -2px 4px rgba(0,0,0,0.3)`,
                    }}
                  >
                    {/* Saturn rings */}
                    {planet.id === 'saturn' && (
                      <div
                        className="absolute pointer-events-none"
                        style={{
                          width: planet.size * 2.2 + 'px',
                          height: planet.size * 0.6 + 'px',
                          border: `2px solid ${planet.color}90`,
                          borderRadius: '50%',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%) rotateX(70deg)',
                        }}
                      />
                    )}
                    {/* Earth's moon indicator */}
                    {planet.id === 'earth' && (
                      <div
                        className="absolute rounded-full bg-gray-300"
                        style={{
                          width: '3px',
                          height: '3px',
                          top: '-4px',
                          right: '-2px',
                          boxShadow: '0 0 3px rgba(255,255,255,0.5)',
                        }}
                      />
                    )}
                  </div>
                  {/* Planet label */}
                  <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] text-gray-300 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                    {planet.name}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Planet Info Panel */}
      {selectedPlanet && (
        <div className="fixed top-4 right-4 z-50 w-80 bg-gray-900/95 backdrop-blur-md border border-gray-700 rounded-2xl p-5 shadow-2xl animate-fadeIn">
          <button
            className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-700"
            onClick={() => setSelectedPlanet(null)}
          >
            ✕
          </button>
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-14 h-14 rounded-full flex-shrink-0"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${lightenColor(selectedPlanet.color, 30)}, ${selectedPlanet.color}, ${adjustColor(selectedPlanet.color, -50)})`,
                boxShadow: `0 0 25px ${selectedPlanet.color}60`,
              }}
            />
            <div>
              <h2 className="text-xl font-bold text-white">{selectedPlanet.name}</h2>
              <p className="text-sm text-gray-400">{selectedPlanet.nameEn}</p>
            </div>
          </div>
          <div className="space-y-2">
            <InfoRow icon="📏" label="直径" value={`${selectedPlanet.diameter.toLocaleString()} km`} />
            <InfoRow icon="☀️" label="与太阳距离" value={`${selectedPlanet.distanceFromSun.toLocaleString()} 百万km`} />
            <InfoRow icon="🔄" label="公转周期" value={`${selectedPlanet.orbitalPeriod} 地球年`} />
          </div>
          <p className="mt-4 text-sm text-gray-300 leading-relaxed border-t border-gray-700/50 pt-3">
            {selectedPlanet.description}
          </p>
        </div>
      )}

      {/* Controls */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur-md border-t border-gray-700/50">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between gap-4 flex-wrap">
          {/* Play/Pause */}
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors border border-gray-600"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? (
              <>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
                <span className="text-sm">暂停</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <polygon points="5,3 19,12 5,21" />
                </svg>
                <span className="text-sm">播放</span>
              </>
            )}
          </button>

          {/* Speed Control */}
          <div className="flex items-center gap-3 flex-1 max-w-xs">
            <span className="text-xs text-gray-400 whitespace-nowrap">速度</span>
            <input
              type="range"
              min="0.1"
              max="10"
              step="0.1"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="flex-1 h-1.5 bg-gray-700 rounded-full appearance-none cursor-pointer"
            />
            <span className="text-xs text-yellow-400 font-mono w-10 text-right">{speed.toFixed(1)}x</span>
          </div>

          {/* Speed Presets */}
          <div className="flex gap-1">
            {[0.5, 1, 2, 5].map(s => (
              <button
                key={s}
                className={`px-2.5 py-1.5 rounded text-xs transition-colors ${
                  speed === s
                    ? 'bg-yellow-600 text-white shadow-lg shadow-yellow-600/30'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700 border border-gray-600'
                }`}
                onClick={() => setSpeed(s)}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-2 px-3 rounded-lg bg-gray-800/50">
      <span className="text-gray-400 text-sm flex items-center gap-2">
        <span>{icon}</span> {label}
      </span>
      <span className="text-white text-sm font-medium">{value}</span>
    </div>
  );
}

function adjustColor(hex: string, amount: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.max(0, Math.min(255, ((num >> 16) & 0xff) + amount));
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0xff) + amount));
  const b = Math.max(0, Math.min(255, (num & 0xff) + amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

function lightenColor(hex: string, amount: number): string {
  return adjustColor(hex, amount);
}

export default App;
