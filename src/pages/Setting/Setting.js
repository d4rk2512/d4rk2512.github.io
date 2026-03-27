import { useRecoilCallback } from "recoil";
import Header from "../../Layout/Header";
import { studentIdsAtom, studentByIdAtom } from "../../store/atom/student";
import { classIds, classById } from "../../store/atom/class";
import { attendanceIdsAtom, attendanceById } from "../../store/atom/attendance";
import { tutitionFeeById } from "../../store/atom/tutitionFee";
import sampleData from "../../data.json";

export default function Setting() {
  const loadSampleData = useRecoilCallback(({ set }) => () => {
    if (!window.confirm("Load dữ liệu mẫu? Dữ liệu hiện tại sẽ bị ghi đè.")) return;

    const studentIdsList = sampleData.studentIds.map(String);
    set(studentIdsAtom, studentIdsList);
    for (const id of studentIdsList) {
      set(studentByIdAtom(id), sampleData.students[id]);
    }

    const classIdsList = sampleData.classIds.map(String);
    set(classIds, classIdsList);
    for (const id of classIdsList) {
      const cls = sampleData.classes[id];
      set(classById(id), { ...cls, students: cls.students.map(String) });
    }

    const attendanceIdsList = Object.keys(sampleData.attendances);
    set(attendanceIdsAtom, attendanceIdsList);
    for (const aid of attendanceIdsList) {
      const a = sampleData.attendances[aid];
      set(attendanceById(aid), {
        students: a.students.map(String),
        collected: a.collected.map(String),
      });
    }

    for (const [sid, feeData] of Object.entries(sampleData.tutitionFeeByStudentIds)) {
      set(tutitionFeeById(sid), feeData);
    }

    alert("Đã load dữ liệu mẫu!");
  });

  const clearAllData = useRecoilCallback(({ set, reset }) => () => {
    if (!window.confirm("Xoá tất cả dữ liệu? Hành động này không thể hoàn tác.")) return;
    set(studentIdsAtom, []);
    set(classIds, []);
    set(attendanceIdsAtom, []);
    alert("Đã xoá tất cả dữ liệu!");
  });

  return (
    <div>
      <Header />
      <h1>Cài đặt</h1>
      <h3>Dữ liệu</h3>
      <p>
        <button onClick={loadSampleData}>Load dữ liệu mẫu</button>
        {"  "}
        <button onClick={clearAllData} style={{ color: "red" }}>
          Xoá tất cả dữ liệu
        </button>
      </p>
    </div>
  );
}
