import { atomWithStorage } from 'jotai/utils';

export const authAtom = atomWithStorage('userId', '', undefined, {
  getOnInit: true,
});
