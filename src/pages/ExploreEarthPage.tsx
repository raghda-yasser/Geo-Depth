import { useEffect, useRef, useState, useTransition } from 'react';
import { PageId } from '../types/satellite';
import { CASE_STUDIES } from '../data/caseStudies';
import { VERIFIED_OBSERVATIONS } from '../data/observationsData';
import L from 'leaflet';
import {
  Search,
  RotateCcw,
  Layers,
  MapPin,
  ExternalLink,
  ArrowRight,
  Info,
  Calendar,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

interface ExploreEarthPageProps {
  onNavigate: (page: PageId, targetId?: string) => void;
  onOpenEarthGuide: () => void;
}

export function ExploreEarthPage({ onNavigate, onOpenEarthGuide }: ExploreEarthPageProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  const [, startTransition] = useTransition();

  // Selected state
  const [selectedLocation, setSelectedLocation] = useState<{
    name: string;
    lat: number;
    lon: number;
    caseStudyId?: string;
    isCustomSearch?: boolean;
  }>({
    name: 'Emilia-Romagna, Italy',
    lat: 44.4949,
    lon: 11.3426,
    caseStudyId: 'emilia-romagna-flood-2023',
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [activeLayer, setActiveLayer] = useState<'dark' | 'satellite' | 'osm'>('satellite');
  const [selectedDate, setSelectedDate] = useState('2023-05-21');

  // Tile layers definition
  const tileLayers = {
    satellite: {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution: 'Tiles &copy; Esri, Earthstar Geographics, USGS, NASA',
      maxZoom: 18,
    },
    dark: {
      url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
      attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
      maxZoom: 19,
    },
    osm: {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19,
    },
  };

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [20, 10],
      zoom: 3,
      minZoom: 2,
      maxBounds: [
        [-90, -180],
        [90, 180],
      ],
      zoomControl: true,
    });

    const baseTile = L.tileLayer(tileLayers[activeLayer].url, {
      attribution: tileLayers[activeLayer].attribution,
      maxZoom: tileLayers[activeLayer].maxZoom,
    }).addTo(map);

    tileLayerRef.current = baseTile;
    markersLayerRef.current = L.layerGroup().addTo(map);
    mapInstanceRef.current = map;

    // Click handler on map to inspect arbitrary coordinates
    map.on('click', (e: L.LeafletMouseEvent) => {
      const lat = Number(e.latlng.lat.toFixed(4));
      const lon = Number(e.latlng.lng.toFixed(4));
      startTransition(() => {
        setSelectedLocation({
          name: `Custom Coordinates (${lat}°, ${lon}°)`,
          lat,
          lon,
          isCustomSearch: true,
        });
      });
    });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update base tile layer on layer change
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    if (tileLayerRef.current) {
      mapInstanceRef.current.removeLayer(tileLayerRef.current);
    }
    const newLayer = L.tileLayer(tileLayers[activeLayer].url, {
      attribution: tileLayers[activeLayer].attribution,
      maxZoom: tileLayers[activeLayer].maxZoom,
    }).addTo(mapInstanceRef.current);
    tileLayerRef.current = newLayer;
  }, [activeLayer]);

  // Update verified markers on map
  useEffect(() => {
    if (!markersLayerRef.current || !mapInstanceRef.current) return;
    markersLayerRef.current.clearLayers();

    // Custom pulse icon for case study markers
    const createCustomIcon = (isSelected: boolean) =>
      L.divIcon({
        className: 'custom-map-marker',
        html: `
          <div style="
            width: ${isSelected ? '24px' : '18px'};
            height: ${isSelected ? '24px' : '18px'};
            border-radius: 50%;
            background: ${isSelected ? '#39D5F2' : '#61DDAA'};
            border: 2px solid #050B18;
            box-shadow: 0 0 ${isSelected ? '16px #39D5F2' : '8px #61DDAA'};
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
          ">
            <div style="width: 6px; height: 6px; border-radius: 50%; background: #050B18;"></div>
          </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

    CASE_STUDIES.forEach((cs) => {
      const isSelected = selectedLocation.caseStudyId === cs.id;
      const marker = L.marker([cs.coordinates.lat, cs.coordinates.lon], {
        icon: createCustomIcon(isSelected),
      });

      marker.on('click', () => {
        startTransition(() => {
          setSelectedLocation({
            name: `${cs.title} (${cs.location})`,
            lat: cs.coordinates.lat,
            lon: cs.coordinates.lon,
            caseStudyId: cs.id,
            isCustomSearch: false,
          });
        });
        mapInstanceRef.current?.flyTo([cs.coordinates.lat, cs.coordinates.lon], cs.zoomLevel, {
          duration: 1.5,
        });
      });

      marker.bindTooltip(
        `<div style="font-family: 'Space Grotesk', sans-serif; font-weight: bold; color: #39D5F2;">${cs.title}</div>
         <div style="font-size: 11px; color: #A0AEC0;">${cs.category} · Verified SAR Study</div>`,
        { direction: 'top', offset: [0, -10] }
      );

      markersLayerRef.current?.addLayer(marker);
    });

    // If custom location selected, add a distinct marker
    if (selectedLocation.isCustomSearch) {
      const searchMarker = L.marker([selectedLocation.lat, selectedLocation.lon], {
        icon: L.divIcon({
          className: 'search-marker',
          html: `
            <div style="
              width: 20px;
              height: 20px;
              border-radius: 50%;
              background: #F5F8FF;
              border: 2px solid #39D5F2;
              box-shadow: 0 0 10px #39D5F2;
            "></div>
          `,
          iconSize: [20, 20],
          iconAnchor: [10, 10],
        }),
      });
      markersLayerRef.current?.addLayer(searchMarker);
    }
  }, [selectedLocation]);

  // Geocoding search handler via Nominatim with fallback
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    setSearchError(null);

    try {
      const resp = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchQuery.trim()
        )}&limit=1`,
        { headers: { 'Accept-Language': 'en' } }
      );
      const data = await resp.json();
      if (data && data.length > 0) {
        const item = data[0];
        const lat = parseFloat(item.lat);
        const lon = parseFloat(item.lon);

        startTransition(() => {
          setSelectedLocation({
            name: item.display_name.split(',').slice(0, 2).join(','),
            lat,
            lon,
            isCustomSearch: true,
          });
        });

        mapInstanceRef.current?.flyTo([lat, lon], 8, { duration: 1.5 });
      } else {
        setSearchError('Location not found in geocoding directory.');
      }
    } catch {
      setSearchError('Geocoding service unavailable. You can also click directly on the map.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleResetMap = () => {
    mapInstanceRef.current?.flyTo([20, 10], 3, { duration: 1.5 });
  };

  const matchedCaseStudy = CASE_STUDIES.find((c) => c.id === selectedLocation.caseStudyId);
  const matchedObservations = VERIFIED_OBSERVATIONS.filter(
    (obs) =>
      Math.abs(obs.lat - selectedLocation.lat) < 2 && Math.abs(obs.lon - selectedLocation.lon) < 2
  );

  return (
    <div className="w-full flex flex-col space-y-6 pb-16">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#1C2B48]">
          <div>
            <div className="text-xs font-mono text-[#39D5F2] uppercase tracking-wider mb-1">
              GEOSPATIAL SURFACE EXPLORATION
            </div>
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-white">
              EXPLORE EARTH SATELLITE COVERAGE
            </h1>
          </div>
          <button
            onClick={onOpenEarthGuide}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#101B30] border border-[#39D5F2]/40 text-xs text-[#39D5F2] hover:bg-[#162545] cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>&ldquo;Choose a place on my surface!&rdquo;</span>
          </button>
        </div>
      </div>

      {/* Main Map + Side Panel Workspace */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* MAP CANVAS (8 cols) */}
          <div className="lg:col-span-8 flex flex-col space-y-3">
            {/* Map Top Toolbar Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-[#080F20] border border-[#1C2B48] rounded-xl text-xs">
              {/* Geocoding Search */}
              <form onSubmit={handleSearch} className="flex items-center gap-1.5 flex-1 min-w-[220px]">
                <div className="relative flex-1">
                  <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#A0AEC0]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search city, country, or coordinates..."
                    className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-[#050B18] border border-[#1C2B48] text-xs text-white placeholder-[#A0AEC0]/60 focus:outline-none focus:border-[#39D5F2]"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSearching}
                  className="px-3 py-1.5 rounded-lg bg-[#101B30] hover:bg-[#162545] text-[#39D5F2] border border-[#1C2B48] font-medium cursor-pointer"
                >
                  {isSearching ? 'Locating...' : 'Search'}
                </button>
              </form>

              {/* Layer Selector */}
              <div className="flex items-center gap-1 bg-[#050B18] p-1 rounded-lg border border-[#1C2B48]">
                <button
                  onClick={() => setActiveLayer('satellite')}
                  className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                    activeLayer === 'satellite'
                      ? 'bg-[#101B30] text-[#39D5F2] font-semibold'
                      : 'text-[#A0AEC0] hover:text-white'
                  }`}
                >
                  Satellite TrueColor
                </button>
                <button
                  onClick={() => setActiveLayer('dark')}
                  className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                    activeLayer === 'dark'
                      ? 'bg-[#101B30] text-[#39D5F2] font-semibold'
                      : 'text-[#A0AEC0] hover:text-white'
                  }`}
                >
                  Dark Matter
                </button>
                <button
                  onClick={() => setActiveLayer('osm')}
                  className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                    activeLayer === 'osm'
                      ? 'bg-[#101B30] text-[#39D5F2] font-semibold'
                      : 'text-[#A0AEC0] hover:text-white'
                  }`}
                >
                  Street Map
                </button>
              </div>

              {/* Reset Map Button */}
              <button
                onClick={handleResetMap}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#050B18] border border-[#1C2B48] text-[#A0AEC0] hover:text-white cursor-pointer"
                title="Reset global view"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset View</span>
              </button>
            </div>

            {searchError && (
              <div className="text-xs text-rose-400 bg-rose-950/40 p-2 rounded border border-rose-900/60">
                {searchError}
              </div>
            )}

            {/* Map Container */}
            <div className="relative w-full h-[520px] rounded-xl overflow-hidden border border-[#1C2B48] shadow-2xl">
              <div ref={mapContainerRef} className="w-full h-full z-10" />

              {/* Floating Coordinates Bar */}
              <div className="absolute bottom-3 left-3 z-20 px-3 py-1.5 rounded-lg bg-[#050B18]/90 border border-[#1C2B48] backdrop-blur-md text-xs font-mono text-[#F5F8FF] flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#39D5F2]" />
                  <span>
                    LAT: <strong className="text-[#39D5F2]">{selectedLocation.lat}°</strong>
                  </span>
                  <span>
                    LON: <strong className="text-[#39D5F2]">{selectedLocation.lon}°</strong>
                  </span>
                </div>
                <span className="text-[#A0AEC0]">|</span>
                <span className="text-[#61DDAA] text-[11px]">Click anywhere to inspect</span>
              </div>
            </div>

            {/* Verified Case Study Quick Jump Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
              <span className="text-xs font-mono text-[#A0AEC0] whitespace-nowrap shrink-0">
                Verified Studies:
              </span>
              {CASE_STUDIES.map((cs) => (
                <button
                  key={cs.id}
                  onClick={() => {
                    setSelectedLocation({
                      name: `${cs.title} (${cs.location})`,
                      lat: cs.coordinates.lat,
                      lon: cs.coordinates.lon,
                      caseStudyId: cs.id,
                      isCustomSearch: false,
                    });
                    mapInstanceRef.current?.flyTo([cs.coordinates.lat, cs.coordinates.lon], cs.zoomLevel, {
                      duration: 1.5,
                    });
                  }}
                  className={`px-3 py-1 rounded-md text-xs font-mono whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    selectedLocation.caseStudyId === cs.id
                      ? 'bg-[#39D5F2] text-[#050B18] font-bold'
                      : 'bg-[#080F20] text-[#A0AEC0] hover:text-white border border-[#1C2B48]'
                  }`}
                >
                  {cs.title}
                </button>
              ))}
            </div>
          </div>

          {/* LOCATION INSPECTION PANEL (4 cols) */}
          <div className="lg:col-span-4 flex flex-col space-y-4">
            <div className="p-5 rounded-xl bg-[#080F20] border border-[#1C2B48] shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#1C2B48]">
                <div className="flex items-center gap-2 text-xs font-mono text-[#39D5F2] uppercase tracking-wider">
                  <Layers className="w-4 h-4" />
                  <span>Location Intelligence</span>
                </div>
                <div className="text-[11px] font-mono text-[#61DDAA] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>WGS84 Coordinates</span>
                </div>
              </div>

              <div>
                <h3 className="font-display font-bold text-lg text-white">
                  {selectedLocation.name}
                </h3>
                <div className="text-xs font-mono text-[#39D5F2] mt-0.5">
                  {selectedLocation.lat}°, {selectedLocation.lon}°
                </div>
              </div>

              {/* Case Study Details If Matched */}
              {matchedCaseStudy ? (
                <div className="space-y-4 pt-2">
                  <div className="p-3.5 rounded-lg bg-[#050B18] border border-[#1C2B48] space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-[#39D5F2] font-semibold">{matchedCaseStudy.category}</span>
                      <span className="text-[#A0AEC0]">{matchedCaseStudy.eventDate}</span>
                    </div>
                    <p className="text-xs text-[#A0AEC0] leading-relaxed">
                      {matchedCaseStudy.summary}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <div className="p-2.5 rounded bg-[#101B30]/60 border border-[#1C2B48]">
                      <div className="text-[#A0AEC0]">Primary Sensor:</div>
                      <div className="text-white font-semibold">{matchedCaseStudy.beforeImage.satellite}</div>
                    </div>
                    <div className="p-2.5 rounded bg-[#101B30]/60 border border-[#1C2B48]">
                      <div className="text-[#A0AEC0]">Resolution:</div>
                      <div className="text-[#39D5F2] font-semibold">10m Spatial</div>
                    </div>
                  </div>

                  {/* Deep dive actions */}
                  <div className="pt-2 space-y-2">
                    <button
                      onClick={() => onNavigate('sar-explorer', matchedCaseStudy.id)}
                      className="w-full py-2.5 px-4 rounded-lg bg-[#39D5F2] text-[#050B18] font-bold text-xs hover:bg-[#2dc0dc] transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Open in SAR Explorer</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onNavigate('change-detection')}
                      className="w-full py-2 px-4 rounded-lg bg-[#101B30] text-[#F5F8FF] border border-[#1C2B48] hover:border-[#39D5F2] text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Analyze Multi-Date Changes</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Unverified / Arbitrary Location Notice (Strict Compliance: never pretend arbitrary coordinates have SAR data) */
                <div className="p-4 rounded-lg bg-[#050B18] border border-[#1C2B48] space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
                    <Info className="w-4 h-4 shrink-0" />
                    <span>Scientific Data Transparency Notice</span>
                  </div>
                  <p className="text-xs text-[#A0AEC0] leading-relaxed">
                    GEO DEPTH only presents scientifically verified satellite radar products with authentic acquisition timestamps. This custom location does not have a pre-calibrated case study in our offline baseline.
                  </p>
                  <p className="text-xs text-[#A0AEC0] leading-relaxed">
                    You can query the raw archives for this coordinate bounding box directly on:
                  </p>
                  <a
                    href={`https://dataspace.copernicus.eu/browser/?zoom=10&lat=${selectedLocation.lat}&lng=${selectedLocation.lon}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-[#39D5F2] hover:underline"
                  >
                    <span>Search Copernicus Data Space</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}

              {/* Matched observations count */}
              <div className="pt-3 border-t border-[#1C2B48] text-xs text-[#A0AEC0] flex items-center justify-between">
                <span>Verified Overpasses in Sector:</span>
                <span className="font-mono font-bold text-[#39D5F2]">
                  {matchedObservations.length > 0 ? `${matchedObservations.length} datasets` : 'Available on Copernicus Hub'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
