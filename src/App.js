import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import PrivateRoute from "./components/PrivateRoute";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";

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
