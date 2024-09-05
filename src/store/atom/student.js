import { atom, atomFamily, selectorFamily } from "recoil";
import { recoilPersist } from "recoil-persist";
import { randomId } from "../../util";

const { persistAtom } = recoilPersist({
  key: "student-attendance",
  storage: localStorage,
  converter: JSON,
});

const studentIdsAtom = atom({
  key: "studentIds",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

const studentByIdAtom = atomFamily({
  key: "studentById",
  default: {},
  effects_UNSTABLE: [persistAtom],
});

const studentInfoByIdSelector = selectorFamily({
  key: "studentInfoById",
  get:
    (id) =>
    ({ get }) => {
      const student = get(studentByIdAtom(id));
      return { id: id, ...student };
    },
  set:
    (id) =>
    ({ get, set, reset }, newStudent) => {
      if (id === "new") {
        const newId = randomId();
        set(studentIdsAtom, (ids) => [...ids, newId]);
        return;
      }

      if (newStudent === null) {
        reset(studentByIdAtom(id));
        set(studentIdsAtom, (ids) => ids.filter((sId) => id != sId));
        return;
      }

      set(studentByIdAtom(id), newStudent);
    },
});

export { studentIdsAtom, studentByIdAtom, studentInfoByIdSelector };
