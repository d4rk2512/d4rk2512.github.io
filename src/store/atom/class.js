import { atom, atomFamily } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "student-attendance",
  storage: localStorage,
  converter: JSON,
});

const classIds = atom({
  key: "classIds",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

const classById = atomFamily({
  key: "classById",
  default: {},
  effects_UNSTABLE: [persistAtom],
});

export { classIds, classById };
