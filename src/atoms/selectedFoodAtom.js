import { atom } from 'recoil';

const selectedFoodAtom = atom({
  key: 'selectedFoodAtom',
  default: null,
});

export default selectedFoodAtom;
