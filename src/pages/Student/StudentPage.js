import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import Header from "../../Layout/Header";

import {
  studentIdsAtom,
  studentInfoByIdSelector,
} from "../../store/atom/student";

export default function StudentPage() {
  const studentIds = useRecoilValue(studentIdsAtom);
  const addStudent = useSetRecoilState(studentInfoByIdSelector("new"));

  return (
    <div>
      <Header />
      <h1>Danh sách học sinh</h1>
      {studentIds.map((id) => (
        <Student key={id} id={id} />
      ))}

      <button onClick={addStudent}>Thêm học sinh</button>
    </div>
  );
}

function Student({ id }) {
  const [student, setStudent] = useRecoilState(studentInfoByIdSelector(id));

  const setStudentData = (props) => (value) => {
    setStudent((student) => ({ ...student, [props]: value.target.value }));
  };

  const deleteStudent = () => {
    setStudent(null);
  };

  return (
    <div>
      <span>{student?.id}</span>
      <br />
      <label>Tên:</label>
      <input onChange={setStudentData("name")} value={student?.name} />
      <button onClick={deleteStudent}>Xoá</button>
    </div>
  );
}
