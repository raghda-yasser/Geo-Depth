import { useState, useMemo } from 'react';
import { PageId } from '../types/satellite';
import {
  VERIFIED_OBSERVATIONS,
  BACKSCATTER_TIME_SERIES,
  POLARIZATION_DISTRIBUTION,
  SATELLITE_MISSION_STATS,
  ObservationRecord,
} from '../data/observationsData';
import { exportObservationsToCsv } from '../utils/exportCsv';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';
import {
  Database,
  Download,
  Filter,
  Search,
  Sparkles,
  ExternalLink,
  ChevronDown,
  Calendar,
  Layers,
  BarChart3,
  CheckCircle2,
} from 'lucide-react';

interface DataLabPageProps {
  onNavigate: (page: PageId, targetId?: string) => void;
  onOpenEarthGuide: () => void;
}

export function DataLabPage({ onNavigate, onOpenEarthGuide }: DataLabPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMission, setSelectedMission] = useState<string>('all');
  const [selectedPolarization, setSelectedPolarization] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [sortField, setSortField] = useState<'date' | 'satellite' | 'backscatterDb'>('date');
  const [sortAsc, setSortAsc] = useState(false);
  const [activeChartTab, setActiveChartTab] = useState<'backscatter' | 'polarization' | 'missions'>('backscatter');
  const [selectedRow, setSelectedRow] = useState<ObservationRecord | null>(VERIFIED_OBSERVATIONS[0]);

  // Filtered observations
  const filteredData = useMemo(() => {
    return VERIFIED_OBSERVATIONS.filter((obs) => {
      const matchSearch =
        obs.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        obs.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        obs.country.toLowerCase().includes(searchQuery.toLowerCase());
      const matchMission = selectedMission === 'all' || obs.satellite === selectedMission;
      const matchPol = selectedPolarization === 'all' || obs.polarization.includes(selectedPolarization);
      const matchRegion = selectedRegion === 'all' || obs.region === selectedRegion;
      return matchSearch && matchMission && matchPol && matchRegion;
    }).sort((a, b) => {
      if (sortField === 'date') {
        return sortAsc
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      if (sortField === 'backscatterDb') {
        return sortAsc ? a.backscatterDb - b.backscatterDb : b.backscatterDb - a.backscatterDb;
      }
      return sortAsc ? a.satellite.localeCompare(b.satellite) : b.satellite.localeCompare(a.satellite);
    });
  }, [searchQuery, selectedMission, selectedPolarization, selectedRegion, sortField, sortAsc]);

  const handleExportCsv = () => {
    exportObservationsToCsv(filteredData, `geo-depth-observations-${selectedMission}.csv`);
  };

  return (
    <div className="w-full flex flex-col space-y-10 pb-20">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#1C2B48]">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#39D5F2] uppercase tracking-wider">
              <Database className="w-4 h-4" />
              <span>GEOSPATIAL ANALYTICS WORKSPACE</span>
            </div>
            <h1 className="font-display font-bold text-3xl sm:text-4xl text-white">
              DATA LAB & RADAR METRICS
            </h1>
            <p className="text-sm text-[#A0AEC0] max-w-2xl">
              Inspect verified satellite metadata, track decibel backscatter time series, and download open-access research records.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportCsv}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#39D5F2] text-[#050B18] font-bold text-xs hover:bg-[#2dc0dc] transition-all shadow-md cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV ({filteredData.length} records)</span>
            </button>
            <button
              onClick={onOpenEarthGuide}
              className="p-2.5 rounded-lg bg-[#101B30] border border-[#1C2B48] text-[#39D5F2] hover:bg-[#162545] cursor-pointer"
              title="Earth Dialogue"
            >
              <Sparkles className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Summary KPI Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-[#080F20] border border-[#1C2B48] space-y-1">
            <div className="text-xs font-mono text-[#A0AEC0] uppercase">VERIFIED OBSERVATIONS</div>
            <div className="text-2xl font-mono font-bold text-white tabular-nums">
              {VERIFIED_OBSERVATIONS.length}
            </div>
            <div className="text-[11px] font-mono text-[#39D5F2]">100% Copernicus & NASA Open Access</div>
          </div>

          <div className="p-4 rounded-xl bg-[#080F20] border border-[#1C2B48] space-y-1">
            <div className="text-xs font-mono text-[#A0AEC0] uppercase">TEMPORAL RANGE</div>
            <div className="text-2xl font-mono font-bold text-white tabular-nums">
              2000 – 2024
            </div>
            <div className="text-[11px] font-mono text-[#61DDAA]">Multi-Decadal Baseline</div>
          </div>

          <div className="p-4 rounded-xl bg-[#080F20] border border-[#1C2B48] space-y-1">
            <div className="text-xs font-mono text-[#A0AEC0] uppercase">BACKSCATTER RANGE</div>
            <div className="text-2xl font-mono font-bold text-white tabular-nums">
              -26.5 to +7.8 <span className="text-xs font-mono text-[#A0AEC0]">dB</span>
            </div>
            <div className="text-[11px] font-mono text-[#6C9EFF]">Sigma-0 Normalized Scale</div>
          </div>

          <div className="p-4 rounded-xl bg-[#080F20] border border-[#1C2B48] space-y-1">
            <div className="text-xs font-mono text-[#A0AEC0] uppercase">ACTIVE CONSTELLATIONS</div>
            <div className="text-2xl font-mono font-bold text-white tabular-nums">
              4 Missions
            </div>
            <div className="text-[11px] font-mono text-[#F5F8FF]">Sentinel-1, Landsat, MODIS, ALOS-2</div>
          </div>
        </div>
      </div>

      {/* Interactive Charts Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-4">
        <div className="p-6 rounded-xl bg-[#080F20] border border-[#1C2B48] shadow-xl space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#1C2B48]">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[#39D5F2]" />
              <h3 className="font-display font-semibold text-lg text-white">
                Interactive Analytical Visualizations
              </h3>
            </div>

            {/* Chart toggle tabs */}
            <div className="flex items-center gap-1 bg-[#050B18] p-1 rounded-lg border border-[#1C2B48] text-xs">
              <button
                onClick={() => setActiveChartTab('backscatter')}
                className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                  activeChartTab === 'backscatter'
                    ? 'bg-[#101B30] text-[#39D5F2] font-semibold'
                    : 'text-[#A0AEC0] hover:text-white'
                }`}
              >
                Backscatter dB Time Series
              </button>
              <button
                onClick={() => setActiveChartTab('polarization')}
                className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                  activeChartTab === 'polarization'
                    ? 'bg-[#101B30] text-[#61DDAA] font-semibold'
                    : 'text-[#A0AEC0] hover:text-white'
                }`}
              >
                Polarization Channels
              </button>
              <button
                onClick={() => setActiveChartTab('missions')}
                className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                  activeChartTab === 'missions'
                    ? 'bg-[#101B30] text-[#6C9EFF] font-semibold'
                    : 'text-[#A0AEC0] hover:text-white'
                }`}
              >
                Mission Statistics
              </button>
            </div>
          </div>

          {/* Chart Rendering */}
          <div className="w-full h-80 pt-2">
            {activeChartTab === 'backscatter' && (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={BACKSCATTER_TIME_SERIES}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1C2B48" />
                  <XAxis dataKey="month" stroke="#A0AEC0" fontSize={11} fontFamily="monospace" />
                  <YAxis
                    stroke="#A0AEC0"
                    fontSize={11}
                    fontFamily="monospace"
                    unit=" dB"
                    domain={[-30, 10]}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#050B18',
                      borderColor: '#1C2B48',
                      borderRadius: '8px',
                      color: '#F5F8FF',
                      fontSize: '12px',
                      fontFamily: 'monospace',
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Line
                    type="monotone"
                    dataKey="baselineDb"
                    name="Cropland Baseline (VV)"
                    stroke="#A0AEC0"
                    strokeWidth={1.5}
                    dot={{ r: 2 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="floodEventDb"
                    name="Flood Inundation Drop (Specular)"
                    stroke="#39D5F2"
                    strokeWidth={2.5}
                    dot={{ r: 4, fill: '#39D5F2' }}
                    connectNulls={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="urbanDb"
                    name="Urban Double Bounce"
                    stroke="#F5F8FF"
                    strokeWidth={2}
                    dot={{ r: 2 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="forestDb"
                    name="Rainforest Canopy Loss (VH)"
                    stroke="#61DDAA"
                    strokeWidth={2}
                    dot={{ r: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}

            {activeChartTab === 'polarization' && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={POLARIZATION_DISTRIBUTION}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1C2B48" />
                  <XAxis dataKey="polarization" stroke="#A0AEC0" fontSize={11} fontFamily="monospace" />
                  <YAxis stroke="#A0AEC0" fontSize={11} fontFamily="monospace" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#050B18',
                      borderColor: '#1C2B48',
                      borderRadius: '8px',
                      color: '#F5F8FF',
                      fontSize: '12px',
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Bar dataKey="count" name="Dataset Count" fill="#39D5F2" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="avgDb" name="Average Sigma0 (dB)" fill="#61DDAA" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}

            {activeChartTab === 'missions' && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={SATELLITE_MISSION_STATS}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1C2B48" />
                  <XAxis dataKey="mission" stroke="#A0AEC0" fontSize={11} fontFamily="monospace" />
                  <YAxis stroke="#A0AEC0" fontSize={11} fontFamily="monospace" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#050B18',
                      borderColor: '#1C2B48',
                      borderRadius: '8px',
                      color: '#F5F8FF',
                      fontSize: '12px',
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Bar dataKey="observations" name="Archived Scenes" fill="#6C9EFF" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="dataSizeGb" name="Data Volume (GB)" fill="#39D5F2" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

      {/* Filter and Query Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-4">
        <div className="p-4 rounded-xl bg-[#080F20] border border-[#1C2B48] flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[220px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#A0AEC0]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by scene ID, location, or country..."
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#050B18] border border-[#1C2B48] text-xs text-white placeholder-[#A0AEC0]/60 focus:outline-none focus:border-[#39D5F2]"
            />
          </div>

          {/* Mission Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-[#A0AEC0] font-mono">Mission:</span>
            <select
              value={selectedMission}
              onChange={(e) => setSelectedMission(e.target.value)}
              className="bg-[#050B18] border border-[#1C2B48] text-white px-2.5 py-1.5 rounded-lg text-xs focus:outline-none focus:border-[#39D5F2] cursor-pointer"
            >
              <option value="all">All Missions</option>
              <option value="Sentinel-1A">Sentinel-1A</option>
              <option value="Sentinel-1B">Sentinel-1B</option>
              <option value="Landsat-9">Landsat-9</option>
              <option value="Terra MODIS">Terra MODIS</option>
              <option value="ALOS-2 PALSAR">ALOS-2 PALSAR</option>
            </select>
          </div>

          {/* Polarization Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-[#A0AEC0] font-mono">Polarization:</span>
            <select
              value={selectedPolarization}
              onChange={(e) => setSelectedPolarization(e.target.value)}
              className="bg-[#050B18] border border-[#1C2B48] text-white px-2.5 py-1.5 rounded-lg text-xs focus:outline-none focus:border-[#39D5F2] cursor-pointer"
            >
              <option value="all">All Channels</option>
              <option value="VV">VV (Co-Pol)</option>
              <option value="VH">VH (Cross-Pol)</option>
              <option value="HH">HH (Co-Pol)</option>
            </select>
          </div>

          {/* Region Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-[#A0AEC0] font-mono">Region:</span>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="bg-[#050B18] border border-[#1C2B48] text-white px-2.5 py-1.5 rounded-lg text-xs focus:outline-none focus:border-[#39D5F2] cursor-pointer"
            >
              <option value="all">Global (All)</option>
              <option value="Europe">Europe</option>
              <option value="South America">South America</option>
              <option value="Asia">Asia</option>
              <option value="Central Asia">Central Asia</option>
              <option value="Oceania">Oceania</option>
              <option value="North America">North America</option>
            </select>
          </div>
        </div>

        {/* Structured Data Table */}
        <div className="rounded-xl bg-[#080F20] border border-[#1C2B48] overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#A0AEC0]">
              <thead className="bg-[#0e182e] text-[#F5F8FF] font-mono border-b border-[#1C2B48]">
                <tr>
                  <th
                    className="p-3.5 cursor-pointer hover:text-[#39D5F2]"
                    onClick={() => {
                      setSortField('date');
                      setSortAsc(!sortAsc);
                    }}
                  >
                    ACQUISITION DATE {sortField === 'date' && (sortAsc ? '▲' : '▼')}
                  </th>
                  <th
                    className="p-3.5 cursor-pointer hover:text-[#39D5F2]"
                    onClick={() => {
                      setSortField('satellite');
                      setSortAsc(!sortAsc);
                    }}
                  >
                    MISSION / SENSOR {sortField === 'satellite' && (sortAsc ? '▲' : '▼')}
                  </th>
                  <th className="p-3.5">PRODUCT TYPE</th>
                  <th className="p-3.5">TARGET SECTOR</th>
                  <th className="p-3.5">POLARIZATION</th>
                  <th
                    className="p-3.5 cursor-pointer hover:text-[#39D5F2]"
                    onClick={() => {
                      setSortField('backscatterDb');
                      setSortAsc(!sortAsc);
                    }}
                  >
                    SIGMA-0 (dB) {sortField === 'backscatterDb' && (sortAsc ? '▲' : '▼')}
                  </th>
                  <th className="p-3.5">PROVIDER</th>
                  <th className="p-3.5 text-right">ARCHIVE ACCESS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1C2B48]/60 font-mono text-[11px]">
                {filteredData.map((obs) => {
                  const isSelected = selectedRow?.id === obs.id;
                  return (
                    <tr
                      key={obs.id}
                      onClick={() => setSelectedRow(obs)}
                      className={`hover:bg-[#101B30]/80 transition-colors cursor-pointer ${
                        isSelected ? 'bg-[#101B30] text-white border-l-2 border-[#39D5F2]' : ''
                      }`}
                    >
                      <td className="p-3.5 text-[#39D5F2] font-semibold">{obs.date}</td>
                      <td className="p-3.5 text-white font-medium">{obs.satellite} · {obs.sensor}</td>
                      <td className="p-3.5">{obs.productType}</td>
                      <td className="p-3.5 text-[#F5F8FF]">{obs.location}, {obs.country}</td>
                      <td className="p-3.5">
                        <span className="px-1.5 py-0.5 rounded bg-[#050B18] border border-[#1C2B48] text-white">
                          {obs.polarization}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <span
                          className={`font-bold ${
                            obs.backscatterDb < -20
                              ? 'text-cyan-400'
                              : obs.backscatterDb > 0
                              ? 'text-amber-400'
                              : 'text-emerald-400'
                          }`}
                        >
                          {obs.backscatterDb.toFixed(1)} dB
                        </span>
                      </td>
                      <td className="p-3.5 text-[#6C9EFF]">{obs.provider}</td>
                      <td className="p-3.5 text-right">
                        <a
                          href={obs.downloadUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 text-[#39D5F2] hover:underline"
                        >
                          <span>Query Hub</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredData.length === 0 && (
            <div className="p-8 text-center text-xs text-[#A0AEC0]">
              No observations matched your active filters. Try resetting the mission or region filter.
            </div>
          )}
        </div>

        {/* Selected Row Detailed Metadata Inspector */}
        {selectedRow && (
          <div className="p-5 rounded-xl bg-[#080F20] border border-[#1C2B48] space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#1C2B48]">
              <span className="text-xs font-mono text-[#39D5F2] uppercase font-semibold">
                SCENE METADATA INSPECTOR: {selectedRow.id}
              </span>
              <span className="text-[11px] font-mono text-[#61DDAA] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified Scientific Scene</span>
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
              <div>
                <span className="text-[#A0AEC0]">COORDINATES:</span>
                <div className="text-white">{selectedRow.lat}°, {selectedRow.lon}°</div>
              </div>
              <div>
                <span className="text-[#A0AEC0]">ORBIT DIRECTION:</span>
                <div className="text-white">{selectedRow.orbitDirection} (Pass {selectedRow.passNumber})</div>
              </div>
              <div>
                <span className="text-[#A0AEC0]">SPATIAL RESOLUTION:</span>
                <div className="text-white">{selectedRow.resolutionMeters}m GRD Ground Range</div>
              </div>
              <div>
                <span className="text-[#A0AEC0]">SCENE FILE SIZE:</span>
                <div className="text-white">{selectedRow.fileSizeBytesMb} MB</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
