import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import Header from "../../Layout/Header";
import { classIds, classInfoByIdSelector } from "../../store/atom/class";
import { studentIdsAtom, studentByIdAtom } from "../../store/atom/student";

const DAYS = { 1: "T2", 2: "T3", 3: "T4", 4: "T5", 5: "T6", 6: "T7", 7: "CN" };
const EMPTY_CLASS = { name: "", dayOfWeek: [], time: "", fee: 0, students: [] };

export default function ClassPage() {
  const classIdsList = useRecoilValue(classIds);
  const [modal, setModal] = useState(null);

  const openAdd = () => setModal({ id: "new", ...EMPTY_CLASS });
  const closeModal = () => setModal(null);

  return (
    <div>
      <Header />
      <h1>Danh sách lớp học</h1>
      <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>Tên lớp</th>
            <th>Lịch học</th>
            <th>Giờ học</th>
            <th>Học phí/buổi</th>
            <th>Học sinh</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {classIdsList.map((id) => (
            <ClassRow key={id} id={id} onEdit={(data) => setModal(data)} />
          ))}
        </tbody>
      </table>
      <br />
      <button onClick={openAdd}>+ Thêm lớp học</button>
      {modal && <ClassModal key={modal.id} data={modal} onClose={closeModal} />}
    </div>
  );
}

function ClassRow({ id, onEdit }) {
  const cls = useRecoilValue(classInfoByIdSelector(id));
  const setClass = useSetRecoilState(classInfoByIdSelector(id));

  const handleDelete = () => {
    if (window.confirm(`Xoá lớp "${cls.name}"?`)) {
      setClass(null);
    }
  };

  return (
    <tr>
      <td>{cls.name}</td>
      <td>{(cls.dayOfWeek || []).map((d) => DAYS[d]).join(", ")}</td>
      <td>{cls.time}</td>
      <td>{(cls.fee || 0).toLocaleString()}</td>
      <td>
        <StudentNames ids={cls.students || []} />
      </td>
      <td>
        <button onClick={() => onEdit(cls)}>Sửa</button>{" "}
        <button onClick={handleDelete}>Xoá</button>
      </td>
    </tr>
  );
}

function StudentNames({ ids }) {
  return ids.map((id) => <StudentName key={id} id={id} />);
}

function StudentName({ id }) {
  const student = useRecoilValue(studentByIdAtom(id));
  return <span>{student?.name} </span>;
}

function ClassModal({ data, onClose }) {
  const [form, setForm] = useState({ ...data });
  const studentIdsList = useRecoilValue(studentIdsAtom);
  const setClass = useSetRecoilState(classInfoByIdSelector(data.id));

  const handleSave = () => {
    const { id: _id, ...classData } = form;
    setClass(classData);
    onClose();
  };

  const toggleDay = (day) => {
    setForm((f) => ({
      ...f,
      dayOfWeek: f.dayOfWeek.includes(day)
        ? f.dayOfWeek.filter((d) => d !== day)
        : [...f.dayOfWeek, day].sort((a, b) => a - b),
    }));
  };

  const toggleStudent = (sid) => {
    setForm((f) => ({
      ...f,
      students: f.students.includes(sid)
        ? f.students.filter((s) => s !== sid)
        : [...f.students, sid],
    }));
  };

  return (
    <div
      style={{
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
        background: "rgba(0,0,0,0.5)", display: "flex",
        alignItems: "center", justifyContent: "center", zIndex: 1000,
      }}
    >
      <div style={{ background: "white", padding: 24, borderRadius: 8, minWidth: 420 }}>
        <h2>{data.id === "new" ? "Thêm lớp học" : "Sửa lớp học"}</h2>
        <div style={{ margin: "8px 0" }}>
          <label>Tên lớp: </label>
          <input
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          />
        </div>
        <div style={{ margin: "8px 0" }}>
          <label>Ngày học: </label>
          {[1, 2, 3, 4, 5, 6, 7].map((d) => (
            <label key={d} style={{ marginRight: 8 }}>
              <input
                type="checkbox"
                checked={(form.dayOfWeek || []).includes(d)}
                onChange={() => toggleDay(d)}
              />
              {DAYS[d]}
            </label>
          ))}
        </div>
        <div style={{ margin: "8px 0" }}>
          <label>Giờ học: </label>
          <input
            type="time"
            value={form.time}
            onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))}
          />
        </div>
        <div style={{ margin: "8px 0" }}>
          <label>Học phí/buổi: </label>
          <input
            type="number"
            value={form.fee}
            onChange={(e) => setForm((f) => ({ ...f, fee: Number(e.target.value) }))}
          />
        </div>
        <div style={{ margin: "8px 0" }}>
          <label>Học sinh:</label>
          <div style={{ marginTop: 4 }}>
            {studentIdsList.length === 0 ? (
              <span style={{ color: "#999" }}>Chưa có học sinh nào</span>
            ) : (
              studentIdsList.map((sid) => (
                <StudentCheckbox
                  key={sid}
                  id={sid}
                  checked={(form.students || []).includes(sid)}
                  onChange={() => toggleStudent(sid)}
                />
              ))
            )}
          </div>
        </div>
        <div style={{ marginTop: 16 }}>
          <button onClick={handleSave}>Lưu</button>{" "}
          <button onClick={onClose}>Huỷ</button>
        </div>
      </div>
    </div>
  );
}

function StudentCheckbox({ id, checked, onChange }) {
  const student = useRecoilValue(studentByIdAtom(id));
  return (
    <label style={{ marginRight: 12 }}>
      <input type="checkbox" checked={checked} onChange={onChange} />
      {" "}{student?.name}
    </label>
  );
}
