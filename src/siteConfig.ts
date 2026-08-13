/**
 * Single source for the details that appear in many places. Changing an address or a file name
 * should be a one-line edit, not a grep-and-replace across every page.
 */
export const site = {
  email: 'zane15myers@gmail.com',
  phone: '+1 (620) 504-2094',
  /** tel: needs the E.164 form, which is why it's stored separately from the display string. */
  phoneHref: 'tel:+16205042094',
  location: 'St. George, Kansas',
  locationShort: 'St. George, KS',
  role: 'Application Developer',
  employer: 'Aprio',
  website: 'zm1.org',
  websiteUrl: 'https://zm1.org',
  resumePath: '/zm-resume.pdf',
  github: 'https://github.com/zanemyers',
  linkedin: 'https://www.linkedin.com/in/zane-myers-s15',
} as const;

export const mailto = `mailto:${site.email}`;
