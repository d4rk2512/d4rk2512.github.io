import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home/Home";
import Setting from "./pages/Setting/Setting";
import ClassPage from "./pages/Class/ClassPage";
import StudentPage from "./pages/Student/StudentPage";
import AttendancePage from "./pages/Attendance/AttendancePage";
import TuitionFeePage from "./pages/TuitionFee/TuitionFeePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/setting" element={<Setting />} />
        <Route exact path="/class" element={<ClassPage />} />
        <Route exact path="/student" element={<StudentPage />} />
        <Route exact path="/attendance" element={<AttendancePage />} />
        <Route exact path="/tuition" element={<TuitionFeePage />} />
      </Routes>
    </Router>
  );
}

export default App;
