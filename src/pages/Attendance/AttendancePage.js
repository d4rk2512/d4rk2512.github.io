import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import Header from "../../Layout/Header";
import { classIds, classById } from "../../store/atom/class";
import { studentByIdAtom } from "../../store/atom/student";
import {
  attendanceIdsAtom,
  attendanceById,
  attendanceByIdSelector,
} from "../../store/atom/attendance";

export default function AttendancePage() {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const classIdsList = useRecoilValue(classIds);

  const attendanceKey =
    selectedDate && selectedClass
      ? `${selectedDate.replace(/-/g, "")}|${selectedClass}`
      : null;

  return (
    <div>
      <Header />
      <h1>Điểm danh</h1>
      <div style={{ margin: "12px 0" }}>
        <label>Ngày: </label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
        {"  "}
        <label>Lớp: </label>
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          <option value="">-- Chọn lớp --</option>
          {classIdsList.map((id) => (
            <ClassOption key={id} id={id} />
          ))}
        </select>
      </div>
      {attendanceKey ? (
        <AttendanceSheet
          key={attendanceKey}
          attendanceKey={attendanceKey}
          classId={selectedClass}
        />
      ) : (
        <p style={{ color: "#999" }}>Chọn ngày và lớp để điểm danh.</p>
      )}
      <hr />
      <AttendanceHistory />
    </div>
  );
}

function ClassOption({ id }) {
  const cls = useRecoilValue(classById(id));
  return <option value={id}>{cls?.name}</option>;
}

function AttendanceSheet({ attendanceKey, classId }) {
  const cls = useRecoilValue(classById(classId));
  const existingAttendance = useRecoilValue(attendanceById(attendanceKey));
  const setAttendance = useSetRecoilState(attendanceByIdSelector(attendanceKey));

  const [attended, setAttended] = useState(
    new Set(existingAttendance?.students || [])
  );
  const [collected, setCollected] = useState(
    new Set(existingAttendance?.collected || [])
  );

  const toggleAttended = (sid) => {
    const wasAttended = attended.has(sid);
    const nextAttended = new Set(attended);
    if (wasAttended) {
      nextAttended.delete(sid);
      const nextCollected = new Set(collected);
      nextCollected.delete(sid);
      setCollected(nextCollected);
    } else {
      nextAttended.add(sid);
    }
    setAttended(nextAttended);
  };

  const toggleCollected = (sid) => {
    const nextCollected = new Set(collected);
    if (nextCollected.has(sid)) nextCollected.delete(sid);
    else nextCollected.add(sid);
    setCollected(nextCollected);
  };

  const handleSave = () => {
    setAttendance({
      students: Array.from(attended),
      collected: Array.from(collected),
    });
    alert("Đã lưu điểm danh!");
  };

  const students = cls?.students || [];

  return (
    <div>
      <h2>Lớp: {cls?.name}</h2>
      {students.length === 0 ? (
        <p style={{ color: "#999" }}>Lớp này chưa có học sinh.</p>
      ) : (
        <>
          <table border="1" cellPadding="8" style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th>Học sinh</th>
                <th>Có mặt</th>
                <th>Thu tiền ({(cls?.fee || 0).toLocaleString()}đ)</th>
              </tr>
            </thead>
            <tbody>
              {students.map((sid) => (
                <AttendanceRow
                  key={sid}
                  id={sid}
                  attended={attended.has(sid)}
                  collected={collected.has(sid)}
                  onToggleAttended={() => toggleAttended(sid)}
                  onToggleCollected={() => toggleCollected(sid)}
                />
              ))}
            </tbody>
          </table>
          <br />
          <div>
            Có mặt: {attended.size}/{students.length} | Thu tiền: {collected.size}
          </div>
          <br />
          <button onClick={handleSave}>Lưu điểm danh</button>
        </>
      )}
    </div>
  );
}

function AttendanceRow({ id, attended, collected, onToggleAttended, onToggleCollected }) {
  const student = useRecoilValue(studentByIdAtom(id));
  return (
    <tr>
      <td>{student?.name || id}</td>
      <td style={{ textAlign: "center" }}>
        <input type="checkbox" checked={attended} onChange={onToggleAttended} />
      </td>
      <td style={{ textAlign: "center" }}>
        <input
          type="checkbox"
          checked={collected}
          onChange={onToggleCollected}
          disabled={!attended}
        />
      </td>
    </tr>
  );
}

function AttendanceHistory() {
  const attendanceIds = useRecoilValue(attendanceIdsAtom);

  if (attendanceIds.length === 0) return null;

  const sorted = [...attendanceIds].sort((a, b) => b.localeCompare(a));

  return (
    <div>
      <h2>Lịch sử điểm danh</h2>
      <table border="1" cellPadding="8" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Ngày</th>
            <th>Lớp</th>
            <th>Có mặt</th>
            <th>Đã thu tiền</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((id) => (
            <AttendanceHistoryRow key={id} id={id} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AttendanceHistoryRow({ id }) {
  const attendance = useRecoilValue(attendanceById(id));
  const parts = id.split("|");
  const dateStr = parts[0] || "";
  const classId = parts[1] || "";
  const cls = useRecoilValue(classById(classId));

  const date = dateStr.length === 8
    ? `${dateStr.substring(0, 4)}-${dateStr.substring(4, 6)}-${dateStr.substring(6, 8)}`
    : dateStr;

  return (
    <tr>
      <td>{date}</td>
      <td>{cls?.name || classId}</td>
      <td>{attendance?.students?.length || 0}</td>
      <td>{attendance?.collected?.length || 0}</td>
    </tr>
  );
}
