import logo from "./logo.svg";
import "./App.css";
import Signup from "./components/Signup";
import { Routes, Route,useLocation  } from "react-router-dom";
import Login from "./components/Login";
import Notes from "./components/Notes";
import AddNote from "./components/AddNote";
import Navbar from "./components/Navbar";
import EditNote from "./components/EditNote";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  return (
    <div className="App">
      <Navbar />
      {isHomePage && (
        <img
          src="https://cdn.neowin.com/news/images/uploaded/2018/09/1537418720_keep_notes.jpg"
          alt="Notes Image"
          className="notes-image"
        />
      )}
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/notes"
          element={
            <ProtectedRoute>
              <Notes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add"
          element={
            <ProtectedRoute>
              <AddNote />
            </ProtectedRoute>
          }
        />
        <Route path="/edit/:id" element={<EditNote />} />
      </Routes>
    </div>
  );
}


export default App;
