import type { ImageMetadata } from 'astro';
import interiorRed from '../assets/images/interior-red-leather.jpg';
import foamGarage from '../assets/images/foam-wash-garage.jpg';
import beadingBlack from '../assets/images/water-beading-black.jpg';
import polisherHood from '../assets/images/polisher-on-hood.jpg';
import microfiber from '../assets/images/microfiber-black-hood.jpg';
import snowFoam from '../assets/images/snow-foam-black-car.jpg';
import tyreBrush from '../assets/images/tyre-brush.jpg';
import dashBrush from '../assets/images/dash-detail-brush.jpg';
import brownLeather from '../assets/images/interior-brown-leather.jpg';
import beadingGrey from '../assets/images/water-beading-grey.jpg';
import headlightGlow from '../assets/images/headlight-glow.jpg';
import tailLights from '../assets/images/tail-lights-red.jpg';
import polisherDetail from '../assets/images/polisher-detail.jpg';
import glossReflection from '../assets/images/gloss-reflection.jpg';
import blackUte from '../assets/images/black-ute-stripes.jpeg';

/* ───────────────────────────────────────────────────────────────
 * SERVICES: DEMONSTRATION CONTENT.
 * These are example categories from the brief, NOT a confirmed list
 * of what Prestige offers. Prices are placeholders: replace each `price`
 * with the owner's figure (e.g. 'From $350') and set `confirmed: true`
 * to remove the "demo" marker from that service.
 * ─────────────────────────────────────────────────────────────── */
export interface Service {
  id: string;
  name: string;
  kicker: string;
  blurb: string;
  points: string[];
  price: string;
  confirmed: boolean;
  image: ImageMetadata;
  alt: string;
}

export const services: Service[] = [
  {
    id: 'ceramic-coating',
    name: 'Ceramic Coating',
    kicker: 'Our speciality',
    blurb:
      'Long-lasting protection and enhanced gloss using professional ceramic coating products, supplied and installed by Prestige.',
    points: ['Deep, glassy gloss', 'Long-term paint protection', 'Easier to keep clean'],
    price: 'From $X',
    confirmed: false,
    image: beadingBlack,
    alt: 'Water beading on the glossy black paint of a car door',
  },
  {
    id: 'paint-correction',
    name: 'Paint Correction',
    kicker: 'Refine',
    blurb: "Professional paint refinement designed to improve the appearance of your vehicle's paintwork.",
    points: ['Machine polishing', 'Clarity and depth restored'],
    price: 'From $X',
    confirmed: false,
    image: polisherHood,
    alt: 'Detailer in black gloves using a dual-action polisher on a car bonnet',
  },
  {
    id: 'interior-detailing',
    name: 'Premium Interior Detailing',
    kicker: 'Inside',
    blurb: 'Deep interior cleaning, close attention to detail and a cabin that feels refreshed.',
    points: ['Seats, carpets and trim', 'Dash, console and vents'],
    price: '$XX',
    confirmed: false,
    image: interiorRed,
    alt: 'Black and red leather car interior with a clean centre console',
  },
  {
    id: 'exterior-detailing',
    name: 'Exterior Detailing',
    kicker: 'Outside',
    blurb: 'Thorough exterior cleaning and finishing for a clean, polished appearance.',
    points: ['Wash and decontamination', 'Wheels and tyres', 'Finishing protection'],
    price: '$XX',
    confirmed: false,
    image: foamGarage,
    alt: 'Black sports car covered in foam during a wash in a detailing garage',
  },
  {
    id: 'full-detail',
    name: 'Full Detail Packages',
    kicker: 'Inside & out',
    blurb: 'Interior and exterior detailing combined for a complete, top-to-bottom refresh.',
    points: [],
    price: 'Call for pricing',
    confirmed: false,
    image: microfiber,
    alt: 'Grey microfibre towel resting on the bonnet of a freshly detailed black car',
  },
];

/* ───────────────────────────────────────────────────────────────
 * GALLERY: ILLUSTRATIVE IMAGERY.
 * Stock photography (Unsplash) plus three photos from the client folder
 * whose origin is unconfirmed. None are presented as Prestige customer
 * jobs. Swap in the owner's own photos when supplied.
 * `size` controls the tile shape in the editorial grid.
 * ─────────────────────────────────────────────────────────────── */
export interface Shot {
  image: ImageMetadata;
  title: string;
  tag: string;
  alt: string;
  size: 'tall' | 'wide' | 'square' | 'big';
  position?: string;
}

export const gallery: Shot[] = [
  // Order matters: it tiles the 4-column desktop grid and the 2-column mobile grid with no gaps.
  { image: snowFoam, title: 'Snow foam pre-wash', tag: 'Exterior', alt: 'Black Mercedes covered in thick snow foam', size: 'big', position: 'center 40%' },
  { image: beadingGrey, title: 'Hydrophobic finish', tag: 'Ceramic', alt: 'Tight water beads on metallic grey paint', size: 'tall' },
  { image: tyreBrush, title: 'Wheels & tyres', tag: 'Exterior', alt: 'Gloved hand scrubbing a tyre sidewall with a brush', size: 'square' },
  { image: dashBrush, title: 'Dash & vents', tag: 'Interior', alt: 'Detailing brush cleaning the dashboard of a classic car', size: 'wide' },
  { image: polisherDetail, title: 'Machine polish', tag: 'Correction', alt: 'Polishing machine resting on glossy black paintwork', size: 'tall' },
  { image: tailLights, title: 'Night finish', tag: 'Detail', alt: 'Red tail lights glowing on a dark muscle car', size: 'tall', position: 'center 30%' },
  { image: glossReflection, title: 'Mirror reflections', tag: 'Finish', alt: 'Palm trees reflected in the glossy dark paint of a car roof', size: 'wide' },
  { image: blackUte, title: 'Stripes & gloss', tag: 'Exterior', alt: 'Black car with yellow bonnet stripes in a detailing garage', size: 'tall' },
  { image: brownLeather, title: 'Leather & trim', tag: 'Interior', alt: 'Clean brown leather seats and centre console', size: 'square' },
  { image: headlightGlow, title: 'After dark', tag: 'Detail', alt: 'Headlights of a dark car in a black studio', size: 'wide', position: 'center 55%' },
];

/** Before / after slider: an ILLUSTRATIVE simulation. The "before" side is the same photo with a CSS haze-and-swirl effect. */
export const beforeAfter = {
  image: glossReflection,
  alt: 'Glossy dark car paint reflecting palm trees and a house',
};

/* ───────────────────────────────────────────────────────────────
 * REVIEWS: only the three excerpts supplied in the brief.
 * Reviewer names were not supplied, so none are shown.
 * ─────────────────────────────────────────────────────────────── */
export const reviews: string[] = [
  'Amazing work for a great price!',
  'Very happy customer, and well worth the money.',
  'Dave is a skilled technician and produces quality work.',
];

/** Unsplash photo credits (free Unsplash License; attribution appreciated, not required). */
export const credits = [
  'Jan Kopřiva', 'Graham Pengelly', 'Joey Banks', 'serjan midili', 'Luay Barani', 'Willian Cittadin',
  'Andre Tan', 'Zac Nielson', 'GoGoNano', 'Viktor Theo', 'igor constantino', 'Tuomas Nylund',
  'Vitalii Abakumov', 'Maximilian Kunstwadl', 'Neelabh Raj',
];
