import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div>
      <Link to="/">Home</Link>{" | "}
      <Link to="/student">Học sinh</Link>{" | "}
      <Link to="/class">Lớp học</Link>{" | "}
      <Link to="/attendance">Điểm danh</Link>{" | "}
      <Link to="/tuition">Học phí</Link>{" | "}
      <Link to="/setting">Cài đặt</Link>
    </div>
  );
}
