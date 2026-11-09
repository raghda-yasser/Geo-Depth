import { useState } from 'react';
import { PageId } from './types/satellite';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { EarthNarrator } from './components/EarthNarrator';
import { HomePage } from './pages/HomePage';
import { ExploreEarthPage } from './pages/ExploreEarthPage';
import { SarExplorerPage } from './pages/SarExplorerPage';
import { DataLabPage } from './pages/DataLabPage';
import { ChangeDetectionPage } from './pages/ChangeDetectionPage';
import { EarthStoriesPage } from './pages/EarthStoriesPage';
import { MissionCenterPage } from './pages/MissionCenterPage';
import { AboutPage } from './pages/AboutPage';
import { Sparkles, Globe } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [selectedCaseId, setSelectedCaseId] = useState<string>('emilia-romagna-flood-2023');
  const [isEarthGuideOpen, setIsEarthGuideOpen] = useState(false);

  const handleNavigate = (page: PageId, targetId?: string) => {
    if (targetId) {
      setSelectedCaseId(targetId);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#050B18] text-[#F5F8FF] flex flex-col font-sans selection:bg-[#39D5F2]/20 selection:text-[#39D5F2]">
      {/* Global Navigation */}
      <Navigation
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenEarthGuide={() => setIsEarthGuideOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenEarthGuide={() => setIsEarthGuideOpen(true)}
          />
        )}
        {currentPage === 'explore' && (
          <ExploreEarthPage
            onNavigate={handleNavigate}
            onOpenEarthGuide={() => setIsEarthGuideOpen(true)}
          />
        )}
        {currentPage === 'sar-explorer' && (
          <SarExplorerPage
            onNavigate={handleNavigate}
            onOpenEarthGuide={() => setIsEarthGuideOpen(true)}
            initialCaseId={selectedCaseId}
          />
        )}
        {currentPage === 'data-lab' && (
          <DataLabPage
            onNavigate={handleNavigate}
            onOpenEarthGuide={() => setIsEarthGuideOpen(true)}
          />
        )}
        {currentPage === 'change-detection' && (
          <ChangeDetectionPage
            onNavigate={handleNavigate}
            onOpenEarthGuide={() => setIsEarthGuideOpen(true)}
          />
        )}
        {currentPage === 'stories' && (
          <EarthStoriesPage
            onNavigate={handleNavigate}
            onOpenEarthGuide={() => setIsEarthGuideOpen(true)}
          />
        )}
        {currentPage === 'missions' && (
          <MissionCenterPage
            onNavigate={handleNavigate}
            onOpenEarthGuide={() => setIsEarthGuideOpen(true)}
          />
        )}
        {currentPage === 'about' && (
          <AboutPage
            onNavigate={handleNavigate}
            onOpenEarthGuide={() => setIsEarthGuideOpen(true)}
          />
        )}
      </main>

      {/* Persistent Floating Earth Guide Quick-Trigger */}
      <button
        onClick={() => setIsEarthGuideOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#101B30]/95 border border-[#39D5F2]/50 hover:border-[#39D5F2] text-xs font-medium text-white shadow-[0_4px_20px_rgba(0,0,0,0.5)] backdrop-blur-md hover:scale-105 transition-all cursor-pointer group"
        aria-label="Open planetary voice and guide"
      >
        <div className="w-5 h-5 rounded-full bg-[#050B18] border border-[#39D5F2] flex items-center justify-center text-[#39D5F2] group-hover:rotate-45 transition-transform">
          <Sparkles className="w-3 h-3 text-[#39D5F2]" />
        </div>
        <span className="font-mono text-[#F5F8FF] group-hover:text-[#39D5F2] transition-colors">
          Earth Voice
        </span>
      </button>

      {/* Earth Voice Narrator Modal */}
      <EarthNarrator
        currentPage={currentPage}
        isOpen={isEarthGuideOpen}
        onClose={() => setIsEarthGuideOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* Global Scientific Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
