import { useState } from 'react';
import { PageId } from '../types/satellite';
import { CASE_STUDIES } from '../data/caseStudies';
import { ImageComparisonSlider } from '../components/ImageComparisonSlider';
import { SarDiagram } from '../components/SarDiagram';
import { Radio, ExternalLink, Sparkles, AlertTriangle, ShieldCheck, Check, Layers, Sliders } from 'lucide-react';

interface SarExplorerPageProps {
  onNavigate: (page: PageId, targetId?: string) => void;
  onOpenEarthGuide: () => void;
  initialCaseId?: string;
}

export function SarExplorerPage({
  onNavigate,
  onOpenEarthGuide,
  initialCaseId = 'emilia-romagna-flood-2023',
}: SarExplorerPageProps) {
  const [selectedCaseId, setSelectedCaseId] = useState<string>(initialCaseId);
  const [selectedPol, setSelectedPol] = useState<'VV' | 'VH' | 'DUAL'>('VV');
  const [speckleFilterApplied, setSpeckleFilterApplied] = useState(false);

  const activeCase =
    CASE_STUDIES.find((c) => c.id === selectedCaseId) || CASE_STUDIES[0];

  return (
    <div className="w-full flex flex-col space-y-12 pb-20">
      {/* 1. Page Header & Intro */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#1C2B48]">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#39D5F2] uppercase tracking-wider">
              <Radio className="w-4 h-4" />
              <span>CORE SCIENTIFIC WORKSPACE</span>
            </div>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
              SEE BEYOND WHAT YOUR EYES CAN SEE.
            </h1>
            <p className="text-sm text-[#A0AEC0] max-w-2xl leading-relaxed">
              Synthetic Aperture Radar transmits its own microwave pulses to pierce through darkness and rainstorms, mapping surface roughness, soil moisture, and flooding.
            </p>
          </div>

          {/* Earth's dialogue callout */}
          <div className="p-4 rounded-xl bg-[#080F20] border border-[#1C2B48] max-w-md flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#101B30] border border-[#39D5F2] flex items-center justify-center text-[#39D5F2] shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="space-y-1 text-xs">
              <span className="font-mono text-[#39D5F2] font-semibold">Earth Voice</span>
              <p className="text-[#F5F8FF] italic">
                &ldquo;Ordinary cameras depend on sunlight and clear skies. Radar sends its own signals. That gives us a completely different way to observe my surface.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Interactive SAR Signal & Physics Diagram */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <SarDiagram />
      </section>

      {/* 3. Primary Authentic SAR Case Study: Comparison Workspace */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono text-[#61DDAA] uppercase tracking-wider mb-1">
              AUTHENTIC SAR OBSERVATION WORKSPACE
            </div>
            <h2 className="font-display font-bold text-2xl text-white">
              {activeCase.title}
            </h2>
            <div className="text-xs font-mono text-[#39D5F2]">
              {activeCase.location} · {activeCase.eventDate}
            </div>
          </div>

          {/* Case study switcher */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            {CASE_STUDIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCaseId(c.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCaseId === c.id
                    ? 'bg-[#39D5F2] text-[#050B18] font-bold'
                    : 'bg-[#080F20] text-[#A0AEC0] hover:text-white border border-[#1C2B48]'
                }`}
              >
                {c.category}
              </button>
            ))}
          </div>
        </div>

        {/* Case Narrative & Technical Setup */}
        <div className="p-4 rounded-xl bg-[#080F20] border border-[#1C2B48] flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
          <div className="space-y-1">
            <span className="font-mono text-[#6C9EFF] font-semibold">SITUATION SUMMARY:</span>
            <p className="text-[#A0AEC0] leading-relaxed max-w-3xl">
              {activeCase.scientificExplanation}
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-[#050B18] px-3 py-1.5 rounded border border-[#1C2B48] text-center">
              <div className="text-[10px] text-[#A0AEC0]">SENSOR</div>
              <div className="font-mono text-white font-bold">{activeCase.beforeImage.satellite}</div>
            </div>
            <div className="bg-[#050B18] px-3 py-1.5 rounded border border-[#1C2B48] text-center">
              <div className="text-[10px] text-[#A0AEC0]">RESOLUTION</div>
              <div className="font-mono text-[#39D5F2] font-bold">10 Meters</div>
            </div>
          </div>
        </div>

        {/* Interactive Comparison Component */}
        <div className="relative">
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
          />
        </div>

        {/* Key Numerical Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {activeCase.keyMetrics.map((km) => (
            <div
              key={km.label}
              className="p-4 rounded-xl bg-[#080F20] border border-[#1C2B48] space-y-1"
            >
              <div className="text-xs font-mono text-[#A0AEC0] uppercase">{km.label}</div>
              <div className="text-2xl font-mono font-bold text-white flex items-baseline gap-1">
                <span>{km.value}</span>
                {km.unit && <span className="text-xs font-mono text-[#39D5F2]">{km.unit}</span>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SAR Scientific Learning & Limitations Panel */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Scientific Interpretation Guide */}
          <div className="p-6 rounded-xl bg-[#080F20] border border-[#1C2B48] space-y-5">
            <div className="flex items-center gap-2 text-xs font-mono text-[#39D5F2] uppercase tracking-wider">
              <Layers className="w-4 h-4" />
              <span>SAR POLARIMETRY & INTERPRETATION</span>
            </div>
            <h3 className="font-display font-semibold text-xl text-white">
              Understanding VV, VH & Radar Brightness
            </h3>

            <div className="space-y-4 text-xs text-[#A0AEC0] leading-relaxed">
              <div className="p-3.5 rounded-lg bg-[#050B18] border border-[#1C2B48] space-y-1.5">
                <div className="font-mono text-white font-semibold flex items-center justify-between">
                  <span>VV Polarization (Co-Polarized)</span>
                  <span className="text-[#39D5F2]">Vertical Transmit · Vertical Receive</span>
                </div>
                <p>
                  Directly sensitive to surface roughness and dielectric boundaries. Because flat water reflects vertical waves forward like a mirror, VV is the primary channel used for open flood delineation.
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-[#050B18] border border-[#1C2B48] space-y-1.5">
                <div className="font-mono text-white font-semibold flex items-center justify-between">
                  <span>VH Polarization (Cross-Polarized)</span>
                  <span className="text-[#61DDAA]">Vertical Transmit · Horizontal Receive</span>
                </div>
                <p>
                  Depolarized by complex 3D structures like forest foliage and crops. If a forest is felled, VH backscatter drops drastically (-6 to -10 dB), enabling automated deforestation alerts.
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-[#050B18] border border-[#1C2B48] space-y-1.5">
                <div className="font-mono text-white font-semibold flex items-center justify-between">
                  <span>Speckle Noise & Filtering</span>
                  <button
                    onClick={() => setSpeckleFilterApplied(!speckleFilterApplied)}
                    className="text-[11px] text-[#6C9EFF] hover:underline cursor-pointer"
                  >
                    {speckleFilterApplied ? '✓ Lee Filter Simulated' : 'Toggle Filter'}
                  </button>
                </div>
                <p>
                  The grainy &ldquo;salt-and-pepper&rdquo; appearance is caused by coherent wave interference between micro-scatterers. Multi-looking and spatial filters (Lee, Frost) are applied during Level-1 GRD preprocessing.
                </p>
              </div>
            </div>
          </div>

          {/* Scientific Limitations & Quality Assurance */}
          <div className="p-6 rounded-xl bg-[#080F20] border border-[#1C2B48] space-y-5">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4" />
              <span>SCIENTIFIC LIMITATIONS & EDGE CASES</span>
            </div>
            <h3 className="font-display font-semibold text-xl text-white">
              What Radar Can and Cannot Detect
            </h3>

            <p className="text-xs text-[#A0AEC0] leading-relaxed">
              Responsible scientists never treat radar data as infallible magic. SAR interpretation must account for geometry, topography, and surface physics:
            </p>

            <ul className="space-y-3 text-xs text-[#A0AEC0]">
              {activeCase.limitations.map((lim, idx) => (
                <li
                  key={idx}
                  className="p-3 rounded-lg bg-[#050B18] border border-[#1C2B48] flex items-start gap-2.5"
                >
                  <span className="font-mono text-amber-400 font-bold shrink-0">0{idx + 1}.</span>
                  <span className="leading-relaxed">{lim}</span>
                </li>
              ))}
            </ul>

            <div className="pt-2 flex items-center justify-between border-t border-[#1C2B48] text-xs">
              <a
                href={activeCase.attribution.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-[#39D5F2] hover:underline"
              >
                <span>Original Source Dataset</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <span className="font-mono text-[11px] text-[#A0AEC0]">
                License: {activeCase.attribution.license}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
