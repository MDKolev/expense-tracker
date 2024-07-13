import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AuthPage from "./components/auth/AuthPage";
import Home from "./components/main/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={ <AuthPage />}></Route>
          <Route path="/home" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
