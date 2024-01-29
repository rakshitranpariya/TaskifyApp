import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TaskListingPage from "./Component/TaskListingPage/TaskListingPage";
import MakeNewTask from "./Component/MakeNewTask/MakeNewTask";
import LoginPage from "./Component/UserAuthentication/LoginPage";
import RegisterPage from "./Component/UserAuthentication/RegisterPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/tasklist" element={<TaskListingPage />} />
        <Route path="/newtask" element={<MakeNewTask />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route index element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
