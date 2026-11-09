import { useState } from 'react';
import { PageId } from '../types/satellite';
import { EARTH_STORIES } from '../data/stories';
import { BookOpen, Sparkles, Calendar, MapPin, ExternalLink, ArrowRight, ChevronRight, Layers } from 'lucide-react';

interface EarthStoriesPageProps {
  onNavigate: (page: PageId, targetId?: string) => void;
  onOpenEarthGuide: () => void;
}

export function EarthStoriesPage({ onNavigate, onOpenEarthGuide }: EarthStoriesPageProps) {
  const [selectedStoryId, setSelectedStoryId] = useState<string>(EARTH_STORIES[0].id);

  const activeStory =
    EARTH_STORIES.find((s) => s.id === selectedStoryId) || EARTH_STORIES[0];

  return (
    <div className="w-full flex flex-col space-y-12 pb-20">
      {/* 1. Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#1C2B48]">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#6C9EFF] uppercase tracking-wider">
              <BookOpen className="w-4 h-4" />
              <span>PLANETARY NARRATIVE ARCHIVE</span>
            </div>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
              EARTH STORIES
            </h1>
            <p className="text-sm text-[#A0AEC0] max-w-2xl leading-relaxed">
              Real environmental phenomena told through the observant eyes of Earth and documented by orbital satellites.
            </p>
          </div>

          <button
            onClick={onOpenEarthGuide}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#101B30] border border-[#39D5F2]/40 text-xs text-[#39D5F2] hover:bg-[#162545] cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>&ldquo;I have billions of stories to share...&rdquo;</span>
          </button>
        </div>
      </div>

      {/* 2. Story Library Horizontal Ribbon */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {EARTH_STORIES.map((story) => {
            const isSelected = story.id === activeStory.id;
            return (
              <button
                key={story.id}
                onClick={() => setSelectedStoryId(story.id)}
                className={`p-4 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#101B30] border-[#39D5F2] shadow-[0_0_15px_rgba(57,213,242,0.15)]'
                    : 'bg-[#080F20] border-[#1C2B48] hover:border-[#39D5F2]/50'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-[#39D5F2] font-semibold">{story.category.split('&')[0]}</span>
                    <span className="text-[#A0AEC0]">{story.dateRange.split('–')[0]}</span>
                  </div>
                  <h3 className="font-display font-semibold text-sm text-white line-clamp-2">
                    {story.title}
                  </h3>
                  <div className="text-[11px] font-mono text-[#A0AEC0] flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#61DDAA]" />
                    <span>{story.location}</span>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-[#1C2B48]/50 flex items-center justify-between text-[11px]">
                  <span className="text-[#A0AEC0]">{story.timeline.length} timeline milestones</span>
                  <ChevronRight className={`w-3.5 h-3.5 ${isSelected ? 'text-[#39D5F2]' : 'text-[#A0AEC0]'}`} />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Selected Story Cinematic Reading Experience */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-10">
        {/* Story Hero Header Card */}
        <div className="relative rounded-2xl overflow-hidden border border-[#1C2B48] bg-[#080F20] shadow-2xl">
          <div className="relative h-72 sm:h-96 w-full">
            <img
              src={activeStory.heroImage}
              alt={activeStory.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080F20] via-[#080F20]/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 space-y-2">
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#39D5F2]">
                <span>{activeStory.category}</span>
                <span>·</span>
                <span>{activeStory.dateRange}</span>
                <span>·</span>
                <span className="text-[#61DDAA]">{activeStory.location}</span>
              </div>
              <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-white max-w-3xl">
                {activeStory.title}
              </h2>
            </div>
          </div>

          {/* Earth's Personal Narrator Box */}
          <div className="p-6 bg-[#0e182e] border-t border-[#1C2B48] flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#101B30] border border-[#39D5F2] flex items-center justify-center text-[#39D5F2] shrink-0 mt-0.5">
              <Sparkles className="w-5 h-5 text-[#39D5F2]" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-mono text-[#39D5F2] font-semibold uppercase tracking-wider">
                Earth As Narrator
              </span>
              <p className="text-sm text-[#F5F8FF] leading-relaxed italic">
                &ldquo;{activeStory.earthDialogue}&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* Abstract & Scientific Findings Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Narrative Abstract (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 rounded-xl bg-[#080F20] border border-[#1C2B48] space-y-4">
              <h3 className="font-display font-semibold text-xl text-white">
                Observational Overview
              </h3>
              <p className="text-sm text-[#A0AEC0] leading-relaxed">
                {activeStory.abstract}
              </p>
            </div>

            {/* Interactive Timeline */}
            <div className="p-6 rounded-xl bg-[#080F20] border border-[#1C2B48] space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#1C2B48]">
                <h3 className="font-display font-semibold text-lg text-white flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#39D5F2]" />
                  <span>Chronological Satellite Timeline</span>
                </h3>
                <span className="text-xs font-mono text-[#A0AEC0]">Orbital Passes</span>
              </div>

              <div className="relative pl-6 space-y-8 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#1C2B48]">
                {activeStory.timeline.map((entry, idx) => (
                  <div key={idx} className="relative space-y-1.5">
                    {/* Circle marker */}
                    <div className="absolute -left-[27px] top-1 w-3.5 h-3.5 rounded-full bg-[#050B18] border-2 border-[#39D5F2]" />
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-[#39D5F2] font-bold">{entry.date}</span>
                      <span className="text-[#6C9EFF]">{entry.satellite}</span>
                    </div>
                    <div className="font-display font-semibold text-white text-sm">
                      {entry.headline}
                    </div>
                    <p className="text-xs text-[#A0AEC0] leading-relaxed">
                      {entry.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Key Findings & Dataset Links (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-xl bg-[#080F20] border border-[#1C2B48] space-y-4">
              <div className="text-xs font-mono text-[#61DDAA] uppercase tracking-wider">
                EMPIRICAL EVIDENCE
              </div>
              <h3 className="font-display font-semibold text-lg text-white">
                Important Scientific Findings
              </h3>
              <ul className="space-y-3">
                {activeStory.scientificFindings.map((finding, idx) => (
                  <li
                    key={idx}
                    className="p-3.5 rounded-lg bg-[#050B18] border border-[#1C2B48] text-xs text-[#A0AEC0] leading-relaxed flex items-start gap-2.5"
                  >
                    <span className="font-mono text-[#61DDAA] font-bold shrink-0">#{idx + 1}</span>
                    <span>{finding}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Original Dataset Links */}
            <div className="p-6 rounded-xl bg-[#080F20] border border-[#1C2B48] space-y-4">
              <h4 className="font-display font-semibold text-base text-white">
                Original Verified Data Links
              </h4>
              <div className="space-y-2">
                {activeStory.datasetLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-lg bg-[#050B18] border border-[#1C2B48] hover:border-[#39D5F2] transition-colors flex items-center justify-between text-xs group"
                  >
                    <div>
                      <div className="text-white font-medium group-hover:text-[#39D5F2] transition-colors">
                        {link.name}
                      </div>
                      <div className="text-[11px] font-mono text-[#A0AEC0]">{link.provider}</div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-[#A0AEC0] group-hover:text-[#39D5F2]" />
                  </a>
                ))}
              </div>
            </div>

            {/* Next Story Action */}
            <div className="p-5 rounded-xl bg-[#101B30]/60 border border-[#1C2B48] flex items-center justify-between">
              <div className="text-xs text-[#A0AEC0]">
                Ready to test what you learned?
              </div>
              <button
                onClick={() => onNavigate('missions')}
                className="px-3.5 py-1.5 rounded-lg bg-[#39D5F2] text-[#050B18] font-bold text-xs hover:bg-[#2dc0dc] transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Mission Center</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
