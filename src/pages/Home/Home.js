import Header from "../../Layout/Header";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <Header />
      <h1>App điểm danh</h1>
    </div>
  );
}

function Student({ id }) {
  return <div></div>;
}
