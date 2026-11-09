import { CaseStudy } from '../types/satellite';

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'emilia-romagna-flood-2023',
    title: 'Emilia-Romagna Catastrophic Flooding',
    category: 'Flood Extent',
    location: 'Emilia-Romagna Region, Northern Italy',
    coordinates: { lat: 44.4949, lon: 11.3426 },
    zoomLevel: 10,
    eventDate: 'May 2023',
    summary:
      'Continuous torrential rainfall triggered severe river overflow across 23 river basins. Sentinel-1 SAR provided all-weather, day-and-night floodwater delineation through dense overcast skies.',
    narrativeLead:
      'When heavy storms dumped six months of rain in 36 hours, thick cloud decks completely blinded optical satellites. Sentinel-1’s radar pulses penetrated straight through the clouds to map every flooded field.',
    beforeImage: {
      url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=80',
      date: '2023-05-08',
      label: 'Pre-Event Baseline (Normal Soil/Crops)',
      satellite: 'Sentinel-1A C-SAR',
      polarization: 'VV backscatter (-13.4 dB average)',
    },
    afterImage: {
      url: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=1400&q=80',
      date: '2023-05-21',
      label: 'Peak Inundation (Specular Water Surfaces)',
      satellite: 'Sentinel-1A C-SAR',
      polarization: 'VV backscatter (-24.1 dB floodwater)',
    },
    differenceDescription:
      'Dark patches indicate specular reflection where standing water bounced microwave pulses away from the antenna. Red/cyan thresholds isolate newly submerged agricultural acreage (~420 km²).',
    scientificExplanation:
      'Synthetic Aperture Radar transmits active C-band microwave pulses (wavelength λ = 5.6 cm). Smooth water surfaces act as specular reflectors: the transmitted pulse bounces off the surface like a mirror and travels away from the receiver, returning virtually zero backscatter (-22 to -28 dB, rendering jet black). In contrast, rough vegetated soil produces diffuse scatter, returning a fraction of energy back to the antenna (-10 to -16 dB, rendering middle gray).',
    sarSignificance:
      'Optical cameras (MODIS, Landsat, Sentinel-2) were 100% cloud-obscured between May 15 and May 19. Sentinel-1 radar operated independently of sunlight and cloud droplets, providing civil protection teams with actionable flood extent polygons within 3 hours of overpass.',
    limitations: [
      'Wind-induced surface capillary waves on open water create roughness, causing false non-water backscatter.',
      'Flooding beneath dense tree canopies causes double-bounce scattering (radar pulse bounces from water to tree trunk back to sensor), making flooded forests appear bright rather than dark.',
      'Steep topography causes radar shadow and foreshortening, masking narrow mountain valley floors.',
    ],
    keyMetrics: [
      { label: 'Flooded Surface Area', value: '420', unit: 'km²' },
      { label: 'Backscatter Drop', value: '-10.7', unit: 'dB' },
      { label: 'Cloud Penetration', value: '100', unit: '%' },
      { label: 'Resolution', value: '10', unit: 'm' },
    ],
    attribution: {
      source: 'Copernicus Emergency Management Service (EMSR659) / ESA Sentinel-1',
      url: 'https://emergency.copernicus.eu/mapping/list-of-activations-rapid',
      license: 'CC-BY 3.0 IGO / Open Access',
    },
  },
  {
    id: 'amazon-rondonia-deforestation',
    title: 'Rondônia Forest Canopy Transformation',
    category: 'Deforestation',
    location: 'State of Rondônia, Southwestern Amazon Basin, Brazil',
    coordinates: { lat: -10.83, lon: -62.88 },
    zoomLevel: 9,
    eventDate: '2000 – 2024 (Multi-Decadal)',
    summary:
      'Systematic "fishbone" road penetration into primary rainforest converts multi-layered tropical forest canopy into uniform pastureland, causing measurable volume scattering loss.',
    narrativeLead:
      'Dense rainforest scatters radar waves in every direction. When trees are cleared for cattle pastures, that rich volume scatter vanishes, leaving a flat signature that satellites track across decades.',
    beforeImage: {
      url: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1400&q=80',
      date: '2000-08-14',
      label: 'Intact Primary Canopy (High Volume Scatter)',
      satellite: 'NASA Terra MODIS / Landsat-7',
      polarization: 'Cross-pol VH high volume return',
    },
    afterImage: {
      url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1400&q=80',
      date: '2023-08-20',
      label: 'Clearing & Agricultural Corridors',
      satellite: 'Sentinel-1A & Landsat-8',
      polarization: 'VH backscatter reduction (> 6 dB drop)',
    },
    differenceDescription:
      'Clearing radiates outward along access roads in orthogonal transects. In cross-polarized radar (VH), complex canopies depolarize incoming waves; felled pastures produce minimal depolarization.',
    scientificExplanation:
      'In cross-polarization (VH: vertical transmit, horizontal receive), incoming radar waves are depolarized by multiple scattering interactions within complex branches, leaves, and stems (volume scattering). Intact rainforests maintain high, stable VH backscatter year-round (-12 to -14 dB). Once clear-cut for grassland, depolarization drops drastically (-19 to -24 dB), offering an automated metric for illegal forest clearance independent of cloud cover.',
    sarSignificance:
      'The Amazon Basin experiences heavy wet-season cloud cover for up to 6 months per year. SAR provides unbroken temporal baselines that prevent illegal logging from escaping detection during rainy seasons.',
    limitations: [
      'C-band waves (λ = 5.6 cm) interact primarily with top-layer leaves and twigs, saturating at biomass levels around 50–100 tons/hectare. Longer L-band radar (e.g., NISAR / ALOS-2, λ = 24 cm) is required for deep trunk biomass.',
      'Surface soil moisture variations between wet and dry season alter bare ground dielectric permittivity, mimicking vegetation recovery.',
    ],
    keyMetrics: [
      { label: 'Canopy Loss Tracked', value: '34,000', unit: 'km²' },
      { label: 'VH Cross-Pol Delta', value: '-6.4', unit: 'dB' },
      { label: 'Annual Rain Season Obscuration', value: '78', unit: '%' },
      { label: 'Observation Cadence', value: '12', unit: 'days' },
    ],
    attribution: {
      source: 'NASA Earth Observatory / INPE PRODES / ESA Sentinel-1',
      url: 'https://earthobservatory.nasa.gov/world-of-change/Deforestation',
      license: 'Public Domain / NASA Earthdata',
    },
  },
  {
    id: 'pearl-river-delta-urbanization',
    title: 'Pearl River Delta Mega-City Expansion',
    category: 'Urban Expansion',
    location: 'Guangdong Province, China (Shenzhen-Guangzhou)',
    coordinates: { lat: 22.5431, lon: 114.0579 },
    zoomLevel: 10,
    eventDate: '1995 – 2024',
    summary:
      'Rapid conversion of wetlands and rice paddies into high-density urban high-rises demonstrates the "double-bounce" corner reflector phenomenon in SAR radar imagery.',
    narrativeLead:
      'Where farmland once gently scattered radar pulses, skyscrapers now form 90-degree right angles with streets. These corner reflectors bounce microwave pulses straight back like radar beacons.',
    beforeImage: {
      url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80',
      date: '1998-11-04',
      label: 'Early Urban Nuclei & Rural Mosaic',
      satellite: 'Landsat-5 TM / ERS-2 SAR',
      polarization: 'Low co-pol backscatter',
    },
    afterImage: {
      url: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1400&q=80',
      date: '2023-10-15',
      label: 'High-Density Built Environment',
      satellite: 'Sentinel-1B C-SAR',
      polarization: 'Double-bounce return (> 2 dB intense bright)',
    },
    differenceDescription:
      'Metallic structures, reinforced concrete, and perpendicular building-ground interfaces produce intense radar returns, appearing brilliant white on radar intensity maps.',
    scientificExplanation:
      'Urban environments act as dihedral and trihedral corner reflectors. The microwave pulse strikes the street or water, bounces into a vertical building wall, and reflects straight back into the satellite antenna (double-bounce). This returns tremendous power (often > +2 dB to +8 dB), which stands out distinctly from natural surfaces. Co-polarized channels (VV and HH) maximize double-bounce detection.',
    sarSignificance:
      'SAR enables precise mapping of structural density, building heights (via interferometric SAR / InSAR), and millimeter-scale ground subsidence over reclaimed coastal land.',
    limitations: [
      'Layover: High-rise towers lean toward the radar sensor in slant-range geometry, displacing rooftops on the map.',
      'Radar Shadow: Areas behind tall structures receive no radar illumination, creating black voids regardless of actual land cover.',
    ],
    keyMetrics: [
      { label: 'Built Area Growth', value: '450', unit: '%' },
      { label: 'Double-Bounce Return', value: '+7.8', unit: 'dB' },
      { label: 'Subsidence Monitoring', value: '±2', unit: 'mm/yr' },
      { label: 'Population Density', value: '70M', unit: 'inhabitants' },
    ],
    attribution: {
      source: 'NASA Earth Observatory / Copernicus Sentinel-1',
      url: 'https://earthobservatory.nasa.gov/images/145888/urban-growth-in-china',
      license: 'Public Domain / ESA Open Access',
    },
  },
  {
    id: 'aral-sea-shrinkage',
    title: 'Aral Sea Desiccation & Dust Basin',
    category: 'Coastal & Lake Change',
    location: 'Kazakhstan & Uzbekistan Border',
    coordinates: { lat: 45.0, lon: 60.0 },
    zoomLevel: 7,
    eventDate: '2000 – 2024',
    summary:
      'Once the fourth-largest lake in the world, river diversions dried up over 90% of the Aral Sea, creating the Aralkum Desert. Radar tracks shifting sand dunes and remaining hyper-saline pools.',
    narrativeLead:
      'Across three decades, an inland sea the size of Ireland evaporated into salt crusts. Satellites documented every shoreline retreat, showing how human decisions transformed an entire biome.',
    beforeImage: {
      url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80',
      date: '2000-08-25',
      label: 'Eastern Basin Remnants',
      satellite: 'NASA Terra MODIS',
      polarization: 'Optical 7-2-1 False Color',
    },
    afterImage: {
      url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1400&q=80',
      date: '2023-08-18',
      label: 'Exposed Seabed (Aralkum Desert)',
      satellite: 'Sentinel-1A & Landsat-9',
      polarization: 'C-SAR VV dry salt backscatter',
    },
    differenceDescription:
      'The eastern lobe desiccated completely in hot summers. Radar reveals subsurface soil moisture gradients and salt crust hardness invisible to standard photography.',
    scientificExplanation:
      'The dielectric constant (permittivity ε) of pure water is ~80, while dry sand and salt crust is ~3 to 5. As water evaporated, the dielectric boundary shifted dramatically. Microwaves can penetrate dry saline sand up to several centimeters, detecting buried relic channels and groundwater tables inaccessible to optical instruments.',
    sarSignificance:
      'Frequent dust storms blow toxic salt and pesticide dust across Central Asia. SAR tracks active sand dune migration and surface roughness changes across the exposed dry seabed.',
    limitations: [
      'Moisture after rare desert rainstorms causes abrupt dielectric jumps, temporarily altering surface reflectivity without actual lake refilling.',
    ],
    keyMetrics: [
      { label: 'Surface Area Lost', value: '60,000', unit: 'km²' },
      { label: 'Water Volume Drop', value: '-85', unit: '%' },
      { label: 'Salinity Increase', value: '> 100', unit: 'g/L' },
      { label: 'New Desert Created', value: 'Aralkum', unit: '' },
    ],
    attribution: {
      source: 'NASA Earth Observatory / USGS Landsat / ESA Sentinel-1',
      url: 'https://earthobservatory.nasa.gov/world-of-change/AralSea',
      license: 'Public Domain',
    },
  },
  {
    id: 'hunga-tonga-eruption',
    title: 'Hunga Tonga Volcano & Caldera Collapse',
    category: 'Volcanic Activity',
    location: 'Tonga Archipelago, South Pacific Ocean',
    coordinates: { lat: -20.536, lon: -175.382 },
    zoomLevel: 11,
    eventDate: 'January 15, 2022',
    summary:
      'A cataclysmic submarine volcanic eruption generated atmospheric shockwaves that circled the globe four times and completely pulverized two subaerial islands.',
    narrativeLead:
      'On January 15, 2022, an underwater volcano exploded with hundreds of times the force of Hiroshima. Sentinel-1 SAR returned to the site just days later to reveal that islands had literally vanished.',
    beforeImage: {
      url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80',
      date: '2022-01-03',
      label: 'Pre-Eruption Land Bridge & Caldera Rim',
      satellite: 'Sentinel-1B C-SAR',
      polarization: 'VV backscatter showing solid subaerial basalt',
    },
    afterImage: {
      url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=80',
      date: '2022-01-17',
      label: 'Post-Eruption Caldera Submersion',
      satellite: 'Sentinel-1A C-SAR',
      polarization: 'Open ocean specular reflection only',
    },
    differenceDescription:
      'Subaerial volcanic cone was annihilated; radar echoes dropped from rock-surface roughness (+2 dB) to oceanic specular nulls (-26 dB), confirming complete island decapitation.',
    scientificExplanation:
      'The volcanic plume injected 146 million metric tons of water vapor into the stratosphere and generated dense sulfur aerosols that prevented optical cameras from viewing the vent. Sentinel-1 microwave pulses cut through the ash plume. By comparing pre- and post-eruption SAR acquisitions, scientists computed that ~850 meters of the central volcanic caldera subsided beneath sea level.',
    sarSignificance:
      'Provides definitive emergency topographic assessment when volcanic ash clouds pose flight hazards to aircraft and blind optical satellites.',
    limitations: [
      'Turbulent wave chop from the resulting tsunami generated temporary surface roughness artifacts in coastal zones.',
    ],
    keyMetrics: [
      { label: 'Explosion Energy', value: '~10-15', unit: 'Megatons' },
      { label: 'Caldera Collapse', value: '850', unit: 'm' },
      { label: 'Plume Height', value: '57', unit: 'km' },
      { label: 'Atmospheric Waves', value: '4x', unit: 'around Earth' },
    ],
    attribution: {
      source: 'NASA Earth Observatory / ESA Sentinel-1 / Tonga Geological Services',
      url: 'https://earthobservatory.nasa.gov/images/149344/hunga-tonga-volcano',
      license: 'Public Domain',
    },
  },
];
