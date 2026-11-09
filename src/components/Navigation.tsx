import { useState } from 'react';
import { PageId } from '../types/satellite';
import { Globe, Menu, X, Sparkles } from 'lucide-react';

interface NavigationProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenEarthGuide: () => void;
}

export function Navigation({ currentPage, onNavigate, onOpenEarthGuide }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'explore', label: 'Explore Earth' },
    { id: 'sar-explorer', label: 'SAR Explorer' },
    { id: 'data-lab', label: 'Data Lab' },
    { id: 'change-detection', label: 'Change Detection' },
    { id: 'stories', label: 'Earth Stories' },
    { id: 'missions', label: 'Mission Center' },
    { id: 'about', label: 'About' },
  ];

  const handleNavClick = (id: PageId) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#050B18]/90 backdrop-blur-md border-b border-[#1C2B48] px-4 lg:px-8 py-3.5 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
        {/* Zone 1: Single text element Brand wordmark */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 text-left text-white group cursor-pointer whitespace-nowrap shrink-0"
        >
          <div className="w-8 h-8 rounded-lg bg-[#101B30] border border-[#39D5F2]/40 flex items-center justify-center text-[#39D5F2] group-hover:border-[#39D5F2] transition-colors">
            <Globe className="w-4 h-4 text-[#39D5F2] animate-[spin_24s_linear_infinite]" />
          </div>
          <div>
            <span className="font-display font-bold text-lg tracking-wider text-white flex items-center gap-1.5">
              GEO<span className="text-[#39D5F2]">DEPTH</span>
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links (single-line, concise) */}
        <nav className="hidden xl:flex items-center gap-1 text-sm font-medium">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium tracking-wide transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'text-[#39D5F2] bg-[#101B30] border border-[#1C2B48]'
                    : 'text-[#A0AEC0] hover:text-white hover:bg-[#101B30]/50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary Action + Mobile hamburger */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onOpenEarthGuide}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#101B30] border border-[#39D5F2]/40 hover:border-[#39D5F2] text-xs font-medium text-[#F5F8FF] hover:text-[#39D5F2] transition-all whitespace-nowrap shrink-0 cursor-pointer shadow-sm"
            title="Ask Earth / Open planetary narrator guide"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#39D5F2]" />
            <span>Earth Guide</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-1.5 rounded-lg text-[#A0AEC0] hover:text-white hover:bg-[#101B30] border border-[#1C2B48] cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-[#1C2B48] mt-3 pt-3 pb-2 space-y-1">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-3.5 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-[#39D5F2] bg-[#101B30] font-semibold'
                    : 'text-[#A0AEC0] hover:text-white hover:bg-[#101B30]/50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
