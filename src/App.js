import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import PrivateRoute from "./components/PrivateRoute";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={
          <LoginPage />
        } />

        <Route path="/" element={
          <PrivateRoute>
            <MainPage />
          </PrivateRoute>
        } />

        <Route path="/projects/:id" element={
          <PrivateRoute>
            <MainPage />
          </PrivateRoute>
        } />
        
        </Routes>
    </BrowserRouter>
  );
}

export default App;
