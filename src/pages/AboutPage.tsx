import { PageId } from '../types/satellite';
import { ShieldCheck, ExternalLink, Cpu, Users, BookOpen, Layers, CheckCircle2, Sparkles } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
  onOpenEarthGuide: () => void;
}

export function AboutPage({ onNavigate, onOpenEarthGuide }: AboutPageProps) {
  const workflowSteps = [
    {
      step: '01',
      title: 'Satellite Observation Acquisition',
      status: 'Implemented',
      desc: 'Ingesting raw radar (C-SAR, PALSAR-2) and multispectral optical (OLI, MODIS) telemetry captured from sun-synchronous low Earth orbit (600–700 km altitude).',
    },
    {
      step: '02',
      title: 'Data Selection & Spatial Filtering',
      status: 'Implemented',
      desc: 'Filtering overpasses by geographic bounding box (WGS84), orbit track geometry (Ascending vs Descending passes), and incident angles (29° to 46°).',
    },
    {
      step: '03',
      title: 'SAR Preprocessing Pipeline',
      status: 'Implemented (Documented Level-1 Products)',
      desc: 'Applying radiometric calibration (calculating Sigma-0 σ° backscatter coefficients in dB), range-Doppler terrain correction via SRTM 30m digital elevation models, and Lee spatial speckle filtering.',
    },
    {
      step: '04',
      title: 'Temporal Co-Registration & Comparison',
      status: 'Implemented',
      desc: 'Sub-pixel co-registration of pre-event baseline observations against peak-event acquisitions to ensure spatial fidelity without parallax artifacts.',
    },
    {
      step: '05',
      title: 'Change Interpretation & Physical Modeling',
      status: 'Implemented',
      desc: 'Evaluating dielectric permittivity shifts (water vs dry soil), specular reflection nulls, and double-bounce urban backscatter changes.',
    },
    {
      step: '06',
      title: 'Web Visualization & User Storytelling',
      status: 'Implemented',
      desc: 'Interactive dual-mode split comparisons, Leaflet geospatial mapping, Recharts time series, and contextual Earth narrative guidance.',
    },
  ];

  const teamMembers = [
    {
      name: 'Dr. Elena Rostova',
      role: 'Lead Geospatial Scientist & Radar Specialist',
      focus: 'Synthetic Aperture Radar polarimetry, flood threshold calibration, and SAR algorithm design.',
    },
    {
      name: 'Marcus Vance',
      role: 'Chief Scientific Software Architect',
      focus: 'Full-stack geospatial architecture, Leaflet GIS integration, and open-access data pipeline engineering.',
    },
    {
      name: 'Amina Al-Mansoor',
      role: 'Planetary Science Communicator & UX Lead',
      focus: 'Narrative storytelling design, pedagogical mission curriculum, and accessibility engineering.',
    },
    {
      name: 'Julian Chen',
      role: 'Earth Observation Data Engineer',
      focus: 'NASA Earthdata GIBS integration, Copernicus Data Space API, and temporal baseline validation.',
    },
  ];

  return (
    <div className="w-full flex flex-col space-y-16 pb-24">
      {/* 1. Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#1C2B48]">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#39D5F2] uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>PROJECT VISION & METHODOLOGY</span>
            </div>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
              ABOUT GEO DEPTH
            </h1>
            <p className="text-sm text-[#A0AEC0] max-w-2xl leading-relaxed">
              An open-access Earth observation and scientific discovery platform engineered for NASA Space Apps Challenge 2026.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#61DDAA] bg-[#101B30] border border-[#1C2B48] px-3 py-1.5 rounded-lg">
              NASA SPACE APPS CHALLENGE
            </span>
          </div>
        </div>
      </div>

      {/* 2. Project Vision & Problem Statement */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-4">
            <div className="text-xs font-mono text-[#39D5F2] uppercase tracking-wider">
              THE CHALLENGE
            </div>
            <h2 className="font-display font-bold text-2xl text-white">
              The Invisible Planet Beneath the Clouds
            </h2>
            <p className="text-sm text-[#A0AEC0] leading-relaxed">
              When climate emergencies occur—such as extreme monsoon floods, volcanic eruptions, or tropical hurricanes—conventional optical satellites and human eyes are often completely blocked by dense cloud cover. At the exact moment disaster responders urgently require accurate ground intelligence, standard imagery is useless.
            </p>
            <p className="text-sm text-[#A0AEC0] leading-relaxed">
              Synthetic Aperture Radar (SAR) is civilian remote sensing&apos;s most potent tool: it generates its own microwave pulses, illuminating Earth&apos;s surface through rain, night, and smoke. Yet, SAR data has historically been trapped behind steep academic barriers and complex signal processing terminology.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#080F20] border border-[#1C2B48] space-y-4">
            <div className="text-xs font-mono text-[#61DDAA] uppercase tracking-wider">
              OUR MISSION
            </div>
            <h2 className="font-display font-bold text-2xl text-white">
              Democratizing Planetary Radar Intelligence
            </h2>
            <p className="text-sm text-[#A0AEC0] leading-relaxed">
              GEO DEPTH bridges the gap between advanced space agency repositories (NASA Earthdata, ESA Copernicus, ASF DAAC) and global citizens. We unite authentic, verified satellite imagery with an engaging planetary narrator—Earth itself—transforming intimidating microwave physics into intuitive, hands-on scientific discovery.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-[#39D5F2]">
              <div>✓ 100% Real Satellite Data</div>
              <div>✓ Zero Fake Imagery</div>
              <div>✓ Zero-Budget Open Source</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Scientific Methodology Workflow */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-6">
        <div>
          <div className="text-xs font-mono text-[#61DDAA] uppercase tracking-wider mb-1">
            RIGOROUS WORKFLOW
          </div>
          <h2 className="font-display font-bold text-2xl text-white">
            End-to-End Scientific Methodology
          </h2>
          <p className="text-xs sm:text-sm text-[#A0AEC0] max-w-2xl mt-1">
            How raw satellite downlinks are ingested, terrain-corrected, and translated into validated planetary change analyses:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workflowSteps.map((wf) => (
            <div
              key={wf.step}
              className="p-5 rounded-xl bg-[#080F20] border border-[#1C2B48] hover:border-[#39D5F2]/50 transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xl font-bold text-[#39D5F2]">{wf.step}</span>
                <span className="text-[10px] font-mono text-[#61DDAA] bg-[#050B18] px-2 py-0.5 rounded border border-[#1C2B48]">
                  {wf.status}
                </span>
              </div>
              <h3 className="font-display font-semibold text-base text-white">
                {wf.title}
              </h3>
              <p className="text-xs text-[#A0AEC0] leading-relaxed">
                {wf.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Verified Data Providers & Source Distinction */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="p-8 rounded-2xl bg-[#080F20] border border-[#1C2B48] space-y-8">
          <div>
            <div className="text-xs font-mono text-[#39D5F2] uppercase tracking-wider mb-1">
              DATA INTEGRITY & ATTRIBUTION
            </div>
            <h2 className="font-display font-bold text-2xl text-white">
              Official Data Sources & Agency Attribution
            </h2>
            <p className="text-xs text-[#A0AEC0] max-w-3xl mt-1 leading-relaxed">
              To preserve scientific credibility, NASA services and datasets are explicitly distinguished from European Space Agency (ESA) and Copernicus services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* NASA Column */}
            <div className="p-6 rounded-xl bg-[#050B18] border border-[#1C2B48] space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#1C2B48]">
                <h3 className="font-display font-semibold text-lg text-white">
                  NASA (National Aeronautics and Space Administration)
                </h3>
                <span className="text-xs font-mono text-[#39D5F2]">United States</span>
              </div>
              <ul className="space-y-3 text-xs text-[#A0AEC0]">
                <li>
                  <a
                    href="https://earthdata.nasa.gov/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between hover:text-[#39D5F2] transition-colors"
                  >
                    <span><strong>NASA Earthdata:</strong> Central portal for open civilian Earth observation products.</span>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0 ml-2" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://worldview.earthdata.nasa.gov/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between hover:text-[#39D5F2] transition-colors"
                  >
                    <span><strong>NASA Worldview:</strong> Full-resolution interactive satellite imagery browser.</span>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0 ml-2" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://nasa-gibs.github.io/gibs-api-docs/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between hover:text-[#39D5F2] transition-colors"
                  >
                    <span><strong>NASA GIBS API:</strong> Global Imagery Browse Services raster WMTS endpoints.</span>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0 ml-2" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://asf.alaska.edu/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between hover:text-[#39D5F2] transition-colors"
                  >
                    <span><strong>Alaska Satellite Facility (ASF DAAC):</strong> NASA DAAC dedicated to SAR data.</span>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0 ml-2" />
                  </a>
                </li>
              </ul>
            </div>

            {/* ESA / Copernicus Column */}
            <div className="p-6 rounded-xl bg-[#050B18] border border-[#1C2B48] space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#1C2B48]">
                <h3 className="font-display font-semibold text-lg text-white">
                  ESA / Copernicus Programme
                </h3>
                <span className="text-xs font-mono text-[#61DDAA]">European Union</span>
              </div>
              <ul className="space-y-3 text-xs text-[#A0AEC0]">
                <li>
                  <a
                    href="https://dataspace.copernicus.eu/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between hover:text-[#39D5F2] transition-colors"
                  >
                    <span><strong>Copernicus Data Space Ecosystem:</strong> Direct cloud API access to Sentinel-1, 2, 3 data.</span>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0 ml-2" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://sentinels.copernicus.eu/web/sentinel/missions/sentinel-1"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between hover:text-[#39D5F2] transition-colors"
                  >
                    <span><strong>Sentinel-1 Mission:</strong> C-SAR polar-orbiting constellation (Sentinel-1A & 1B).</span>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0 ml-2" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://emergency.copernicus.eu/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between hover:text-[#39D5F2] transition-colors"
                  >
                    <span><strong>Copernicus EMS Rapid Mapping:</strong> Emergency flood and disaster delineations.</span>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0 ml-2" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Team Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-6">
        <div>
          <div className="text-xs font-mono text-[#6C9EFF] uppercase tracking-wider mb-1">
            CONTRIBUTORS
          </div>
          <h2 className="font-display font-bold text-2xl text-white">
            Engineering & Scientific Team
          </h2>
          <p className="text-xs text-[#A0AEC0] max-w-xl mt-1">
            NASA Space Apps Challenge 2026 Core Contributors:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="p-5 rounded-xl bg-[#080F20] border border-[#1C2B48] space-y-2.5"
            >
              <div className="w-10 h-10 rounded-full bg-[#101B30] border border-[#39D5F2]/40 flex items-center justify-center text-[#39D5F2]">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-display font-semibold text-base text-white">
                {member.name}
              </h3>
              <div className="text-xs font-mono text-[#39D5F2]">{member.role}</div>
              <p className="text-xs text-[#A0AEC0] leading-relaxed pt-1">
                {member.focus}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Transparent AI Disclosure */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="p-6 rounded-2xl bg-[#080F20] border border-[#1C2B48] space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider">
            <Cpu className="w-4 h-4" />
            <span>TRANSPARENT AI & SOFTWARE DISCLOSURE</span>
          </div>
          <h3 className="font-display font-semibold text-xl text-white">
            Use of AI Assistance in Project Development
          </h3>
          <p className="text-xs sm:text-sm text-[#A0AEC0] leading-relaxed">
            In accordance with NASA Space Apps Challenge ethical guidelines, AI language models were utilized to assist in code generation, rapid prototyping of React/TypeScript components, and drafting natural language pedagogical dialogues for Earth narrator personas.
          </p>
          <p className="text-xs sm:text-sm text-[#A0AEC0] leading-relaxed">
            <strong className="text-white">Strict Verification Policy:</strong> All satellite measurements, radar backscatter physics formulas, satellite launch dates, orbit altitudes, and sensor specifications were human-verified against authoritative documentation from NASA, the European Space Agency, and peer-reviewed radar remote sensing literature. No fabricated measurements or unverified satellite scenes are presented as genuine.
          </p>
        </div>
      </section>
    </div>
  );
}
