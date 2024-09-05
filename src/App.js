import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home/Home";
import Setting from "./pages/Setting/Setting";
import ClassPage from "./pages/Class/ClassPage";
import StudentPage from "./pages/Student/StudentPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/setting" element={<Setting />} />
        <Route exact path="/class" element={<ClassPage />} />
        <Route exact path="/student" element={<StudentPage />} />
      </Routes>
    </Router>
  );
}

export default App;
