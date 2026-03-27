import { selector } from "recoil";
import { attendanceIdsAtom, attendanceById } from "./atom/attendance";
import { classById } from "./atom/class";

export const studentMonthlyFeesSelector = selector({
  key: "studentMonthlyFees",
  get: ({ get }) => {
    const attendanceIds = get(attendanceIdsAtom);
    const fees = {}; // { [studentId]: { [YYYYMM]: number } }

    for (const aid of attendanceIds) {
      const attendance = get(attendanceById(aid));
      if (!attendance) continue;

      const parts = aid.split("|");
      if (parts.length !== 2) continue;

      const [dateStr, classId] = parts;
      const cls = get(classById(classId));
      if (!cls || !cls.fee) continue;

      const month = dateStr.substring(0, 6); // YYYYMM

      for (const studentId of attendance.students || []) {
        if (!fees[studentId]) fees[studentId] = {};
        fees[studentId][month] = (fees[studentId][month] || 0) + cls.fee;
      }
    }

    return fees;
  },
});
