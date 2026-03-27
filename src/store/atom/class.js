import { atom, atomFamily, selectorFamily } from "recoil";
import { recoilPersist } from "recoil-persist";
import { randomId } from "../../util";

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

const classInfoByIdSelector = selectorFamily({
  key: "classInfoById",
  get:
    (id) =>
    ({ get }) => {
      const cls = get(classById(id));
      return { id, ...cls };
    },
  set:
    (id) =>
    ({ set, reset }, newClass) => {
      if (id === "new") {
        const newId = randomId();
        set(classIds, (ids) => [...ids, newId]);
        set(classById(newId), newClass);
        return;
      }
      if (newClass === null) {
        reset(classById(id));
        set(classIds, (ids) => ids.filter((cId) => cId !== id));
        return;
      }
      set(classById(id), newClass);
    },
});

export { classIds, classById, classInfoByIdSelector };
