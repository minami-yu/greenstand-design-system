import type { ImageSourcePropType } from 'react-native';

export type PrototypeUser = {
  id: string;
  name: string;
  image?: ImageSourcePropType;
  deviceOwner?: boolean;
  organizations: string[];
  verified: number;
  awaiting: number;
  pending: number;
};
export const initialUsers: PrototypeUser[] = [
  { id: 'oluwatobiloba', name: 'Oluwatobiloba Adeyemi', image: require('../../../assets/filters/oluwatobiloba.png'), deviceOwner: true, organizations: ['Greenstand'], verified: 26, awaiting: 4, pending: 6 },
  { id: 'amara', name: 'Amara Diallo', image: require('../../../assets/capture/user-amara.png'), organizations: ['Kilimanjaro Project'], verified: 0, awaiting: 0, pending: 0 },
  { id: 'chinecherem', name: 'Chinecherem Okeke', image: require('../../../assets/capture/user-chinecherem.png'), organizations: [], verified: 0, awaiting: 0, pending: 0 },
  { id: 'nneka', name: 'Nneka Ifeanyichukwu', image: require('../../../assets/capture/user-nneka.png'), organizations: [], verified: 0, awaiting: 0, pending: 0 }
];
export const userOrganizations: { name: string; image?: ImageSourcePropType }[] = [
  { name: 'Aether Green' },
  { name: 'Bondy', image: require('../../../assets/filters/bondy.png') },
  { name: 'Bosque la Tigra', image: require('../../../assets/users/bosque.png') },
  { name: 'Center for Forest Preservation' },
  { name: 'Echo', image: require('../../../assets/users/echo.png') },
  { name: 'Ecotrust', image: require('../../../assets/users/ecotrust.png') },
  { name: 'Greenstand', image: require('../../../assets/capture/org-greenstand.png') },
  { name: 'Kilimanjaro Project', image: require('../../../assets/capture/org-kilimanjaro.png') }
];
