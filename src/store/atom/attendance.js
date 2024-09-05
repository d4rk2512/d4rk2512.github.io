import { atomFamily } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "student-attendance",
  storage: localStorage,
  converter: JSON,
});

const attendanceById = atomFamily({
  key: "attendanceById",
  default: {},
  effects_UNSTABLE: [persistAtom],
});

export { attendanceById };
