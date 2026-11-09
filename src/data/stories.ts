import { EarthStory } from '../types/satellite';

export const EARTH_STORIES: EarthStory[] = [
  {
    id: 'emilia-romagna-floods-story',
    title: 'When Storm Clouds Blanketed Emilia-Romagna',
    location: 'Northern Italy (Po River Valley)',
    dateRange: 'May 1 – May 25, 2023',
    category: 'Flood Inundation & SAR Penetration',
    heroImage: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=1600&q=80',
    earthDialogue:
      'My atmosphere can unleash breathtaking storms. In May 2023, thick dark clouds covered northern Italy for days, hiding everything from standard orbital cameras. But Sentinel-1 pulsed microwaves right through the storm to see where my waters were overflowing. Let me show you what happened.',
    abstract:
      'In May 2023, extreme atmospheric rivers triggered catastrophic flooding across 23 river basins in Emilia-Romagna, Italy. Optical satellites were 100% blind due to unbroken stratus clouds. Sentinel-1 SAR tracked the floodwater footprint at 10-meter resolution in day and night.',
    timeline: [
      {
        date: 'May 2, 2023',
        headline: 'First Storm Pulse Infiltrates Po Basin',
        detail: 'Initial low-pressure system drops 200 mm of rain on already saturated topsoil, creating high surface runoff conditions.',
        satellite: 'Sentinel-1A (Pass 95)',
      },
      {
        date: 'May 16–17, 2023',
        headline: 'Catastrophic Cloudburst & Overbank Spills',
        detail: 'Storm "Minerva" discharges 350 mm within 36 hours. Over 500 landslides occur across Apennine foothills; 23 rivers breach dikes simultaneously.',
        satellite: 'Copernicus EMS Rapid Mapping EMSR659',
      },
      {
        date: 'May 21, 2023',
        headline: 'Sentinel-1 Inundation Overpass',
        detail: 'Orbiting at 693 km altitude, Sentinel-1 transmits 5.4 GHz pulses. Over 42,000 hectares of cropland register near-zero radar backscatter (-24 dB), delineating exact flood boundaries.',
        satellite: 'Sentinel-1A C-SAR',
      },
      {
        date: 'May 28, 2023',
        headline: 'Drainage & Soil Moisture Recession',
        detail: 'Floodwaters recede back into Adriatic canals; backscatter gradually recovers from -24 dB back toward -14 dB as surface roughness reappears.',
        satellite: 'Sentinel-1A (Ascending Pass)',
      },
    ],
    scientificFindings: [
      'Radar waves (C-band, 5.6 cm) penetrate cloud droplets because microwave wavelengths are orders of magnitude larger than water droplets (Mie scattering regime negligible).',
      'Smooth standing water specularly reflects the incoming pulse forward, generating a signature dark null in SAR imagery.',
      'Civil protection utilized calibrated SAR flood masks within 3.5 hours of satellite downlinks to direct emergency evacuation routes.',
    ],
    imagery: [
      {
        url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
        caption: 'Pre-flood agricultural geometry across Ravenna plains showing standard soil diffuse backscatter.',
        date: '2023-05-08',
        sensor: 'Sentinel-1A C-SAR Level-1 GRD',
        attribution: 'Contains modified Copernicus Sentinel data (2023) / ESA',
      },
      {
        url: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=1200&q=80',
        caption: 'Inundation peak: dark specular signatures highlight submerged orchard and cereal basins.',
        date: '2023-05-21',
        sensor: 'Sentinel-1A C-SAR Calibrated Sigma-0',
        attribution: 'Copernicus Emergency Management Service EMSR659',
      },
    ],
    datasetLinks: [
      { name: 'Copernicus Data Space Ecosystem (S1A GRD)', provider: 'ESA', url: 'https://dataspace.copernicus.eu/' },
      { name: 'Rapid Mapping Activation EMSR659', provider: 'Copernicus EMS', url: 'https://emergency.copernicus.eu/mapping/list-of-activations-rapid' },
    ],
  },
  {
    id: 'amazon-rondonia-story',
    title: 'The Forest Veins: Watching the Amazon Transform',
    location: 'Rondônia, Brazil',
    dateRange: '2000 – 2024',
    category: 'Canopy Loss & Polarimetric Volume Scatter',
    heroImage: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1600&q=80',
    earthDialogue:
      'My tropical lungs breathe moisture into global weather. Over decades, people cut roads straight into my deep green forests. From space, you can watch the classic "fishbone" pattern spread. What takes minutes to chop takes centuries to regrow.',
    abstract:
      'Rondônia was once cloaked in over 200,000 km² of dense tropical rainforest. Settler highway BR-364 and offshoot feeder roads initiated perpendicular clearings. Dual-polarization SAR allows scientists to quantify canopy loss even during the 6-month overcast rainy season.',
    timeline: [
      {
        date: '1985',
        headline: 'BR-364 Highway Paving',
        detail: 'Paving of the Cuiabá-Porto Velho artery unlocks deep interior forest settlement, sparking initial logging corridors.',
        satellite: 'Landsat-5 TM',
      },
      {
        date: '2000',
        headline: 'MODIS Systematic Monitoring Begins',
        detail: 'NASA Terra satellite begins daily optical imaging, establishing the famous 250-meter resolution deforestation time series.',
        satellite: 'NASA Terra MODIS',
      },
      {
        date: '2014',
        headline: 'Copernicus Sentinel-1 SAR Launch',
        detail: 'Launch of Sentinel-1 provides continuous 12-day cloud-penetrating radar observations, revealing wet-season clearing spikes.',
        satellite: 'Sentinel-1A C-SAR',
      },
      {
        date: '2024',
        headline: 'Over 34% of State Forest Converted',
        detail: 'Complex forest canopies replaced by uniform cattle pastureland; cross-polarization VH backscatter registers a permanent 6.4 dB drop.',
        satellite: 'Sentinel-1 & Landsat-9',
      },
    ],
    scientificFindings: [
      'Multi-layered tree canopies randomize wave polarization through multiple scattering, generating high VH cross-polarized returns.',
      'Clearcut pastures act as surface scatterers with minimal depolarization, creating unambiguous digital signatures in automated monitoring pipelines.',
      'Radar temporal baselines catch illegal clearing during peak cloud cover between November and April when optical satellites fail.',
    ],
    imagery: [
      {
        url: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=80',
        caption: 'Intact primary rainforest canopy in northwestern Rondônia.',
        date: '2000-08-14',
        sensor: 'NASA Terra MODIS / Landsat-7',
        attribution: 'NASA Earth Observatory / Jesse Allen',
      },
      {
        url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80',
        caption: 'Orthogonal agricultural parcels and access roads carving into forest preserves.',
        date: '2023-08-20',
        sensor: 'Sentinel-1A & Landsat-8 Operational Land Imager',
        attribution: 'USGS / NASA Earth Observatory',
      },
    ],
    datasetLinks: [
      { name: 'NASA Earth Observatory: Amazon Deforestation', provider: 'NASA', url: 'https://earthobservatory.nasa.gov/world-of-change/Deforestation' },
      { name: 'ASF DAAC SAR On Demand Processing', provider: 'Alaska Satellite Facility', url: 'https://asf.alaska.edu/' },
    ],
  },
  {
    id: 'aral-sea-story',
    title: 'The Ghost Sea: Evaporation of an Inland Giant',
    location: 'Central Asia (Kazakhstan & Uzbekistan)',
    dateRange: '1960 – 2024',
    category: 'Hydrological Desiccation',
    heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
    earthDialogue:
      'I once held a freshwater inland sea so vast that local fishers sailed for days without seeing shore. When the rivers feeding it were diverted for cotton fields, the water shrank away. Today, satellites watch dust blow across the dry sea bed.',
    abstract:
      'Once the world’s fourth-largest inland sea (68,000 km²), diversion of the Amu Darya and Syr Darya rivers caused 90% of its volume to vanish. Spaceborne instruments tracked the split into northern and southern bodies and the birth of the Aralkum Desert.',
    timeline: [
      {
        date: '1960s',
        headline: 'Massive River Diversions Implemented',
        detail: 'Soviet canal projects divert Amu Darya and Syr Darya to irrigate arid cotton plantations in Uzbekistan and Turkmenistan.',
        satellite: 'Corona Reconnaissance Satellite Archive',
      },
      {
        date: '1987',
        headline: 'Aral Splits into North and South Seas',
        detail: 'Water levels drop over 14 meters, exposing central shoals and dividing the sea into two distinct hydrologic basins.',
        satellite: 'Landsat-5 TM',
      },
      {
        date: '2014',
        headline: 'Eastern Basin Completely Dries',
        detail: 'For the first time in modern history, the entire eastern lobe of the South Aral Sea desiccates into bare salt flats.',
        satellite: 'NASA Terra MODIS',
      },
      {
        date: '2024',
        headline: 'Kok-Aral Dam Stabilizes Northern Portion',
        detail: 'Kok-Aral dike preserves the North Aral Sea with recovering fisheries, while the South basin remains a hypersaline remnant.',
        satellite: 'Sentinel-1 & Landsat-9',
      },
    ],
    scientificFindings: [
      'Radar microwaves interact with the low dielectric permittivity of dry salt crusts (ε ~ 3-4), detecting subsurface bedrock and fossil river deltas.',
      'Dust storms originating from the dry basin carry toxic pesticide residues over thousands of kilometers, tracked by satellite aerosol optical depth (AOD).',
    ],
    imagery: [
      {
        url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
        caption: 'The vast eastern basin in 2000 during early modern orbital sensor coverage.',
        date: '2000-08-25',
        sensor: 'Terra MODIS True-Color',
        attribution: 'NASA Visible Earth / MODIS Rapid Response Team',
      },
      {
        url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80',
        caption: 'Aralkum desert salt flats replacing former open marine waterways.',
        date: '2023-08-18',
        sensor: 'Sentinel-1A C-SAR & Landsat-9',
        attribution: 'USGS / NASA Earthdata',
      },
    ],
    datasetLinks: [
      { name: 'NASA World of Change: Aral Sea', provider: 'NASA Earth Observatory', url: 'https://earthobservatory.nasa.gov/world-of-change/AralSea' },
      { name: 'NASA GIBS Global Imagery Browse Services', provider: 'NASA Earthdata', url: 'https://nasa-gibs.github.io/gibs-api-docs/' },
    ],
  },
  {
    id: 'hunga-tonga-story',
    title: 'The Day the Earth Shook: Hunga Tonga’s Explosion',
    location: 'Tonga, South Pacific Ocean',
    dateRange: 'January 2022',
    category: 'Submarine Volcanism & Atmospheric Waves',
    heroImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80',
    earthDialogue:
      'Beneath the ocean waves, my magma chambers built immense pressure. On January 15, 2022, Hunga Tonga erupted with an acoustic wave heard 10,000 kilometers away in Alaska! When the ash settled, radar confirmed that two entire islands had vanished beneath the sea.',
    abstract:
      'The explosive phreatomagmatic detonation of Hunga Tonga-Hunga Ha’apai produced the highest volcanic plume ever recorded (57 km into the mesosphere). SAR proved indispensable because volcanic ash clouds and sulfur aerosols blinded optical instruments for weeks.',
    timeline: [
      {
        date: 'January 3, 2022',
        headline: 'Pre-Eruption Land Bridge Intact',
        detail: 'Sentinel-1B captures radar reflections from the subaerial caldera rim linking Hunga Tonga and Hunga Ha’apai.',
        satellite: 'Sentinel-1B C-SAR',
      },
      {
        date: 'January 15, 2022',
        headline: 'Cataclysmic Detonation',
        detail: 'Violent seawater-magma interaction triggers a 15-megaton blast, launching 146 million metric tons of vapor into the stratosphere.',
        satellite: 'GOES-17 & Himawari-8 Geostationary',
      },
      {
        date: 'January 17, 2022',
        headline: 'First Post-Eruption Radar Overpass',
        detail: 'Sentinel-1A penetrates the lingering ash cloud. Radar echoes confirm 850 meters of caldera collapse into deep water.',
        satellite: 'Sentinel-1A C-SAR',
      },
    ],
    scientificFindings: [
      'Radar signals pass unhindered through dense volcanic aerosols and ash particles, revealing ground topography when optical cameras are blinded.',
      'Surface water displaced by caldera collapse generated tsunami waves recorded across the entire Pacific basin.',
    ],
    imagery: [
      {
        url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
        caption: 'Pre-eruption subaerial caldera rim connecting the twin volcanic islands.',
        date: '2022-01-03',
        sensor: 'Sentinel-1B C-SAR',
        attribution: 'Copernicus Sentinel data (2022) / ESA',
      },
      {
        url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
        caption: 'Post-eruption ocean scene: subaerial cone annihilated and completely submerged.',
        date: '2022-01-17',
        sensor: 'Sentinel-1A C-SAR',
        attribution: 'Copernicus Emergency Management Service / ESA',
      },
    ],
    datasetLinks: [
      { name: 'NASA Earth Observatory Hunga Tonga Eruption', provider: 'NASA', url: 'https://earthobservatory.nasa.gov/images/149344/hunga-tonga-volcano' },
      { name: 'Copernicus Data Space Ecosystem', provider: 'ESA', url: 'https://dataspace.copernicus.eu/' },
    ],
  },
];
