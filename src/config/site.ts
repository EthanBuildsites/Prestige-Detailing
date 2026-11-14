/**
 * ─────────────────────────────────────────────────────────────
 *  BUSINESS DETAILS: the single source of truth for the site.
 * ─────────────────────────────────────────────────────────────
 *  CONCEPT / DEMO SITE. Built 11 Nov 2026 as a private pitch for
 *  Prestige Car Detailing Townsville. It is NOT the official
 *  website and has not been approved by the business.
 *
 *  Everything below came from the supplied brief (_client-brief/brief.md).
 *  Fields left empty were NOT supplied; nothing here is invented.
 *  Components hide anything that is empty.
 */
export const site = {
  name: 'Prestige Car Detailing Townsville',
  shortName: 'Prestige',
  established: 2012,
  region: 'the greater Townsville region',

  /** Shown in the footer and in the page meta. Set to false once the owner approves the site. */
  isDemo: true,

  seo: {
    title: 'Prestige Car Detailing Townsville | Ceramic Coating & Premium Detailing',
    description:
      'Premium car detailing and ceramic coating throughout Townsville since 2012. Interior and exterior detailing, paint correction and long-lasting ceramic protection. Call 0457 765 474.',
  },

  contact: {
    street: '1 Goldfish Ct',
    suburb: 'Burdell',
    state: 'QLD',
    postcode: '4818',
    countryCode: 'AU',
    phone: '0457 765 474',
    phoneHref: 'tel:+61457765474',
    /** NOT SUPPLIED */
    email: '',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=1+Goldfish+Ct%2C+Burdell+QLD+4818',
    mapEmbedUrl: 'https://maps.google.com/maps?q=1+Goldfish+Ct,+Burdell+QLD+4818&z=14&output=embed',
  },

  /** Townsville doesn't observe daylight saving, so the live status uses Australia/Brisbane time. */
  timeZone: 'Australia/Brisbane',
  /** day: 0 = Sunday … 6 = Saturday. Leave open/close empty for closed days. */
  hours: [
    { day: 1, label: 'Monday', time: '7am – 5pm', open: '07:00', close: '17:00' },
    { day: 2, label: 'Tuesday', time: '7am – 5pm', open: '07:00', close: '17:00' },
    { day: 3, label: 'Wednesday', time: '7am – 5pm', open: '07:00', close: '17:00' },
    { day: 4, label: 'Thursday', time: '7am – 5pm', open: '07:00', close: '17:00' },
    { day: 5, label: 'Friday', time: '7am – 5pm', open: '07:00', close: '17:00' },
    { day: 6, label: 'Saturday', time: 'Closed', open: '', close: '' },
    { day: 0, label: 'Sunday', time: 'Closed', open: '', close: '' },
  ],
  hoursSummary: 'Mon – Fri · 7am – 5pm',

  reviews: {
    count: 31,
    source: 'Google',
    /** NOT VERIFIED: paste the business's Google reviews link here to show a "Read the reviews" button. */
    url: '',
  },

  /** NOT SUPPLIED: add URLs to show social links. */
  social: { facebook: '', instagram: '' },
};

export const fullAddress = `${site.contact.street}, ${site.contact.suburb} ${site.contact.state} ${site.contact.postcode}`;

export const nav = [
  { label: 'Home', href: '#top' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];
