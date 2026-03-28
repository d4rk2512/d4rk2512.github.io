import { atom, atomFamily, selectorFamily } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "student-attendance",
  storage: localStorage,
  converter: JSON,
});

const attendanceIdsAtom = atom({
  key: "attendanceIds",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

const attendanceById = atomFamily({
  key: "attendanceById",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

const attendanceByIdSelector = selectorFamily({
  key: "attendanceByIdSelector",
  get:
    (id) =>
    ({ get }) =>
      get(attendanceById(id)),
  set:
    (id) =>
    ({ get, set }, newAttendance) => {
      const existing = get(attendanceIdsAtom);
      if (!existing.includes(id)) {
        set(attendanceIdsAtom, [...existing, id]);
      }
      set(attendanceById(id), newAttendance);
    },
});

export { attendanceIdsAtom, attendanceById, attendanceByIdSelector };
