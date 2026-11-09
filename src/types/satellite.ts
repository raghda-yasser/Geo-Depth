export type PageId =
  | 'home'
  | 'explore'
  | 'sar-explorer'
  | 'data-lab'
  | 'change-detection'
  | 'stories'
  | 'missions'
  | 'about';

export interface ObservationMetadata {
  id: string;
  mission: 'Sentinel-1A' | 'Sentinel-1B' | 'Landsat-8' | 'Terra MODIS' | 'ALOS-2 PALSAR';
  sensor: 'C-SAR' | 'OLI' | 'MODIS' | 'PALSAR-2';
  acquisitionDate: string;
  polarization?: 'VV' | 'VH' | 'VV+VH' | 'HH' | 'HH+HV';
  orbitDirection?: 'Ascending' | 'Descending';
  relativeOrbit?: number;
  productType: 'GRD' | 'SLC' | 'RGB Surface Reflectance' | 'Calibrated Backscatter';
  processingLevel: 'Level-1' | 'Level-2' | 'Derived Product';
  resolutionMeters: number;
  centerCoordinates: { lat: number; lon: number };
  dataProvider: 'ESA Copernicus Open Access' | 'NASA Earthdata / GIBS' | 'Alaska Satellite Facility (ASF)';
  sourceUrl: string;
  imageUrl: string;
  description: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  category: 'Flood Extent' | 'Urban Expansion' | 'Deforestation' | 'Coastal & Lake Change' | 'Volcanic Activity';
  location: string;
  coordinates: { lat: number; lon: number };
  zoomLevel: number;
  eventDate: string;
  summary: string;
  narrativeLead: string;
  beforeImage: {
    url: string;
    date: string;
    label: string;
    satellite: string;
    polarization?: string;
  };
  afterImage: {
    url: string;
    date: string;
    label: string;
    satellite: string;
    polarization?: string;
  };
  differenceMapUrl?: string;
  differenceDescription?: string;
  scientificExplanation: string;
  sarSignificance: string;
  limitations: string[];
  keyMetrics: { label: string; value: string; unit?: string }[];
  attribution: {
    source: string;
    url: string;
    license: string;
  };
}

export interface EarthStory {
  id: string;
  title: string;
  location: string;
  dateRange: string;
  category: string;
  heroImage: string;
  earthDialogue: string;
  abstract: string;
  timeline: {
    date: string;
    headline: string;
    detail: string;
    satellite: string;
  }[];
  scientificFindings: string[];
  imagery: {
    url: string;
    caption: string;
    date: string;
    sensor: string;
    attribution: string;
  }[];
  datasetLinks: {
    name: string;
    provider: string;
    url: string;
  }[];
}

export interface QuizQuestion {
  id: string;
  missionId: 'm1' | 'm2' | 'm3' | 'm4';
  question: string;
  context?: string;
  imageUrl?: string;
  imageCaption?: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  explanation: string;
}

export interface Mission {
  id: 'm1' | 'm2' | 'm3' | 'm4';
  number: string;
  title: string;
  badgeId: string;
  badgeName: string;
  badgeIcon: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  objective: string;
  questions: QuizQuestion[];
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

export interface EarthMoodItem {
  id: string;
  title: string;
  location: string;
  observationNote: string;
  scientificContext: string;
  date: string;
  coordinates: { lat: number; lon: number };
  imageUrl: string;
  source: string;
}
