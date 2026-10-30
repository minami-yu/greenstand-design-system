// Local prototype choices; no contact details leave the device.
export const countries = [
  ['AF', 'Afghanistan', '93'], ['AL', 'Albania', '355'], ['DZ', 'Algeria', '213'],
  ['AD', 'Andorra', '376'], ['AO', 'Angola', '244'], ['AG', 'Antigua and Barbuda', '1'],
  ['AR', 'Argentina', '54'], ['AM', 'Armenia', '374'], ['AU', 'Australia', '61'],
  ['AT', 'Austria', '43'], ['AZ', 'Azerbaijan', '994'], ['BS', 'Bahamas', '1'],
  ['BH', 'Bahrain', '973'], ['BD', 'Bangladesh', '880'], ['BE', 'Belgium', '32'],
  ['BJ', 'Benin', '229'], ['BO', 'Bolivia', '591'], ['BW', 'Botswana', '267'],
  ['BR', 'Brazil', '55'], ['BF', 'Burkina Faso', '226'], ['BI', 'Burundi', '257'],
  ['KH', 'Cambodia', '855'], ['CM', 'Cameroon', '237'], ['CA', 'Canada', '1'],
  ['CF', 'Central African Republic', '236'], ['TD', 'Chad', '235'], ['CL', 'Chile', '56'],
  ['CN', 'China', '86'], ['CO', 'Colombia', '57'], ['CD', 'Democratic Republic of the Congo', '243'],
  ['DK', 'Denmark', '45'], ['EC', 'Ecuador', '593'], ['EG', 'Egypt', '20'],
  ['ET', 'Ethiopia', '251'], ['FI', 'Finland', '358'], ['FR', 'France', '33'],
  ['GM', 'Gambia', '220'], ['DE', 'Germany', '49'], ['GH', 'Ghana', '233'],
  ['GN', 'Guinea', '224'], ['HT', 'Haiti', '509'], ['IN', 'India', '91'],
  ['ID', 'Indonesia', '62'], ['IE', 'Ireland', '353'], ['IT', 'Italy', '39'],
  ['CI', 'Ivory Coast', '225'], ['JP', 'Japan', '81'], ['KE', 'Kenya', '254'],
  ['LR', 'Liberia', '231'], ['MG', 'Madagascar', '261'], ['MW', 'Malawi', '265'],
  ['MY', 'Malaysia', '60'], ['ML', 'Mali', '223'], ['MX', 'Mexico', '52'],
  ['MA', 'Morocco', '212'], ['MZ', 'Mozambique', '258'], ['NP', 'Nepal', '977'],
  ['NL', 'Netherlands', '31'], ['NZ', 'New Zealand', '64'], ['NE', 'Niger', '227'],
  ['NG', 'Nigeria', '234'], ['NO', 'Norway', '47'], ['PK', 'Pakistan', '92'],
  ['PE', 'Peru', '51'], ['PH', 'Philippines', '63'], ['PL', 'Poland', '48'],
  ['PT', 'Portugal', '351'], ['RW', 'Rwanda', '250'], ['SA', 'Saudi Arabia', '966'],
  ['SN', 'Senegal', '221'], ['SL', 'Sierra Leone', '232'], ['SG', 'Singapore', '65'],
  ['ZA', 'South Africa', '27'], ['KR', 'South Korea', '82'], ['SS', 'South Sudan', '211'],
  ['ES', 'Spain', '34'], ['LK', 'Sri Lanka', '94'], ['SD', 'Sudan', '249'],
  ['SE', 'Sweden', '46'], ['CH', 'Switzerland', '41'], ['TZ', 'Tanzania', '255'],
  ['TH', 'Thailand', '66'], ['TG', 'Togo', '228'], ['TR', 'Türkiye', '90'],
  ['UG', 'Uganda', '256'], ['UA', 'Ukraine', '380'], ['AE', 'United Arab Emirates', '971'],
  ['GB', 'United Kingdom', '44'], ['US', 'United States', '1'], ['VN', 'Vietnam', '84'],
  ['ZM', 'Zambia', '260'], ['ZW', 'Zimbabwe', '263']
] as const;

export type Country = (typeof countries)[number];
export const countryFlag = (code: string) => String.fromCodePoint(...[...code].map(char => 127397 + char.charCodeAt(0)));
export const defaultCountry: Country = countries.find(country => country[0] === 'US')!;

export function contactKey(method: 'phone' | 'email', value: string, country: Country) {
  return method === 'email' ? `email:${value.trim().toLowerCase()}` : `phone:+${country[2]}${value.replace(/\D/g, '')}`;
}

export function validContact(method: 'phone' | 'email', value: string) {
  return method === 'email' ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) : /^[\d\s()-]+$/.test(value) && value.replace(/\D/g, '').length >= 5 && value.replace(/\D/g, '').length <= 15;
}
