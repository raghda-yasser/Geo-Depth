import { useState } from 'react';
import { PageId } from '../types/satellite';
import { CASE_STUDIES } from '../data/caseStudies';
import { Sparkles, X, ChevronRight, Compass, MessageSquare, Send, MapPin, Info } from 'lucide-react';

interface EarthNarratorProps {
  currentPage: PageId;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: PageId, targetId?: string) => void;
}

export function EarthNarrator({
  currentPage,
  isOpen,
  onClose,
  onNavigate,
}: EarthNarratorProps) {
  const [activeTab, setActiveTab] = useState<'guide' | 'surprise' | 'mood' | 'postcards'>('guide');
  const [selectedPostcard, setSelectedPostcard] = useState<number>(0);
  const [surpriseItem, setSurpriseItem] = useState<{
    title: string;
    location: string;
    dialogue: string;
    page: PageId;
    caseId?: string;
  } | null>(null);

  // Contextual Earth dialogues per page
  const pageDialogues: Record<PageId, { greeting: string; detail: string; tip: string }> = {
    home: {
      greeting: "Hey, explorer! Welcome to my world.",
      detail:
        "There's much more happening across my surface than meets the naked eye. Some changes take millions of years, but others happen in hours during storms, floods, or city growth. Satellites with radar help us see through clouds and darkness.",
      tip: "Try the SAR Explorer to see how radar pulses create images without any sunlight!",
    },
    explore: {
      greeting: "Choose a place on my surface!",
      detail:
        "I've got over 510 million square kilometers of surface. Click on the highlighted case study markers to inspect verified satellite data, or use the search bar to locate any city or geographic coordinates.",
      tip: "Notice how coastlines and river basins change dramatically when you switch between optical imagery and dark radar mode.",
    },
    'sar-explorer': {
      greeting: "Ordinary cameras need sunshine. Radar brings its own light!",
      detail:
        "Synthetic Aperture Radar shoots active microwave pulses straight at me. Because water acts like a flat mirror, it bounces the radio beam away, making floodwaters show up pitch black in radar images. Isn't that clever?",
      tip: "Use the draggable slider below to compare pre-flood cropland with peak flood inundation in Emilia-Romagna, Italy.",
    },
    'data-lab': {
      greeting: "Every observation is a puzzle piece.",
      detail:
        "In this lab, scientists analyze backscatter in decibels (dB), track polarizations (VV vs VH), and chart trends across years. You can filter by satellite mission and even download real verified records as CSV.",
      tip: "Check out the decibel drop during May 2023 on the timeline chart—that sudden dive is floodwater appearing!",
    },
    'change-detection': {
      greeting: "Two moments in time. What happened between them?",
      detail:
        "Change detection isn't just taking two pictures and hitting 'subtract'. We have to account for soil moisture, seasonal crops, and radar speckle. Move the opacity slider to reveal the difference layer.",
      tip: "Look closely at the urban high-rises—their double-bounce corner reflection stays super bright year after year.",
    },
    stories: {
      greeting: "I have billions of stories to share.",
      detail:
        "From the great inland Aral Sea evaporating into desert dust to sudden submarine volcanic explosions in Tonga, these stories document real planetary transformations witnessed from orbit.",
      tip: "Click on any story card to step through the interactive timeline and inspect real satellite findings.",
    },
    missions: {
      greeting: "Ready to test your orbital detective skills?",
      detail:
        "Scientists spend years learning to interpret radar backscatter. I’ve prepared 4 interactive missions to see if you can distinguish specular reflection from double bounce!",
      tip: "Answer questions carefully to earn all 5 badges for your Earth Explorer Passport.",
    },
    about: {
      greeting: "Transparency is the heart of science.",
      detail:
        "Everything in Geo Depth relies on genuine open-access data from NASA Earthdata, ESA Copernicus, and the Alaska Satellite Facility. No fake numbers, no fabricated dates.",
      tip: "You can explore the direct scientific data portals listed at the bottom of this page.",
    },
  };

  const currentDialogue = pageDialogues[currentPage] || pageDialogues.home;

  const postcards = [
    {
      title: 'Venice Lagoon & Tidal Flats',
      coordinates: '45.4408° N, 12.3155° E',
      text: 'My ancient stone canals and tidal marshlands produce distinct double-bounce radar signals against the calm waters of the Adriatic.',
      page: 'explore' as PageId,
    },
    {
      title: 'Amazonian River Meanders',
      coordinates: '3.4653° S, 62.2159° W',
      text: 'My mighty Amazon river shifts its curves over decades. Oxbow lakes pinch off and leave sickle-shaped water mirrors.',
      page: 'stories' as PageId,
    },
    {
      title: 'Himalayan Glacial Tongue',
      coordinates: '27.9881° N, 86.9250° E',
      text: 'Ice flows like ultra-slow honey. Radar interferometry tracks glacier motion down to millimeters per day through heavy blizzards.',
      page: 'sar-explorer' as PageId,
    },
  ];

  const handleSurpriseMe = () => {
    const randomCase = CASE_STUDIES[Math.floor(Math.random() * CASE_STUDIES.length)];
    setSurpriseItem({
      title: randomCase.title,
      location: randomCase.location,
      dialogue: randomCase.narrativeLead,
      page: 'sar-explorer',
      caseId: randomCase.id,
    });
    setActiveTab('surprise');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#080F20] border border-[#1C2B48] rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1C2B48] bg-[#050B18]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#101B30] border border-[#39D5F2] flex items-center justify-center text-[#39D5F2]">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-base text-white flex items-center gap-2">
                Earth Voice & Guide
                <span className="text-[10px] font-mono text-[#39D5F2] border border-[#39D5F2]/40 rounded px-1.5 py-0.5">
                  Planetary Narrator
                </span>
              </h3>
              <p className="text-xs text-[#A0AEC0]">Your curious, intelligent guide across the globe</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#A0AEC0] hover:text-white hover:bg-[#101B30] transition-colors cursor-pointer"
            aria-label="Close Earth guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Feature Tabs */}
        <div className="flex items-center gap-1 px-6 py-2.5 bg-[#0e182e] border-b border-[#1C2B48] text-xs font-medium overflow-x-auto">
          <button
            onClick={() => setActiveTab('guide')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'guide'
                ? 'bg-[#101B30] text-[#39D5F2] border border-[#1C2B48]'
                : 'text-[#A0AEC0] hover:text-white'
            }`}
          >
            Contextual Guide
          </button>
          <button
            onClick={() => setActiveTab('mood')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'mood'
                ? 'bg-[#101B30] text-[#39D5F2] border border-[#1C2B48]'
                : 'text-[#A0AEC0] hover:text-white'
            }`}
          >
            Earth's Observation Pulse
          </button>
          <button
            onClick={() => setActiveTab('postcards')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'postcards'
                ? 'bg-[#101B30] text-[#39D5F2] border border-[#1C2B48]'
                : 'text-[#A0AEC0] hover:text-white'
            }`}
          >
            Earth's Postcards
          </button>
          <button
            onClick={handleSurpriseMe}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'surprise'
                ? 'bg-[#101B30] text-[#61DDAA] border border-[#1C2B48]'
                : 'text-[#61DDAA] hover:bg-[#101B30]'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Surprise Me!</span>
          </button>
        </div>

        {/* Body content based on tab */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm">
          {activeTab === 'guide' && (
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-[#101B30]/60 border border-[#1C2B48] relative">
                <div className="text-xs font-mono text-[#39D5F2] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Earth Speaking ({currentPage})</span>
                </div>
                <p className="text-base text-white font-medium mb-2">
                  &ldquo;{currentDialogue.greeting}&rdquo;
                </p>
                <p className="text-sm text-[#A0AEC0] leading-relaxed">
                  {currentDialogue.detail}
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-[#050B18] border border-[#1C2B48] flex items-start gap-3">
                <Info className="w-4 h-4 text-[#6C9EFF] shrink-0 mt-0.5" />
                <div className="text-xs text-[#A0AEC0] leading-relaxed">
                  <strong className="text-[#F5F8FF]">Scientific Tip:</strong> {currentDialogue.tip}
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-[#A0AEC0]">
                  Where would you like to explore next?
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onClose();
                      onNavigate('explore');
                    }}
                    className="px-3 py-1.5 rounded-md text-xs font-medium bg-[#101B30] hover:bg-[#162545] text-[#39D5F2] border border-[#1C2B48] cursor-pointer"
                  >
                    Open Map
                  </button>
                  <button
                    onClick={() => {
                      onClose();
                      onNavigate('sar-explorer');
                    }}
                    className="px-3 py-1.5 rounded-md text-xs font-medium bg-[#39D5F2] text-[#050B18] font-semibold hover:bg-[#2dc0dc] cursor-pointer"
                  >
                    Launch SAR Explorer
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'mood' && (
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-[#101B30] border border-[#1C2B48]">
                <div className="text-xs font-mono text-[#61DDAA] uppercase tracking-wider mb-1">
                  Today's Planetary Observation Highlight
                </div>
                <h4 className="text-base font-display font-semibold text-white mb-2">
                  Atmospheric Rivers & Polar Ice Rifting
                </h4>
                <p className="text-xs text-[#A0AEC0] leading-relaxed mb-3">
                  Earth doesn't have human feelings, but it has vibrant dynamic cycles! Today, Sentinel-1 radar satellites are tracking massive atmospheric moisture conveyor belts flowing across the North Pacific, while monitoring deep crevasses along the Pine Island Glacier shelf in West Antarctica.
                </p>
                <div className="grid grid-cols-2 gap-3 text-xs font-mono bg-[#050B18] p-3 rounded border border-[#1C2B48]">
                  <div>
                    <span className="text-[#A0AEC0]">Global Sea Surface Temp:</span>
                    <div className="text-white font-semibold">20.98 °C (Empirical Mean)</div>
                  </div>
                  <div>
                    <span className="text-[#A0AEC0]">Sentinel-1 Active Passes:</span>
                    <div className="text-[#39D5F2] font-semibold">14 orbits / 24h</div>
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-[#A0AEC0] italic">
                Scientific Note: Observation metrics reflect empirical physical states measured by NASA and ESA instruments.
              </p>
            </div>
          )}

          {activeTab === 'postcards' && (
            <div className="space-y-4">
              <div className="text-xs text-[#A0AEC0]">
                Select a postcard from Earth's dynamic coordinates:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {postcards.map((pc, idx) => (
                  <button
                    key={pc.title}
                    onClick={() => setSelectedPostcard(idx)}
                    className={`p-3 text-left rounded-lg border transition-all cursor-pointer ${
                      selectedPostcard === idx
                        ? 'bg-[#101B30] border-[#39D5F2] text-white'
                        : 'bg-[#050B18] border-[#1C2B48] text-[#A0AEC0] hover:text-white'
                    }`}
                  >
                    <div className="text-xs font-semibold">{pc.title}</div>
                    <div className="text-[10px] font-mono text-[#39D5F2] mt-1">{pc.coordinates}</div>
                  </button>
                ))}
              </div>

              <div className="p-4 rounded-lg bg-[#101B30]/70 border border-[#1C2B48]">
                <div className="flex items-center gap-2 text-xs font-mono text-[#39D5F2] mb-2">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{postcards[selectedPostcard].coordinates}</span>
                </div>
                <p className="text-sm text-[#F5F8FF] leading-relaxed mb-4">
                  &ldquo;{postcards[selectedPostcard].text}&rdquo;
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onNavigate(postcards[selectedPostcard].page);
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-[#39D5F2] hover:underline cursor-pointer"
                >
                  <span>Explore this phenomenon</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {activeTab === 'surprise' && surpriseItem && (
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-[#101B30] border border-[#61DDAA]/40">
                <div className="text-xs font-mono text-[#61DDAA] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Surprise Discovery Selected!</span>
                </div>
                <h4 className="text-base font-display font-semibold text-white mb-1">
                  {surpriseItem.title}
                </h4>
                <div className="text-xs font-mono text-[#39D5F2] mb-3">{surpriseItem.location}</div>
                <p className="text-sm text-[#A0AEC0] leading-relaxed mb-4">
                  &ldquo;{surpriseItem.dialogue}&rdquo;
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onNavigate(surpriseItem.page);
                  }}
                  className="px-4 py-2 rounded-lg bg-[#61DDAA] text-[#050B18] text-xs font-semibold hover:bg-[#52c696] transition-colors cursor-pointer"
                >
                  Jump to Investigation
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
