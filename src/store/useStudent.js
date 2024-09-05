import {
  atom,
  atomFamily,
  selectorFamily,
  useRecoilState,
  useRecoilValue,
} from "recoil";

import { studentById } from "./atom/student";

export default function useStudentInfo(id) {
  const [studentInfo, setStudentInfo] = useRecoilState(studentById(id));

  const addStudent = (id, name) => {
    const newId = Math.random().toString(36).substring(2, 9);
    setStudentIds((ids) => [...ids, newId]);
  };

  return {
    studentIds,
    studentInfos: [],
    addStudent
  };
}
