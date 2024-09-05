import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/setting">Setting</Link>
      <Link to="/student">Student</Link>
      <Link to="/class">Class</Link>
    </div>
  );
}