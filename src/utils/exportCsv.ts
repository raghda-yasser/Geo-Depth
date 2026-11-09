import { ObservationRecord } from '../data/observationsData';

export function exportObservationsToCsv(
  observations: ObservationRecord[],
  filename = 'geo-depth-satellite-observations.csv'
) {
  if (!observations || observations.length === 0) return;

  const headers = [
    'Observation ID',
    'Date (UTC)',
    'Satellite Mission',
    'Sensor Instrument',
    'Product Type',
    'Location Name',
    'Country',
    'Region',
    'Latitude',
    'Longitude',
    'Orbit Direction',
    'Polarization',
    'Pass Number',
    'Backscatter Mean (dB)',
    'Data Provider',
    'Source Dataset',
    'Spatial Resolution (m)',
    'File Size (MB)',
    'Archive Access URL',
  ];

  const rows = observations.map((obs) => [
    `"${obs.id}"`,
    `"${obs.date}"`,
    `"${obs.satellite}"`,
    `"${obs.sensor}"`,
    `"${obs.productType}"`,
    `"${obs.location}"`,
    `"${obs.country}"`,
    `"${obs.region}"`,
    obs.lat.toFixed(4),
    obs.lon.toFixed(4),
    `"${obs.orbitDirection}"`,
    `"${obs.polarization}"`,
    obs.passNumber,
    obs.backscatterDb.toFixed(1),
    `"${obs.provider}"`,
    `"${obs.sourceDataset}"`,
    obs.resolutionMeters,
    obs.fileSizeBytesMb,
    `"${obs.downloadUrl}"`,
  ]);

  const csvContent = [headers.join(','), ...rows.map((e) => e.join(','))].join('\r\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
