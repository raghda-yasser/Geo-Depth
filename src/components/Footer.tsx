import { PageId } from '../types/satellite';
import { Globe, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="w-full bg-[#050B18] border-t border-[#1C2B48] text-xs text-[#A0AEC0] pt-12 pb-8 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
        {/* Brand & mission */}
        <div className="md:col-span-1 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#101B30] border border-[#39D5F2]/40 flex items-center justify-center text-[#39D5F2]">
              <Globe className="w-4 h-4 text-[#39D5F2]" />
            </div>
            <span className="font-display font-bold text-base tracking-wider text-white">
              GEO<span className="text-[#39D5F2]">DEPTH</span>
            </span>
          </div>
          <p className="text-xs text-[#A0AEC0] leading-relaxed">
            Every pixel tells a story. An interactive Earth observation and Synthetic Aperture Radar (SAR) discovery
            platform built for NASA Space Apps Challenge.
          </p>
          <div className="text-[11px] font-mono text-[#6C9EFF] pt-1">
            NASA SPACE APPS CHALLENGE 2026
          </div>
        </div>

        {/* Navigation links */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#F5F8FF] mb-3 font-display">
            Exploration Hub
          </h4>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => onNavigate('home')}
                className="hover:text-[#39D5F2] transition-colors cursor-pointer"
              >
                Home Overview
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('explore')}
                className="hover:text-[#39D5F2] transition-colors cursor-pointer"
              >
                Interactive Map Explorer
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('sar-explorer')}
                className="hover:text-[#39D5F2] transition-colors cursor-pointer"
              >
                Synthetic Aperture Radar
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('change-detection')}
                className="hover:text-[#39D5F2] transition-colors cursor-pointer"
              >
                Change Detection Lab
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('data-lab')}
                className="hover:text-[#39D5F2] transition-colors cursor-pointer"
              >
                Geospatial Data Analytics
              </button>
            </li>
          </ul>
        </div>

        {/* Stories & Missions */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#F5F8FF] mb-3 font-display">
            Learning & Discovery
          </h4>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => onNavigate('stories')}
                className="hover:text-[#39D5F2] transition-colors cursor-pointer"
              >
                Earth Stories Library
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('missions')}
                className="hover:text-[#39D5F2] transition-colors cursor-pointer"
              >
                Mission Center Quizzes
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('about')}
                className="hover:text-[#39D5F2] transition-colors cursor-pointer"
              >
                Scientific Methodology
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('about')}
                className="hover:text-[#39D5F2] transition-colors cursor-pointer"
              >
                Team & Open Source
              </button>
            </li>
          </ul>
        </div>

        {/* Verified Data Sources */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#F5F8FF] mb-3 font-display">
            Verified Data Providers
          </h4>
          <ul className="space-y-2">
            <li>
              <a
                href="https://earthdata.nasa.gov/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-[#39D5F2] transition-colors"
              >
                <span>NASA Earthdata & GIBS</span>
                <ExternalLink className="w-3 h-3 text-[#A0AEC0]" />
              </a>
            </li>
            <li>
              <a
                href="https://dataspace.copernicus.eu/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-[#39D5F2] transition-colors"
              >
                <span>ESA Copernicus Sentinel-1</span>
                <ExternalLink className="w-3 h-3 text-[#A0AEC0]" />
              </a>
            </li>
            <li>
              <a
                href="https://asf.alaska.edu/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-[#39D5F2] transition-colors"
              >
                <span>Alaska Satellite Facility (ASF DAAC)</span>
                <ExternalLink className="w-3 h-3 text-[#A0AEC0]" />
              </a>
            </li>
            <li>
              <a
                href="https://earthobservatory.nasa.gov/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-[#39D5F2] transition-colors"
              >
                <span>NASA Earth Observatory</span>
                <ExternalLink className="w-3 h-3 text-[#A0AEC0]" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-[#1C2B48] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#A0AEC0]">
        <div>
          Scientific imagery and satellite data sourced from NASA and ESA open archives under open-access research terms.
        </div>
        <div className="flex items-center gap-4">
          <span>Zero-Budget Open Source Architecture</span>
          <span>·</span>
          <span>WGS84 Ellipsoid Standard</span>
        </div>
      </div>
    </footer>
  );
}
