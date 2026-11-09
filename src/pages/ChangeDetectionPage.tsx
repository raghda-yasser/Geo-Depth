import { useState } from 'react';
import { PageId } from '../types/satellite';
import { CASE_STUDIES } from '../data/caseStudies';
import { ImageComparisonSlider } from '../components/ImageComparisonSlider';
import { Layers, AlertTriangle, Sparkles, Sliders, CheckCircle2, Info, ArrowRight } from 'lucide-react';

interface ChangeDetectionPageProps {
  onNavigate: (page: PageId, targetId?: string) => void;
  onOpenEarthGuide: () => void;
}

export function ChangeDetectionPage({ onNavigate, onOpenEarthGuide }: ChangeDetectionPageProps) {
  const [selectedCaseId, setSelectedCaseId] = useState<string>('emilia-romagna-flood-2023');
  const [differenceOverlayOpacity, setDifferenceOverlayOpacity] = useState<number>(65);
  const [showDifferenceLayer, setShowDifferenceLayer] = useState<boolean>(true);

  const activeCase =
    CASE_STUDIES.find((c) => c.id === selectedCaseId) || CASE_STUDIES[0];

  return (
    <div className="w-full flex flex-col space-y-12 pb-20">
      {/* 1. Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#1C2B48]">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#61DDAA] uppercase tracking-wider">
              <Layers className="w-4 h-4" />
              <span>MULTI-TEMPORAL CHANGE DETECTION</span>
            </div>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
              CHANGE IS HAPPENING. LET&apos;S FIND IT.
            </h1>
            <p className="text-sm text-[#A0AEC0] max-w-2xl leading-relaxed">
              Compare multi-temporal radar acquisitions, isolate backscatter anomalies, and distinguish genuine physical landscape transformations from transient environmental noise.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#080F20] border border-[#1C2B48] max-w-md flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#101B30] border border-[#61DDAA] flex items-center justify-center text-[#61DDAA] shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="space-y-1 text-xs">
              <span className="font-mono text-[#61DDAA] font-semibold">Earth Voice</span>
              <p className="text-[#F5F8FF] italic">
                &ldquo;Two images. Two moments in time. Let&apos;s investigate what happened between them.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Scenario Selector */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono text-[#39D5F2] uppercase tracking-wider mb-1">
              EDUCATIONAL CASE SCENARIOS
            </div>
            <h2 className="font-display font-bold text-2xl text-white">
              Select an Environmental Transformation Study
            </h2>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            {CASE_STUDIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCaseId(c.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCaseId === c.id
                    ? 'bg-[#61DDAA] text-[#050B18] font-bold shadow-md'
                    : 'bg-[#080F20] text-[#A0AEC0] hover:text-white border border-[#1C2B48]'
                }`}
              >
                {c.category}
              </button>
            ))}
          </div>
        </div>

        {/* Observation A & B Metadata Ribbon */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Observation A */}
          <div className="p-4 rounded-xl bg-[#080F20] border border-[#1C2B48] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#61DDAA] uppercase font-bold">
                OBSERVATION A (BASELINE)
              </span>
              <span className="text-xs font-mono text-white">{activeCase.beforeImage.date}</span>
            </div>
            <div className="font-display font-semibold text-white text-base">
              {activeCase.beforeImage.label}
            </div>
            <div className="text-xs text-[#A0AEC0] font-mono">
              Sensor: <strong className="text-white">{activeCase.beforeImage.satellite}</strong> · Pol: {activeCase.beforeImage.polarization || 'Dual VV/VH'}
            </div>
          </div>

          {/* Observation B */}
          <div className="p-4 rounded-xl bg-[#080F20] border border-[#1C2B48] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#39D5F2] uppercase font-bold">
                OBSERVATION B (POST-EVENT)
              </span>
              <span className="text-xs font-mono text-white">{activeCase.afterImage.date}</span>
            </div>
            <div className="font-display font-semibold text-white text-base">
              {activeCase.afterImage.label}
            </div>
            <div className="text-xs text-[#A0AEC0] font-mono">
              Sensor: <strong className="text-white">{activeCase.afterImage.satellite}</strong> · Pol: {activeCase.afterImage.polarization || 'Dual VV/VH'}
            </div>
          </div>
        </div>

        {/* Change Visualization Tool */}
        <div className="space-y-4">
          <ImageComparisonSlider
            beforeUrl={activeCase.beforeImage.url}
            afterUrl={activeCase.afterImage.url}
            beforeLabel={activeCase.beforeImage.label}
            afterLabel={activeCase.afterImage.label}
            beforeDate={activeCase.beforeImage.date}
            afterDate={activeCase.afterImage.date}
            beforeSatellite={activeCase.beforeImage.satellite}
            afterSatellite={activeCase.afterImage.satellite}
            attribution={activeCase.attribution.source}
            initialMode="slider"
          />

          {/* Difference Layer Overlay Controls */}
          <div className="p-4 rounded-xl bg-[#080F20] border border-[#1C2B48] flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="diffToggle"
                  checked={showDifferenceLayer}
                  onChange={(e) => setShowDifferenceLayer(e.target.checked)}
                  className="rounded border-[#1C2B48] text-[#39D5F2] focus:ring-[#39D5F2] cursor-pointer"
                />
                <label htmlFor="diffToggle" className="font-medium text-white cursor-pointer">
                  Highlight Difference Vectors
                </label>
              </div>

              {showDifferenceLayer && (
                <div className="flex items-center gap-2 ml-4 font-mono text-[11px] text-[#A0AEC0]">
                  <span>Opacity:</span>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={differenceOverlayOpacity}
                    onChange={(e) => setDifferenceOverlayOpacity(Number(e.target.value))}
                    className="w-24 accent-[#61DDAA] cursor-pointer"
                  />
                  <span>{differenceOverlayOpacity}%</span>
                </div>
              )}
            </div>

            {/* Change classification legend */}
            <div className="flex items-center gap-4 text-[11px] font-mono">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-cyan-400" />
                <span className="text-[#A0AEC0]">Specular Drop (Water/Inundation)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <span className="text-[#A0AEC0]">Volume Loss (Deforestation)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-white" />
                <span className="text-[#A0AEC0]">Corner Reflection (Built Urban)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Scientific Integrity & Limitation Analysis */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="p-6 rounded-xl bg-[#080F20] border border-[#1C2B48] space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4" />
            <span>SCIENTIFIC INTEGRITY & METHODOLOGICAL RIGOR</span>
          </div>

          <h3 className="font-display font-bold text-2xl text-white">
            Validating Real Surface Change vs. Environmental Artifacts
          </h3>

          <p className="text-xs sm:text-sm text-[#A0AEC0] leading-relaxed max-w-4xl">
            In satellite remote sensing, a naive pixel-by-pixel subtraction between two images is <strong className="text-white">not</strong> equivalent to validated change detection. Professional Earth observation workflows rigorously evaluate these physical factors before publishing change extent maps:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="p-4 rounded-xl bg-[#050B18] border border-[#1C2B48] space-y-2">
              <div className="font-display font-semibold text-white text-sm">
                01. Dielectric Soil Moisture
              </div>
              <p className="text-xs text-[#A0AEC0] leading-relaxed">
                Water has an extremely high relative permittivity (ε ≈ 80) compared to dry soil (ε ≈ 3-4). A passing rain shower three hours before satellite overpass will dramatically increase backscatter even if zero vegetation or land use changed.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#050B18] border border-[#1C2B48] space-y-2">
              <div className="font-display font-semibold text-white text-sm">
                02. Look Angle & Orbit Geometry
              </div>
              <p className="text-xs text-[#A0AEC0] leading-relaxed">
                Comparing an Ascending orbit pass (satellite flying south to north, looking east) against a Descending pass (looking west) introduces severe geometric foreshortening and layover discrepancies over rugged terrain.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#050B18] border border-[#1C2B48] space-y-2">
              <div className="font-display font-semibold text-white text-sm">
                03. Wind-Induced Wave Roughness
              </div>
              <p className="text-xs text-[#A0AEC0] leading-relaxed">
                While calm floodwater appears pitch black (-24 dB), wind speeds above 3 m/s create surface capillary waves. These ripples convert specular reflection into diffuse scatter, causing automated algorithms to miss inundated land.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
