import { PageId } from '../types/satellite';
import { CASE_STUDIES } from '../data/caseStudies';
import { Globe, ArrowRight, Eye, Layers, Compass, Sparkles, ExternalLink, ShieldCheck, Cpu } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId, targetId?: string) => void;
  onOpenEarthGuide: () => void;
}

export function HomePage({ onNavigate, onOpenEarthGuide }: HomePageProps) {
  const featuredCases = CASE_STUDIES.slice(0, 4);

  return (
    <div className="w-full flex flex-col space-y-20 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-6">
        {/* Background authentic Earth backdrop & space glow */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/The_Blue_Marble_%28remastered%29.jpg/1200px-The_Blue_Marble_%28remastered%29.jpg"
            alt="Authentic NASA Blue Marble Earth from space"
            className="w-full h-full object-cover opacity-25 filter blur-[1px] scale-105"
            referrerPolicy="no-referrer"
          />
          {/* Gradients to blend smoothly into #050B18 */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050B18] via-[#050B18]/70 to-[#050B18]/90" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050B18_85%)]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8 py-12">
          {/* Orbital badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#101B30]/90 border border-[#39D5F2]/40 text-xs font-mono text-[#39D5F2] backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#39D5F2] animate-ping" />
            <span>NASA SPACE APPS CHALLENGE · RADAR REMOTE SENSING</span>
          </div>

          {/* Main Cinematic Heading */}
          <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white leading-[1.08] max-w-4xl mx-auto">
            OUR PLANET IS <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5F8FF] via-[#39D5F2] to-[#6C9EFF]">
              ALWAYS CHANGING.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-[#A0AEC0] max-w-2xl mx-auto font-normal leading-relaxed">
            Explore invisible patterns, discover environmental changes, and understand Earth’s story through authentic Synthetic Aperture Radar (SAR) observations.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('explore')}
              className="px-6 py-3.5 rounded-lg bg-[#39D5F2] text-[#050B18] font-semibold text-sm hover:bg-[#2dc0dc] transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(57,213,242,0.3)] cursor-pointer"
            >
              <Compass className="w-4 h-4" />
              <span>EXPLORE EARTH</span>
            </button>
            <button
              onClick={() => onNavigate('sar-explorer')}
              className="px-6 py-3.5 rounded-lg bg-[#101B30] text-[#F5F8FF] border border-[#1C2B48] hover:border-[#39D5F2] font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>HOW SAR WORKS</span>
              <ArrowRight className="w-4 h-4 text-[#39D5F2]" />
            </button>
          </div>

          {/* Earth's Opening Dialogue Panel */}
          <div className="max-w-2xl mx-auto mt-8 p-5 rounded-xl bg-[#080F20]/90 border border-[#1C2B48] backdrop-blur-md shadow-2xl text-left flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#101B30] border border-[#39D5F2] flex items-center justify-center text-[#39D5F2] shrink-0 mt-1">
              <Sparkles className="w-5 h-5 text-[#39D5F2]" />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold text-[#39D5F2] uppercase tracking-wider">
                  Earth · Planetary Voice
                </span>
                <button
                  onClick={onOpenEarthGuide}
                  className="text-[11px] text-[#6C9EFF] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Chat with Earth</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
              <p className="text-sm text-[#F5F8FF] leading-relaxed italic">
                &ldquo;Hey, explorer! Welcome to my world. I&apos;ve got a story to tell. Some changes are visible. Others are hidden beneath clouds, darkness, and subtle surface differences. Ready to discover what satellites can reveal?&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INTRODUCTION: SEE THE EARTH DIFFERENTLY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#39D5F2] uppercase tracking-wider">
              <Eye className="w-4 h-4" />
              <span>RADAR REMOTE SENSING</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white leading-tight">
              SEE THE EARTH DIFFERENTLY.
            </h2>
            <p className="text-sm sm:text-base text-[#A0AEC0] leading-relaxed">
              Optical satellite cameras operate like the human eye: they need clear skies and daylight. But more than 60% of Earth is cloaked in clouds at any given moment.
            </p>
            <p className="text-sm sm:text-base text-[#A0AEC0] leading-relaxed">
              <strong className="text-white">Synthetic Aperture Radar (SAR)</strong> breaks this limit. By transmitting microwave pulses that travel right through cloud droplets and measure the microscopic roughness of the ground, radar satellites provide unbroken, 24/7 vision of our dynamic world.
            </p>
            <div className="pt-2 flex items-center gap-6 text-xs font-mono text-[#6C9EFF]">
              <div>● ALL-WEATHER 24/7</div>
              <div>● CLOUD PENETRATING</div>
              <div>● 10M RESOLUTION</div>
            </div>
          </div>

          {/* Authentic Imagery Demonstration Card */}
          <div className="relative rounded-xl overflow-hidden border border-[#1C2B48] bg-[#080F20] shadow-2xl">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/The_Earth_seen_from_Apollo_17.jpg/1200px-The_Earth_seen_from_Apollo_17.jpg"
              alt="Authentic Apollo 17 Earth Photograph (NASA)"
              className="w-full h-80 object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="p-4 bg-[#080F20] border-t border-[#1C2B48] flex items-center justify-between text-xs text-[#A0AEC0]">
              <span className="font-mono text-[#39D5F2]">NASA Blue Marble / Apollo 17</span>
              <span>Authentic NASA Planetary Observation</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS: 3 VISUAL STEPS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="text-xs font-mono text-[#61DDAA] uppercase tracking-wider">
            SCIENTIFIC WORKFLOW
          </div>
          <h2 className="font-display font-bold text-3xl text-white">
            HOW SATELLITE DISCOVERY WORKS
          </h2>
          <p className="text-sm text-[#A0AEC0]">
            From orbital microwave transmission to life-saving civil protection insights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="p-6 rounded-xl bg-[#080F20] border border-[#1C2B48] hover:border-[#39D5F2]/60 transition-all space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-2xl font-bold text-[#39D5F2]">01</span>
              <Cpu className="w-5 h-5 text-[#39D5F2]" />
            </div>
            <h3 className="font-display font-semibold text-lg text-white">
              OBSERVE
            </h3>
            <p className="text-xs sm:text-sm text-[#A0AEC0] leading-relaxed">
              Satellites like Sentinel-1A and Landsat-9 orbit at 700 km altitude, continuously scanning land and oceans with calibrated microwave radar and optical spectral bands.
            </p>
            <div className="pt-2 text-[11px] font-mono text-[#6C9EFF]">
              Level-1 GRD / SLC Products
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-6 rounded-xl bg-[#080F20] border border-[#1C2B48] hover:border-[#61DDAA]/60 transition-all space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-2xl font-bold text-[#61DDAA]">02</span>
              <Layers className="w-5 h-5 text-[#61DDAA]" />
            </div>
            <h3 className="font-display font-semibold text-lg text-white">
              DETECT
            </h3>
            <p className="text-xs sm:text-sm text-[#A0AEC0] leading-relaxed">
              Compare observations across time. When calm floodwater covers fields, backscatter drops by 10 dB. When buildings rise, corner reflectors bounce intense signals.
            </p>
            <div className="pt-2 text-[11px] font-mono text-[#61DDAA]">
              Multi-Temporal Change Vectors
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-6 rounded-xl bg-[#080F20] border border-[#1C2B48] hover:border-[#6C9EFF]/60 transition-all space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-2xl font-bold text-[#6C9EFF]">03</span>
              <Globe className="w-5 h-5 text-[#6C9EFF]" />
            </div>
            <h3 className="font-display font-semibold text-lg text-white">
              UNDERSTAND
            </h3>
            <p className="text-xs sm:text-sm text-[#A0AEC0] leading-relaxed">
              Connect the physical radar physics with real human impacts: directing disaster relief teams, tracking deforestation rates, and preserving coastal ecosystems.
            </p>
            <div className="pt-2 text-[11px] font-mono text-[#6C9EFF]">
              Evidence-Based Climate Decisions
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED DISCOVERIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-mono text-[#39D5F2] uppercase tracking-wider mb-1">
              VERIFIED CASE STUDIES
            </div>
            <h2 className="font-display font-bold text-3xl text-white">
              FEATURED ORBITAL DISCOVERIES
            </h2>
          </div>
          <button
            onClick={() => onNavigate('change-detection')}
            className="text-xs font-semibold text-[#39D5F2] hover:underline flex items-center gap-1.5 cursor-pointer"
          >
            <span>View all change detection studies</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredCases.map((cs) => (
            <div
              key={cs.id}
              onClick={() => onNavigate('sar-explorer', cs.id)}
              className="group p-5 rounded-xl bg-[#080F20] border border-[#1C2B48] hover:border-[#39D5F2] transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-[#39D5F2] font-semibold">{cs.category}</span>
                  <span className="font-mono text-[#A0AEC0]">{cs.eventDate}</span>
                </div>
                <h3 className="font-display font-semibold text-xl text-white group-hover:text-[#39D5F2] transition-colors">
                  {cs.title}
                </h3>
                <p className="text-xs text-[#A0AEC0] leading-relaxed line-clamp-2">
                  {cs.summary}
                </p>

                {/* Satellite image thumbnail preview */}
                <div className="relative h-44 rounded-lg overflow-hidden border border-[#1C2B48]">
                  <img
                    src={cs.afterImage.url}
                    alt={cs.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded bg-black/80 text-[10px] font-mono text-[#F5F8FF]">
                    {cs.afterImage.satellite} · {cs.location}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#1C2B48] flex items-center justify-between text-xs text-[#A0AEC0]">
                <span>{cs.keyMetrics[0].label}: <strong className="text-white">{cs.keyMetrics[0].value} {cs.keyMetrics[0].unit}</strong></span>
                <span className="text-[#39D5F2] flex items-center gap-1">
                  Inspect in SAR Explorer <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. DATA SOURCES SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-2xl bg-[#080F20] border border-[#1C2B48] space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono text-[#61DDAA] uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>SCIENTIFIC AUTHENTICITY</span>
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
            POWERED BY OPEN ACCESS EARTH DATA
          </h2>
          <p className="text-sm text-[#A0AEC0] max-w-3xl leading-relaxed">
            GEO DEPTH strictly integrates verified observations from premier civilian space agencies. Every dataset, image, and measurement comes from documented public scientific repositories:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <a
              href="https://earthdata.nasa.gov/"
              target="_blank"
              rel="noreferrer"
              className="p-4 rounded-xl bg-[#050B18] border border-[#1C2B48] hover:border-[#39D5F2] transition-colors"
            >
              <div className="font-display font-semibold text-white text-base">NASA Earthdata</div>
              <p className="text-xs text-[#A0AEC0] mt-1">
                Global satellite products, GIBS tile endpoints, and MODIS surface reflectance.
              </p>
              <div className="text-[11px] text-[#39D5F2] mt-3 flex items-center gap-1">
                <span>earthdata.nasa.gov</span>
                <ExternalLink className="w-3 h-3" />
              </div>
            </a>

            <a
              href="https://dataspace.copernicus.eu/"
              target="_blank"
              rel="noreferrer"
              className="p-4 rounded-xl bg-[#050B18] border border-[#1C2B48] hover:border-[#39D5F2] transition-colors"
            >
              <div className="font-display font-semibold text-white text-base">Copernicus Sentinel-1</div>
              <p className="text-xs text-[#A0AEC0] mt-1">
                C-band Synthetic Aperture Radar all-weather radar imagery at 10-meter resolution.
              </p>
              <div className="text-[11px] text-[#39D5F2] mt-3 flex items-center gap-1">
                <span>dataspace.copernicus.eu</span>
                <ExternalLink className="w-3 h-3" />
              </div>
            </a>

            <a
              href="https://asf.alaska.edu/"
              target="_blank"
              rel="noreferrer"
              className="p-4 rounded-xl bg-[#050B18] border border-[#1C2B48] hover:border-[#39D5F2] transition-colors"
            >
              <div className="font-display font-semibold text-white text-base">Alaska Satellite Facility</div>
              <p className="text-xs text-[#A0AEC0] mt-1">
                NASA Distributed Active Archive Center (ASF DAAC) dedicated to SAR processing.
              </p>
              <div className="text-[11px] text-[#39D5F2] mt-3 flex items-center gap-1">
                <span>asf.alaska.edu</span>
                <ExternalLink className="w-3 h-3" />
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* 6. FINAL CTA */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-6 pt-8">
        <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white">
          THE EARTH HAS A STORY. <br />
          <span className="text-[#39D5F2]">START EXPLORING.</span>
        </h2>
        <p className="text-sm sm:text-base text-[#A0AEC0] max-w-xl mx-auto">
          Test your orbital detective skills, inspect verified radar observations, and unlock achievements in the Mission Center.
        </p>
        <div className="pt-2">
          <button
            onClick={() => onNavigate('missions')}
            className="px-8 py-4 rounded-xl bg-[#39D5F2] text-[#050B18] font-bold text-sm hover:bg-[#2dc0dc] transition-all shadow-[0_0_25px_rgba(57,213,242,0.4)] cursor-pointer"
          >
            START YOUR MISSION
          </button>
        </div>
      </section>
    </div>
  );
}
