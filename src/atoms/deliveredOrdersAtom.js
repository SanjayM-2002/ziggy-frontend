import { atom } from 'recoil';

const deliveredOrdersAtom = atom({
  key: 'deliveredOrdersAtom',
  default: [],
});

export default deliveredOrdersAtom;
