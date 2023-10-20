import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import AppNavBar from "./components/AppBar.jsx";

function App() {

  return (
    <BrowserRouter>
      <AppNavBar
      ></AppNavBar>
      <Routes>
        <Route
          index
          path="/"
          element={<MainPage />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
