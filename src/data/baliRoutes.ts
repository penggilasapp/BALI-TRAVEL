import { BaliRoute } from '../types';

export const BALI_ROUTES: BaliRoute[] = [
  {
    id: 'airport-canggu',
    origin: 'Ngurah Rai Airport (DPS)',
    destination: 'Canggu / Berawa Beach',
    distanceKm: 21,
    scooterMinutes: 45,
    carMinutes: 75,
    trafficNote: 'Heavy congestion around Sunset Road and Kerobokan; scooter can use narrow alley shortcuts.',
    scenicHighlights: 'Kuta beachfront outskirts, trendy Seminyak boutiques, emerald Berawa rice field patches.'
  },
  {
    id: 'canggu-ubud',
    origin: 'Canggu (Batu Bolong)',
    destination: 'Ubud Center (Monkey Forest Rd)',
    distanceKm: 31,
    scooterMinutes: 55,
    carMinutes: 85,
    trafficNote: 'Moderate on Jalan Raya Canggu; slows down entering Ubud art village streets.',
    scenicHighlights: 'Passing through traditional woodcarving workshops of Mambal and Ayung river gorges.'
  },
  {
    id: 'ubud-tegallalang',
    origin: 'Ubud Center',
    destination: 'Tegallalang Rice Terraces',
    distanceKm: 9.5,
    scooterMinutes: 20,
    carMinutes: 30,
    trafficNote: 'Narrow winding road with parked tourist vehicles near tourist centers.',
    scenicHighlights: 'Artisan woodcarving galleries, coconut groves, and terraced valley views.'
  },
  {
    id: 'seminyak-uluwatu',
    origin: 'Seminyak',
    destination: 'Pura Luhur Uluwatu',
    distanceKm: 33,
    scooterMinutes: 60,
    carMinutes: 90,
    trafficNote: 'Heavy around Jimbaran intersection; smooth winding asphalt on Bukit peninsula.',
    scenicHighlights: 'Jimbaran fishing bay, limestone cliff roads, ocean panoramas near Padang Padang.'
  },
  {
    id: 'ubud-kintamani',
    origin: 'Ubud Center',
    destination: 'Mount Batur Viewpoint (Kintamani)',
    distanceKm: 38,
    scooterMinutes: 65,
    carMinutes: 80,
    trafficNote: 'Gradual uphill mountain incline; cooler climate and occasional mist in afternoon.',
    scenicHighlights: 'Arabica coffee plantations, citrus orchards, panoramic volcanic caldera rim overlooking Lake Batur.'
  },
  {
    id: 'ubud-lempuyang',
    origin: 'Ubud Center',
    destination: 'Pura Lempuyang (Gates of Heaven)',
    distanceKm: 68,
    scooterMinutes: 110,
    carMinutes: 130,
    trafficNote: 'Long scenic coastal and mountain highway through Gianyar and Klungkung.',
    scenicHighlights: 'Klungkung royal heritage, coastal views of Nusa Penida across the strait, Mount Agung backdrop.'
  },
  {
    id: 'canggu-tanahlot',
    origin: 'Canggu (Echo Beach)',
    destination: 'Pura Tanah Lot',
    distanceKm: 14,
    scooterMinutes: 25,
    carMinutes: 40,
    trafficNote: 'Relatively smooth ride across Pererenan and Cemagi rural coastal roads.',
    scenicHighlights: 'Pristine quiet rice paddies, traditional Balinese village gates, coastal black sands.'
  },
  {
    id: 'denpasar-bedugul',
    origin: 'Sanur / Denpasar',
    destination: 'Lake Beratan (Bedugul)',
    distanceKm: 53,
    scooterMinutes: 80,
    carMinutes: 95,
    trafficNote: 'Climbing two-lane mountain highway with heavy fruit and vegetable supply trucks.',
    scenicHighlights: 'Lush mountain rainforests, roadside monkey troops, cool highland air and strawberry farms.'
  }
];
