import { useState, useRef, useEffect, useCallback } from 'react';
import { Columns, SplitSquareVertical, Sliders, RotateCcw, ZoomIn, ZoomOut, Info } from 'lucide-react';

interface ImageComparisonSliderProps {
  beforeUrl: string;
  afterUrl: string;
  beforeLabel?: string;
  afterLabel?: string;
  beforeDate?: string;
  afterDate?: string;
  beforeSatellite?: string;
  afterSatellite?: string;
  attribution?: string;
  differenceLayerUrl?: string;
  initialMode?: 'slider' | 'side-by-side' | 'blend';
}

export function ImageComparisonSlider({
  beforeUrl,
  afterUrl,
  beforeLabel = 'Before Observation',
  afterLabel = 'After Observation',
  beforeDate,
  afterDate,
  beforeSatellite,
  afterSatellite,
  attribution,
  initialMode = 'slider',
}: ImageComparisonSliderProps) {
  const [sliderPos, setSliderPos] = useState(50); // 0 to 100%
  const [mode, setMode] = useState<'slider' | 'side-by-side' | 'blend'>(initialMode);
  const [blendOpacity, setBlendOpacity] = useState(50); // 0 (100% before) to 100 (100% after)
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePointerDown = () => {
    setIsDragging(true);
  };

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent | PointerEvent) => {
      if (!isDragging || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const clientX = 'clientX' in e ? e.clientX : 0;
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percentage = (x / rect.width) * 100;
      setSliderPos(percentage);
    },
    [isDragging]
  );

  useEffect(() => {
    const onUp = () => setIsDragging(false);
    const onMove = (e: PointerEvent) => {
      if (isDragging) {
        handlePointerMove(e);
      }
    };
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointermove', onMove);
    return () => {
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointermove', onMove);
    };
  }, [isDragging, handlePointerMove]);

  const handleReset = () => {
    setSliderPos(50);
    setBlendOpacity(50);
    setZoomLevel(1);
  };

  return (
    <div className="w-full bg-[#080F20] border border-[#1C2B48] rounded-xl overflow-hidden shadow-xl flex flex-col">
      {/* Top toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-[#0e182e] border-b border-[#1C2B48] text-xs">
        {/* Mode selector */}
        <div className="flex items-center gap-1 bg-[#050B18] p-1 rounded-lg border border-[#1C2B48]">
          <button
            onClick={() => setMode('slider')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-colors cursor-pointer ${
              mode === 'slider'
                ? 'bg-[#101B30] text-[#39D5F2] shadow-sm font-medium'
                : 'text-[#A0AEC0] hover:text-white'
            }`}
          >
            <SplitSquareVertical className="w-3.5 h-3.5" />
            <span>Split Slider</span>
          </button>
          <button
            onClick={() => setMode('side-by-side')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-colors cursor-pointer ${
              mode === 'side-by-side'
                ? 'bg-[#101B30] text-[#39D5F2] shadow-sm font-medium'
                : 'text-[#A0AEC0] hover:text-white'
            }`}
          >
            <Columns className="w-3.5 h-3.5" />
            <span>Side by Side</span>
          </button>
          <button
            onClick={() => setMode('blend')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-colors cursor-pointer ${
              mode === 'blend'
                ? 'bg-[#101B30] text-[#39D5F2] shadow-sm font-medium'
                : 'text-[#A0AEC0] hover:text-white'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Cross-Fade Blend</span>
          </button>
        </div>

        {/* Secondary controls: zoom & reset */}
        <div className="flex items-center gap-2">
          {mode === 'blend' && (
            <div className="flex items-center gap-2 mr-3 font-mono text-[11px] text-[#A0AEC0]">
              <span>Before ({100 - blendOpacity}%)</span>
              <input
                type="range"
                min="0"
                max="100"
                value={blendOpacity}
                onChange={(e) => setBlendOpacity(Number(e.target.value))}
                className="w-24 accent-[#39D5F2] cursor-pointer"
              />
              <span>After ({blendOpacity}%)</span>
            </div>
          )}

          <div className="flex items-center gap-1 bg-[#050B18] p-1 rounded-lg border border-[#1C2B48]">
            <button
              onClick={() => setZoomLevel((z) => Math.max(1, z - 0.25))}
              disabled={zoomLevel <= 1}
              className="p-1 rounded text-[#A0AEC0] hover:text-white disabled:opacity-30 cursor-pointer"
              title="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-mono px-1.5 text-slate-300">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.25))}
              disabled={zoomLevel >= 2.5}
              className="p-1 rounded text-[#A0AEC0] hover:text-white disabled:opacity-30 cursor-pointer"
              title="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={handleReset}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#050B18] border border-[#1C2B48] text-[#A0AEC0] hover:text-white transition-colors cursor-pointer"
            title="Reset view"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Main visual viewport */}
      <div className="relative w-full overflow-hidden bg-black flex items-center justify-center min-h-[380px] lg:min-h-[480px]">
        {mode === 'slider' && (
          <div
            ref={containerRef}
            onPointerDown={handlePointerDown}
            className="relative w-full h-[420px] lg:h-[520px] select-none cursor-ew-resize overflow-hidden"
          >
            {/* After Image (Background layer) */}
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                transform: `scale(${zoomLevel})`,
                transformOrigin: 'center center',
                transition: isDragging ? 'none' : 'transform 0.15s ease',
              }}
            >
              <img
                src={afterUrl}
                alt={afterLabel}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {/* After label pill */}
              <div className="absolute top-3 right-3 z-10 px-3 py-1 rounded bg-black/75 backdrop-blur-sm border border-[#1C2B48] text-[11px] font-mono text-[#F5F8FF]">
                <span className="text-[#39D5F2] font-semibold">{afterDate || 'Observation B'}</span>
                {afterSatellite && <span className="ml-2 text-[#A0AEC0]">{afterSatellite}</span>}
              </div>
            </div>

            {/* Before Image (Clipped overlay) */}
            <div
              className="absolute inset-0 h-full overflow-hidden"
              style={{
                width: `${sliderPos}%`,
                transform: `scale(${zoomLevel})`,
                transformOrigin: 'center center',
                transition: isDragging ? 'none' : 'transform 0.15s ease',
              }}
            >
              <div
                className="absolute inset-0 h-full"
                style={{
                  width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
                }}
              >
                <img
                  src={beforeUrl}
                  alt={beforeLabel}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              {/* Before label pill */}
              <div className="absolute top-3 left-3 z-10 px-3 py-1 rounded bg-black/75 backdrop-blur-sm border border-[#1C2B48] text-[11px] font-mono text-[#F5F8FF]">
                <span className="text-[#61DDAA] font-semibold">{beforeDate || 'Observation A'}</span>
                {beforeSatellite && <span className="ml-2 text-[#A0AEC0]">{beforeSatellite}</span>}
              </div>
            </div>

            {/* Draggable Divider Line */}
            <div
              className="absolute top-0 bottom-0 z-20 w-0.5 bg-[#39D5F2] shadow-[0_0_12px_#39D5F2]"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#050B18] border-2 border-[#39D5F2] flex items-center justify-center text-[#39D5F2] shadow-lg">
                <SplitSquareVertical className="w-4 h-4" />
              </div>
            </div>
          </div>
        )}

        {mode === 'side-by-side' && (
          <div className="grid grid-cols-1 md:grid-cols-2 w-full h-[420px] lg:h-[520px] gap-1 p-1 bg-[#050B18]">
            <div className="relative w-full h-full overflow-hidden rounded-lg border border-[#1C2B48]">
              <img
                src={beforeUrl}
                alt={beforeLabel}
                className="w-full h-full object-cover transition-transform"
                style={{ transform: `scale(${zoomLevel})` }}
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 px-3 py-1 rounded bg-black/80 border border-[#1C2B48] text-[11px] font-mono text-white">
                <span className="text-[#61DDAA] font-semibold">{beforeDate || 'Before'}</span> · {beforeLabel}
              </div>
            </div>

            <div className="relative w-full h-full overflow-hidden rounded-lg border border-[#1C2B48]">
              <img
                src={afterUrl}
                alt={afterLabel}
                className="w-full h-full object-cover transition-transform"
                style={{ transform: `scale(${zoomLevel})` }}
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 right-3 px-3 py-1 rounded bg-black/80 border border-[#1C2B48] text-[11px] font-mono text-white">
                <span className="text-[#39D5F2] font-semibold">{afterDate || 'After'}</span> · {afterLabel}
              </div>
            </div>
          </div>
        )}

        {mode === 'blend' && (
          <div className="relative w-full h-[420px] lg:h-[520px] overflow-hidden">
            {/* Base (Before) */}
            <img
              src={beforeUrl}
              alt={beforeLabel}
              className="absolute inset-0 w-full h-full object-cover transition-transform"
              style={{ transform: `scale(${zoomLevel})` }}
              referrerPolicy="no-referrer"
            />
            {/* Top (After with blendOpacity) */}
            <img
              src={afterUrl}
              alt={afterLabel}
              className="absolute inset-0 w-full h-full object-cover transition-all"
              style={{
                opacity: blendOpacity / 100,
                transform: `scale(${zoomLevel})`,
              }}
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded bg-black/80 border border-[#1C2B48] text-[11px] font-mono text-[#F5F8FF]">
              Blending Mode: <span className="text-[#39D5F2] font-semibold">{blendOpacity}% After Layer</span>
            </div>
          </div>
        )}
      </div>

      {/* Attribution footer */}
      {attribution && (
        <div className="px-4 py-2 bg-[#050B18] border-t border-[#1C2B48] flex items-center justify-between text-[11px] text-[#A0AEC0]">
          <div className="flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-[#39D5F2]" />
            <span>Attribution: {attribution}</span>
          </div>
          <span className="font-mono text-[10px]">WGS84 Radiometrically Terrain Corrected</span>
        </div>
      )}
    </div>
  );
}
