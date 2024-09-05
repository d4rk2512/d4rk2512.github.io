import { atomFamily } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "student-attendance",
  storage: localStorage,
  converter: JSON,
});

const tutitionFeeById = atomFamily({
  key: "tutitionFeeById",
  default: {},
  effects_UNSTABLE: [persistAtom],
});

export { tutitionFeeById };
