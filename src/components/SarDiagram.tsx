import { useState } from 'react';
import { Radio, Waves, Building2, Trees, Droplets, Mountain, ArrowRight } from 'lucide-react';

export function SarDiagram() {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [activeSurface, setActiveSurface] = useState<'water' | 'soil' | 'urban' | 'forest'>('water');

  const steps = [
    {
      id: 1,
      title: '1. Pulse Transmission',
      subtitle: 'Active Coherent Microwaves',
      desc: 'The satellite antenna emits thousands of high-power frequency-modulated microwave pulses per second (C-band ~ 5.4 GHz, wavelength λ = 5.6 cm). It carries its own illumination, working completely independent of the Sun.',
    },
    {
      id: 2,
      title: '2. Surface Interaction',
      subtitle: 'Dielectric & Roughness Physics',
      desc: 'The microwave electromagnetic wavefront hits Earth. The geometry and electrical permittivity (dielectric constant ε) dictate how waves reflect, penetrate, or scatter.',
    },
    {
      id: 3,
      title: '3. Backscatter Echo',
      subtitle: 'Sigma-Zero (σ°) Measurement',
      desc: 'Backscatter is the exact portion of transmitted energy bounced directly back toward the satellite. Measured in logarithmic decibels (dB), from -30 dB (dark) to +10 dB (blinding bright).',
    },
    {
      id: 4,
      title: '4. Doppler Antenna Synthesis',
      subtitle: 'The "Synthetic Aperture" Magic',
      desc: 'As the satellite flies at 7.6 km/s, it records the phase history and Doppler frequency shifts of each echo. Signal processors combine echoes across hundreds of pulses, mathematically synthesizing a virtual antenna kilometers long!',
    },
    {
      id: 5,
      title: '5. Image Formation & Polarimetry',
      subtitle: 'Resolution & Multi-Pol Matrices',
      desc: 'The processed result is a calibrated 10-meter resolution grid. Analyzing co-polarized (VV) and cross-polarized (VH) channels separates water, crops, trees, and buildings.',
    },
  ];

  const surfaces = {
    water: {
      name: 'Smooth Calm Water (Floods)',
      icon: Droplets,
      mechanism: 'Specular Reflection (Mirror-Like)',
      backscatter: '-24 dB to -28 dB (Very Low)',
      appearance: 'Dark / Black pixels',
      color: '#39D5F2',
      explanation:
        'Smooth water surfaces act as electromagnetic mirrors. The incoming radar beam strikes the water and bounces forward away from the satellite. Almost zero energy returns to the antenna, creating high-contrast black flood signatures.',
    },
    soil: {
      name: 'Rough Agricultural Soil',
      icon: Mountain,
      mechanism: 'Diffuse Scattering',
      backscatter: '-12 dB to -16 dB (Moderate)',
      appearance: 'Medium Gray pixels',
      color: '#61DDAA',
      explanation:
        'Tilled dirt clods and small pebbles have dimensions comparable to radar wavelength (5.6 cm). The pulse scatters in every direction (diffuse scattering). A reliable fraction travels back to the antenna.',
    },
    urban: {
      name: 'Urban High-Rise Buildings',
      icon: Building2,
      mechanism: 'Double-Bounce Corner Reflection',
      backscatter: '+2 dB to +8 dB (Extremely High)',
      appearance: 'Brilliant White pixels',
      color: '#F5F8FF',
      explanation:
        'Vertical concrete walls and flat asphalt roads form 90-degree right angles (dihedral corner reflectors). The pulse strikes the street, bounces into the building wall, and reflects directly back into the satellite antenna with high energy.',
    },
    forest: {
      name: 'Dense Rainforest Canopy',
      icon: Trees,
      mechanism: 'Volume Scattering (Depolarization)',
      backscatter: '-14 dB (VV) / -18 dB (VH)',
      appearance: 'Textured Light Gray (High VH Cross-Pol)',
      color: '#6C9EFF',
      explanation:
        'Twigs, leaves, and branches scatter the pulse repeatedly within the tree crown (volume scatter). This randomizes the wave polarization, converting vertical (V) waves into horizontal (H) waves—a telltale biometric for canopy biomass.',
    },
  };

  const currentSurfaceData = surfaces[activeSurface];

  return (
    <div className="w-full bg-[#080F20] border border-[#1C2B48] rounded-xl p-6 shadow-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#1C2B48]">
        <div>
          <div className="text-xs font-mono text-[#39D5F2] uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5" />
            <span>Interactive Scientific Diagram</span>
          </div>
          <h3 className="font-display font-semibold text-lg text-white">
            How Synthetic Aperture Radar (SAR) Creates Images
          </h3>
        </div>

        {/* Step pills */}
        <div className="flex items-center gap-1 bg-[#050B18] p-1 rounded-lg border border-[#1C2B48] overflow-x-auto">
          {steps.map((st) => (
            <button
              key={st.id}
              onClick={() => setActiveStep(st.id)}
              className={`px-2.5 py-1 rounded text-xs font-mono transition-colors whitespace-nowrap cursor-pointer ${
                activeStep === st.id
                  ? 'bg-[#101B30] text-[#39D5F2] border border-[#1C2B48] font-bold'
                  : 'text-[#A0AEC0] hover:text-white'
              }`}
            >
              Step {st.id}
            </button>
          ))}
        </div>
      </div>

      {/* Main interactive stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6">
        {/* Left: SVG Diagram Visualization (7 cols) */}
        <div className="lg:col-span-7 bg-[#050B18] border border-[#1C2B48] rounded-xl p-4 flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between text-[11px] font-mono text-[#A0AEC0] pb-2 border-b border-[#1C2B48]/50">
            <span>ACTIVE FREQUENCY: C-BAND 5.405 GHz</span>
            <span>ALTITUDE: 693 km SSO</span>
          </div>

          {/* Scientific SVG schematic */}
          <div className="relative w-full h-[280px] my-2">
            <svg viewBox="0 0 500 280" className="w-full h-full">
              <defs>
                <linearGradient id="beamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#39D5F2" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#39D5F2" stopOpacity="0.1" />
                </linearGradient>
                <linearGradient id="returnGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#61DDAA" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#61DDAA" stopOpacity="0.1" />
                </linearGradient>
              </defs>

              {/* Space Background Grid */}
              <line x1="0" y1="40" x2="500" y2="40" stroke="#1C2B48" strokeDasharray="3 3" />
              <line x1="0" y1="180" x2="500" y2="180" stroke="#1C2B48" strokeDasharray="3 3" />

              {/* Orbit Flight Direction */}
              <path d="M 60,30 L 160,30" stroke="#6C9EFF" strokeWidth="2" strokeDasharray="4 2" />
              <polygon points="160,30 152,27 152,33" fill="#6C9EFF" />
              <text x="70" y="22" fill="#6C9EFF" fontSize="9" fontFamily="monospace">
                ORBIT FLIGHT PATH (7.6 km/s)
              </text>

              {/* Satellite Graphic */}
              <g transform="translate(100, 30)">
                {/* Solar Panels */}
                <rect x="-35" y="-6" width="24" height="12" fill="#1C2B48" stroke="#39D5F2" strokeWidth="1" />
                <rect x="11" y="-6" width="24" height="12" fill="#1C2B48" stroke="#39D5F2" strokeWidth="1" />
                {/* Main Body */}
                <rect x="-10" y="-8" width="20" height="16" fill="#101B30" stroke="#F5F8FF" strokeWidth="1.5" />
                {/* SAR Planar Antenna */}
                <rect x="-18" y="10" width="36" height="5" fill="#39D5F2" />
                <circle cx="0" cy="0" r="2" fill="#39D5F2" />
                <text x="-24" y="-12" fill="#F5F8FF" fontSize="9" fontFamily="monospace">
                  Sentinel-1A
                </text>
              </g>

              {/* Microwave Emitted Pulse Beam */}
              <polygon
                points="100,45 280,240 360,240"
                fill="url(#beamGrad)"
                stroke="#39D5F2"
                strokeWidth="1"
                strokeDasharray="4 2"
                className="opacity-75"
              />

              {/* Ground Earth Surface Profile */}
              <path d="M 0,240 L 500,240" stroke="#1C2B48" strokeWidth="2" />

              {/* Surface specific rendering */}
              {activeSurface === 'water' && (
                <g>
                  {/* Flat calm water layer */}
                  <rect x="220" y="240" width="280" height="40" fill="#0e2338" />
                  <path d="M 220,240 Q 350,240 500,240" stroke="#39D5F2" strokeWidth="3" />
                  {/* Forward bounce (Specular) */}
                  <path d="M 310,240 L 460,170" stroke="#39D5F2" strokeWidth="2.5" />
                  <polygon points="460,170 448,172 454,180" fill="#39D5F2" />
                  <text x="360" y="200" fill="#39D5F2" fontSize="10" fontFamily="monospace">
                    SPECULAR BOUNCE (AWAY)
                  </text>
                  <text x="310" y="260" fill="#A0AEC0" fontSize="9" fontFamily="monospace">
                    Near-Zero Echo Returned (-26 dB)
                  </text>
                </g>
              )}

              {activeSurface === 'soil' && (
                <g>
                  {/* Rough soil profile */}
                  <path
                    d="M 220,240 L 240,236 L 260,242 L 280,237 L 300,243 L 330,238 L 360,242 L 400,238 L 450,241 L 500,239"
                    stroke="#61DDAA"
                    strokeWidth="3"
                    fill="none"
                  />
                  {/* Diffuse scattering arrows */}
                  <line x1="310" y1="239" x2="110" y2="48" stroke="#61DDAA" strokeWidth="2" strokeDasharray="3 3" />
                  <line x1="310" y1="239" x2="380" y2="170" stroke="#61DDAA" strokeWidth="1" strokeDasharray="2 2" />
                  <line x1="310" y1="239" x2="260" y2="180" stroke="#61DDAA" strokeWidth="1" strokeDasharray="2 2" />
                  <line x1="310" y1="239" x2="330" y2="160" stroke="#61DDAA" strokeWidth="1" strokeDasharray="2 2" />
                  <text x="140" y="140" fill="#61DDAA" fontSize="10" fontFamily="monospace">
                    DIFFUSE BACKSCATTER (-14 dB)
                  </text>
                </g>
              )}

              {activeSurface === 'urban' && (
                <g>
                  {/* Building with 90 degree wall */}
                  <rect x="330" y="160" width="50" height="80" fill="#1C2B48" stroke="#F5F8FF" strokeWidth="2" />
                  {/* Double bounce ray trace */}
                  <line x1="100" y1="45" x2="310" y2="240" stroke="#39D5F2" strokeWidth="2" />
                  <line x1="310" y1="240" x2="330" y2="210" stroke="#F5F8FF" strokeWidth="2" />
                  <line x1="330" y1="210" x2="105" y2="47" stroke="#F5F8FF" strokeWidth="2.5" />
                  <text x="130" y="100" fill="#F5F8FF" fontSize="10" fontFamily="monospace" fontWeight="bold">
                    DOUBLE-BOUNCE RETURN (+6 dB)
                  </text>
                  <text x="325" y="150" fill="#F5F8FF" fontSize="9" fontFamily="monospace">
                    90° Corner Reflector
                  </text>
                </g>
              )}

              {activeSurface === 'forest' && (
                <g>
                  {/* Tree trunk and crown */}
                  <ellipse cx="320" cy="205" rx="35" ry="25" fill="#103020" stroke="#6C9EFF" strokeWidth="1.5" />
                  <rect x="315" y="230" width="10" height="10" fill="#1C2B48" />
                  {/* Multi-angle volume scattering */}
                  <line x1="320" y1="205" x2="110" y2="48" stroke="#6C9EFF" strokeWidth="2" strokeDasharray="3 2" />
                  <text x="130" y="120" fill="#6C9EFF" fontSize="10" fontFamily="monospace">
                    VOLUME DEPOLARIZATION (VH)
                  </text>
                  <text x="290" y="170" fill="#6C9EFF" fontSize="9" fontFamily="monospace">
                    Canopy Multiple Scattering
                  </text>
                </g>
              )}
            </svg>
          </div>

          {/* Surface selector buttons */}
          <div className="pt-2 border-t border-[#1C2B48]/50">
            <div className="text-[11px] text-[#A0AEC0] mb-2 font-mono">
              TEST SURFACE TARGET INTERACTION:
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => setActiveSurface('water')}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  activeSurface === 'water'
                    ? 'bg-[#101B30] text-[#39D5F2] border border-[#39D5F2]'
                    : 'bg-[#080F20] text-[#A0AEC0] hover:text-white border border-[#1C2B48]'
                }`}
              >
                <Droplets className="w-3.5 h-3.5" />
                <span>Calm Water</span>
              </button>

              <button
                onClick={() => setActiveSurface('soil')}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  activeSurface === 'soil'
                    ? 'bg-[#101B30] text-[#61DDAA] border border-[#61DDAA]'
                    : 'bg-[#080F20] text-[#A0AEC0] hover:text-white border border-[#1C2B48]'
                }`}
              >
                <Mountain className="w-3.5 h-3.5" />
                <span>Rough Soil</span>
              </button>

              <button
                onClick={() => setActiveSurface('urban')}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  activeSurface === 'urban'
                    ? 'bg-[#101B30] text-white border border-white'
                    : 'bg-[#080F20] text-[#A0AEC0] hover:text-white border border-[#1C2B48]'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Urban Walls</span>
              </button>

              <button
                onClick={() => setActiveSurface('forest')}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  activeSurface === 'forest'
                    ? 'bg-[#101B30] text-[#6C9EFF] border border-[#6C9EFF]'
                    : 'bg-[#080F20] text-[#A0AEC0] hover:text-white border border-[#1C2B48]'
                }`}
              >
                <Trees className="w-3.5 h-3.5" />
                <span>Forest Canopy</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Scientific details & explanation (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          {/* Surface physics breakdown card */}
          <div className="p-4 rounded-xl bg-[#050B18] border border-[#1C2B48]">
            <div className="flex items-center justify-between pb-2 border-b border-[#1C2B48]">
              <span className="text-xs font-mono uppercase tracking-wider text-[#39D5F2]">
                Target Physics Breakdown
              </span>
              <span
                className="text-xs font-mono font-bold"
                style={{ color: currentSurfaceData.color }}
              >
                {currentSurfaceData.backscatter}
              </span>
            </div>
            <h4 className="text-base font-display font-semibold text-white mt-2">
              {currentSurfaceData.name}
            </h4>
            <div className="text-xs font-mono text-[#A0AEC0] mt-0.5">
              Mechanism: <strong className="text-white">{currentSurfaceData.mechanism}</strong>
            </div>
            <div className="text-xs font-mono text-[#A0AEC0] mt-0.5">
              Rendered In SAR: <strong className="text-white">{currentSurfaceData.appearance}</strong>
            </div>
            <p className="text-xs text-[#A0AEC0] leading-relaxed mt-3">
              {currentSurfaceData.explanation}
            </p>
          </div>

          {/* Current selected step explanation */}
          <div className="p-4 rounded-xl bg-[#101B30]/60 border border-[#1C2B48]">
            <div className="text-xs font-mono text-[#6C9EFF] uppercase tracking-wider mb-1">
              Workflow Stage {activeStep} of 5
            </div>
            <h4 className="text-sm font-display font-semibold text-white mb-1">
              {steps[activeStep - 1].title} — {steps[activeStep - 1].subtitle}
            </h4>
            <p className="text-xs text-[#A0AEC0] leading-relaxed">
              {steps[activeStep - 1].desc}
            </p>

            <div className="mt-3 flex items-center justify-between pt-2 border-t border-[#1C2B48]/60">
              <button
                onClick={() => setActiveStep((s) => (s > 1 ? s - 1 : 5))}
                className="text-xs text-[#A0AEC0] hover:text-white transition-colors cursor-pointer"
              >
                Previous Step
              </button>
              <button
                onClick={() => setActiveStep((s) => (s < 5 ? s + 1 : 1))}
                className="flex items-center gap-1 text-xs font-medium text-[#39D5F2] hover:underline cursor-pointer"
              >
                <span>Next Step</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
