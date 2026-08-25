export interface Country {
  name: string;
  flag: string;
  popular: boolean;
  desc: string;
  visaTypes: string[];
  isSchengen?: boolean;
}

const standardVisaTypes = ['Tourist Visa', 'Business Visa'];

export const allCountries: Country[] = [
  // Existing Gulf & Others
  { name: 'Kuwait',       flag: '🇰🇼', popular: true,  desc: 'Work & Visit Visas',    visaTypes: ['Work Visa', 'Visit Visa', 'Tourist Visa', 'Business Visa'] },
  { name: 'Saudi Arabia', flag: '🇸🇦', popular: true,  desc: 'Work & Umrah Visas',    visaTypes: ['Work Visa', 'Business Visa', 'Umrah Visa'] },
  { name: 'UAE',          flag: '🇦🇪', popular: true,  desc: 'Tourist & Transit',     visaTypes: ['Tourist Visa', 'Transit Visa', 'Work Visa', 'Business Visa'] },
  { name: 'Qatar',        flag: '🇶🇦', popular: false, desc: 'Business Visas',        visaTypes: ['Business Visa', 'Work Visa', 'Visit Visa', 'Tourist Visa'] },
  { name: 'Bahrain',      flag: '🇧🇭', popular: false, desc: 'Work Permits',          visaTypes: ['Work Permit', 'Visit Visa', 'Business Visa', 'Tourist Visa'] },
  { name: 'Oman',         flag: '🇴🇲', popular: false, desc: 'Employment Visas',      visaTypes: ['Employment Visa', 'Visit Visa', 'Tourist Visa', 'Business Visa'] },
  { name: 'Singapore',    flag: '🇸🇬', popular: false, desc: 'Tourist & Work Visas',  visaTypes: ['Tourist Visa', 'Work Visa', 'Business Visa', 'Visit Visa'] },

  // Schengen Countries (14 items as requested)
  { name: 'France',       flag: '🇫🇷', popular: true,  desc: 'Schengen Visa',         visaTypes: standardVisaTypes, isSchengen: true },
  { name: 'Switzerland',  flag: '🇨🇭', popular: true,  desc: 'Schengen Visa',         visaTypes: standardVisaTypes, isSchengen: true },
  { name: 'Norway',       flag: '🇳🇴', popular: false, desc: 'Schengen Visa',         visaTypes: standardVisaTypes, isSchengen: true },
  { name: 'Germany',      flag: '🇩🇪', popular: true,  desc: 'Schengen Visa',         visaTypes: standardVisaTypes, isSchengen: true },
  { name: 'Greece',       flag: '🇬🇷', popular: false, desc: 'Schengen Visa',         visaTypes: standardVisaTypes, isSchengen: true },
  { name: 'Denmark',      flag: '🇩🇰', popular: false, desc: 'Schengen Visa',         visaTypes: standardVisaTypes, isSchengen: true },
  { name: 'Italy',        flag: '🇮🇹', popular: true,  desc: 'Schengen Visa',         visaTypes: standardVisaTypes, isSchengen: true },
  { name: 'Finland',      flag: '🇫🇮', popular: false, desc: 'Schengen Visa',         visaTypes: standardVisaTypes, isSchengen: true },
  { name: 'Netherlands',  flag: '🇳🇱', popular: false, desc: 'Schengen Visa',         visaTypes: standardVisaTypes, isSchengen: true },
  { name: 'Poland',       flag: '🇵🇱', popular: false, desc: 'Schengen Visa',         visaTypes: standardVisaTypes, isSchengen: true },
  { name: 'Portugal',     flag: '🇵🇹', popular: false, desc: 'Schengen Visa',         visaTypes: standardVisaTypes, isSchengen: true },
  { name: 'Romania',      flag: '🇷🇴', popular: false, desc: 'Schengen Visa',         visaTypes: standardVisaTypes, isSchengen: true },
  { name: 'Sweden',       flag: '🇸🇪', popular: false, desc: 'Schengen Visa',         visaTypes: standardVisaTypes, isSchengen: true },
  { name: 'Spain',        flag: '🇪🇸', popular: true,  desc: 'Schengen Visa',         visaTypes: standardVisaTypes, isSchengen: true },

  // Other Requested Countries
  { name: 'Japan',        flag: '🇯🇵', popular: false, desc: 'Tourist & eVISA',       visaTypes: standardVisaTypes },
  { name: 'China',        flag: '🇨🇳', popular: false, desc: 'Tourist & Business',    visaTypes: standardVisaTypes },
  { name: 'South Africa', flag: '🇿🇦', popular: false, desc: 'Tourist & Business',    visaTypes: standardVisaTypes },
  { name: 'South Korea',  flag: '🇰🇷', popular: false, desc: 'Tourist & Business',    visaTypes: standardVisaTypes },
  { name: 'Turkey',       flag: '🇹🇷', popular: false, desc: 'eVISA & Sticker Visa',  visaTypes: standardVisaTypes },
  { name: 'Vietnam',      flag: '🇻🇳', popular: false, desc: 'Tourist & Business',    visaTypes: standardVisaTypes },
  { name: 'Russia (E-Visa)',flag: '🇷🇺',popular: false, desc: 'E-Visa Assistance',     visaTypes: standardVisaTypes },
  { name: 'Indonesia',    flag: '🇮🇩', popular: false, desc: 'E-Visa Assistance',     visaTypes: standardVisaTypes },
  { name: 'Thailand',     flag: '🇹🇭', popular: true,  desc: 'E-Visa Assistance',     visaTypes: standardVisaTypes },
  { name: 'Hong Kong',    flag: '🇭🇰', popular: false, desc: 'E-Visa / PAR',          visaTypes: standardVisaTypes },
];

export const schengenCountries = allCountries.filter(c => c.isSchengen);
