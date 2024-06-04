import { atom } from 'recoil';

const assignedOrdersAtom = atom({
  key: 'assignedOrdersAtom',
  default: [],
});

export default assignedOrdersAtom;
