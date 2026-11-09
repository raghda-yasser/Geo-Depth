import { Mission, AchievementBadge } from '../types/satellite';

export const ACHIEVEMENTS: AchievementBadge[] = [
  {
    id: 'first-discovery',
    title: 'First Discovery',
    description: 'Completed your first Earth observation mission investigation.',
    icon: 'Compass',
  },
  {
    id: 'radar-detective',
    title: 'Radar Detective',
    description: 'Mastered the principles of Synthetic Aperture Radar backscatter and penetration.',
    icon: 'Radio',
  },
  {
    id: 'change-hunter',
    title: 'Change Hunter',
    description: 'Successfully detected environmental transformation across multi-date satellite observations.',
    icon: 'Layers',
  },
  {
    id: 'earth-explorer',
    title: 'Earth Explorer',
    description: 'Completed all 4 orbital missions with an outstanding accuracy rating.',
    icon: 'Globe',
  },
  {
    id: 'scientific-thinker',
    title: 'Scientific Thinker',
    description: 'Demonstrated deep comprehension of SAR limitations, polarizations, and dielectric properties.',
    icon: 'Cpu',
  },
];

export const MISSIONS: Mission[] = [
  {
    id: 'm1',
    number: '01',
    title: 'Understand Synthetic Aperture Radar',
    badgeId: 'radar-detective',
    badgeName: 'Radar Detective',
    badgeIcon: 'Radio',
    difficulty: 'Beginner',
    description: 'Explore how active radar satellites observe Earth day and night, even through storm clouds.',
    objective: 'Demonstrate how SAR differs from optical cameras and how active microwaves interact with the surface.',
    questions: [
      {
        id: 'q1-1',
        missionId: 'm1',
        question: 'Why can Synthetic Aperture Radar (SAR) image Earth at midnight and through thick storm clouds?',
        options: [
          {
            id: 'a',
            text: 'SAR transmits its own active microwave pulses that penetrate clouds and does not rely on sunlight.',
            isCorrect: true,
          },
          {
            id: 'b',
            text: 'SAR uses thermal heat sensors that only operate in the dark.',
            isCorrect: false,
          },
          {
            id: 'c',
            text: 'SAR satellites fly below the clouds closer to the ground.',
            isCorrect: false,
          },
          {
            id: 'd',
            text: 'SAR relies on moonlight reflections reflected off cloud tops.',
            isCorrect: false,
          },
        ],
        explanation:
          'Unlike optical sensors that depend on reflected sunlight, SAR is an active instrument. It generates its own microwave pulses (e.g. 5.4 GHz C-band). Because microwave wavelengths (~5.6 cm) are vastly larger than cloud water droplets, the waves pass right through clouds without scattering.',
      },
      {
        id: 'q1-2',
        missionId: 'm1',
        question: 'What does the term "Synthetic Aperture" in SAR actually refer to?',
        options: [
          {
            id: 'a',
            text: 'An artificial lens made out of diamond glass.',
            isCorrect: false,
          },
          {
            id: 'b',
            text: 'Using the forward motion of the spacecraft and signal processing to simulate a massive kilometer-long antenna.',
            isCorrect: true,
          },
          {
            id: 'c',
            text: 'A computer algorithm that generates fictional satellite images.',
            isCorrect: false,
          },
          {
            id: 'd',
            text: 'A mechanical camera aperture that physically opens and closes in orbit.',
            isCorrect: false,
          },
        ],
        explanation:
          'To achieve 10-meter spatial resolution from 700 km altitude with microwaves, a conventional antenna would need to be hundreds of meters long—impossible to launch! Instead, the satellite moves along its orbit emitting multiple pulses; processing these combined Doppler returns synthesizes a virtual antenna kilometers wide.',
      },
      {
        id: 'q1-3',
        missionId: 'm1',
        question: 'What is "backscatter" in radar remote sensing?',
        options: [
          {
            id: 'a',
            text: 'The fraction of emitted microwave energy reflected back toward the satellite receiver.',
            isCorrect: true,
          },
          {
            id: 'b',
            text: 'Static noise created by solar flares in deep space.',
            isCorrect: false,
          },
          {
            id: 'c',
            text: 'Unwanted heat dissipated from the satellite solar panels.',
            isCorrect: false,
          },
          {
            id: 'd',
            text: 'The shadow behind high mountain ranges.',
            isCorrect: false,
          },
        ],
        explanation:
          'Backscatter (measured in decibels, Sigma-0) is the echo power returned to the antenna. Surfaces with rough textures scatter energy in all directions (some returns to the sensor), while smooth calm water bounces it away like a mirror.',
      },
    ],
  },
  {
    id: 'm2',
    number: '02',
    title: 'Find the Environmental Change',
    badgeId: 'change-hunter',
    badgeName: 'Change Hunter',
    badgeIcon: 'Layers',
    difficulty: 'Intermediate',
    description: 'Analyze multi-temporal satellite observations and detect actual landscape transformations.',
    objective: 'Identify land cover transitions, canopy clearing, and urban sprawl using multi-date datasets.',
    questions: [
      {
        id: 'q2-1',
        missionId: 'm2',
        question: 'When comparing satellite observations of Rondônia across 20 years, what geometric pattern indicates human road and agricultural expansion?',
        options: [
          {
            id: 'a',
            text: 'Concentric circular rings expanding from mountain peaks.',
            isCorrect: false,
          },
          {
            id: 'b',
            text: 'The orthogonal "fishbone" pattern branching off primary highways into undisturbed forest.',
            isCorrect: true,
          },
          {
            id: 'c',
            text: 'Random scattered solitary pixels without any spatial organization.',
            isCorrect: false,
          },
          {
            id: 'd',
            text: 'Triangular river delta fans along coastal estuaries.',
            isCorrect: false,
          },
        ],
        explanation:
          'The "fishbone" pattern is the hallmark of planned settlements in the Amazon: a trunk highway (such as BR-364) is built, and perpendicular access roads are cleared every few kilometers, leading to systematic strip-clearing.',
      },
      {
        id: 'q2-2',
        missionId: 'm2',
        question: 'In the Aral Sea time series between 2000 and 2024, what major change is evident in the eastern basin?',
        options: [
          {
            id: 'a',
            text: 'The water deepened and expanded toward Kazakhstan.',
            isCorrect: false,
          },
          {
            id: 'b',
            text: 'The entire eastern lobe completely desiccated, exposing thousands of square kilometers of dry seabed now called the Aralkum Desert.',
            isCorrect: true,
          },
          {
            id: 'c',
            text: 'Permanent ice sheets formed over the water surface.',
            isCorrect: false,
          },
          {
            id: 'd',
            text: 'Vast coral reefs grew across the former lake floor.',
            isCorrect: false,
          },
        ],
        explanation:
          'Due to intense irrigation diversions of the Amu Darya and Syr Darya rivers, the eastern basin of the South Aral Sea desiccated completely, leaving behind an arid, salt-encrusted plain.',
      },
      {
        id: 'q2-3',
        missionId: 'm2',
        question: 'Why must scientists be cautious before concluding that a 3 dB backscatter change represents permanent deforestation?',
        options: [
          {
            id: 'a',
            text: 'Soil moisture, rain events, and seasonal leaf senescence can temporarily alter backscatter without actual tree felling.',
            isCorrect: true,
          },
          {
            id: 'b',
            text: 'Satellites change their radio frequencies randomly each day.',
            isCorrect: false,
          },
          {
            id: 'c',
            text: 'Radar signals only travel in one hemisphere.',
            isCorrect: false,
          },
          {
            id: 'd',
            text: 'Wind speed rotates the satellite upside down.',
            isCorrect: false,
          },
        ],
        explanation:
          'Soil moisture increases dielectric permittivity, causing higher surface reflection. A recent downpour can raise backscatter, while severe drought can lower it. Multi-temporal baseline averaging is essential to confirm permanent structural removal.',
      },
    ],
  },
  {
    id: 'm3',
    number: '03',
    title: 'Explore the Flood',
    badgeId: 'first-discovery',
    badgeName: 'First Discovery',
    badgeIcon: 'Compass',
    difficulty: 'Intermediate',
    description: 'Investigate the verified May 2023 Emilia-Romagna flooding case study using Sentinel-1.',
    objective: 'Demonstrate how civil protection uses SAR to map inundation extent and save lives.',
    questions: [
      {
        id: 'q3-1',
        missionId: 'm3',
        question: 'Why does calm standing floodwater appear dark or black on a SAR intensity image?',
        options: [
          {
            id: 'a',
            text: 'Water absorbs 100% of the radio waves and converts them into heat.',
            isCorrect: false,
          },
          {
            id: 'b',
            text: 'Smooth water acts as a specular reflector: the radar pulses bounce forward away from the satellite, so virtually no signal returns to the antenna.',
            isCorrect: true,
          },
          {
            id: 'c',
            text: 'Muddy floodwaters contain chemicals that block radar transmission.',
            isCorrect: false,
          },
          {
            id: 'd',
            text: 'Satellite cameras cannot photograph wet surfaces.',
            isCorrect: false,
          },
        ],
        explanation:
          'Like a flashlight shining at an angle onto a flat mirror, the microwave pulse bounces forward away from the emitter. Because almost zero energy reflects back toward the orbital antenna, the pixel records a very low decibel value (-22 dB to -26 dB) and renders pitch black.',
      },
      {
        id: 'q3-2',
        missionId: 'm3',
        question: 'What environmental condition can cause calm floodwaters to mistakenly appear BRIGHT on SAR radar?',
        options: [
          {
            id: 'a',
            text: 'Strong winds generating surface capillary waves that roughen the water, causing diffuse scatter back toward the sensor.',
            isCorrect: true,
          },
          {
            id: 'b',
            text: 'Direct midday sunlight heating the water surface.',
            isCorrect: false,
          },
          {
            id: 'c',
            text: 'High air humidity during warm summer nights.',
            isCorrect: false,
          },
          {
            id: 'd',
            text: 'The presence of fresh rainwater instead of saltwater.',
            isCorrect: false,
          },
        ],
        explanation:
          'Wind generates capillary ripples with dimensions comparable to radar wavelengths (cm scale). These waves roughen the surface, converting specular reflection into diffuse scatter, causing the water to look gray or bright and complicating automated flood thresholding.',
      },
      {
        id: 'q3-3',
        missionId: 'm3',
        question: 'When floodwater enters a forest or mangrove swamp, why does the radar return often become abnormally BRIGHT instead of dark?',
        options: [
          {
            id: 'a',
            text: 'Double-bounce scattering: the radar pulse reflects off the flat water surface into vertical tree trunks and bounces right back to the antenna.',
            isCorrect: true,
          },
          {
            id: 'b',
            text: 'Trees emit radioactive signals when their roots are wet.',
            isCorrect: false,
          },
          {
            id: 'c',
            text: 'Water makes the tree leaves turn into solar panels.',
            isCorrect: false,
          },
          {
            id: 'd',
            text: 'Fish swimming under the trees reflect the radar waves.',
            isCorrect: false,
          },
        ],
        explanation:
          'This is known as the "double-bounce" or corner reflector effect! The vertical tree trunks and horizontal water surface form 90-degree right angles, directing the microwave pulse straight back into the satellite antenna.',
      },
    ],
  },
  {
    id: 'm4',
    number: '04',
    title: 'Read the Radar Like a Scientist',
    badgeId: 'scientific-thinker',
    badgeName: 'Scientific Thinker',
    badgeIcon: 'Cpu',
    difficulty: 'Advanced',
    description: 'Master advanced SAR concepts: polarizations (VV vs VH), speckle noise, and dielectric permittivity.',
    objective: 'Interpret polarimetric signatures and explain physical microwave interaction mechanisms.',
    questions: [
      {
        id: 'q4-1',
        missionId: 'm4',
        question: 'In a dual-polarization Sentinel-1 dataset (VV and VH), what does "VH" represent?',
        options: [
          {
            id: 'a',
            text: 'Vertical transmit and Horizontal receive (cross-polarization).',
            isCorrect: true,
          },
          {
            id: 'b',
            text: 'Very High resolution optical zoom.',
            isCorrect: false,
          },
          {
            id: 'c',
            text: 'Visible Heat infrared channel.',
            isCorrect: false,
          },
          {
            id: 'd',
            text: 'Variable Altitude altitude trajectory.',
            isCorrect: false,
          },
        ],
        explanation:
          'The first letter indicates the transmit polarization of the electromagnetic wave (V = Vertical), and the second letter indicates the receiver polarization (H = Horizontal). Cross-polarization (VH) is especially sensitive to complex volumetric scattering in tree canopies and crops.',
      },
      {
        id: 'q4-2',
        missionId: 'm4',
        question: 'Why do modern city skyscrapers (like Shenzhen or Dubai) look intensely bright white on radar images?',
        options: [
          {
            id: 'a',
            text: 'Double-bounce corner reflection between vertical concrete walls and flat asphalt streets sends massive power back to the sensor.',
            isCorrect: true,
          },
          {
            id: 'b',
            text: 'City streetlights illuminate the radar sensor.',
            isCorrect: false,
          },
          {
            id: 'c',
            text: 'Wi-Fi routers broadcast signals that overload the satellite.',
            isCorrect: false,
          },
          {
            id: 'd',
            text: 'Glass windows act as microscopic magnifying lenses.',
            isCorrect: false,
          },
        ],
        explanation:
          'Urban high-rises and flat streets act as giant dihedral corner reflectors. The microwave pulse strikes the street, bounces into the vertical wall, and bounces straight back into the satellite antenna, producing extreme backscatter often exceeding +5 dB.',
      },
      {
        id: 'q4-3',
        missionId: 'm4',
        question: 'What causes the "salt-and-pepper" grainy texture (speckle) inherent in all raw SAR imagery?',
        options: [
          {
            id: 'a',
            text: 'Constructive and destructive phase interference of coherent microwave waves returning from many micro-scatterers within a single resolution cell.',
            isCorrect: true,
          },
          {
            id: 'b',
            text: 'Dust particles hitting the satellite camera lens in orbit.',
            isCorrect: false,
          },
          {
            id: 'c',
            text: 'Low battery power during orbital night passes.',
            isCorrect: false,
          },
          {
            id: 'd',
            text: 'JPEG compression artifacts during ground transmission.',
            isCorrect: false,
          },
        ],
        explanation:
          'Speckle is not sensor noise; it is a real physical phenomenon caused by coherent wave interference! Because many individual scatterers (leaves, pebbles, twigs) exist within a 10-meter cell, their returning waves interfere constructively (bright pixel) or destructively (dark pixel). Filtering algorithms (e.g. Lee, Frost) smooth this grain.',
      },
    ],
  },
];
