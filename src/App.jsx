import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AuthPage from "./components/auth/AuthPage";
import Home from "./components/main/Home";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={ <AuthPage />}></Route>
          <Route path="/home" element={<Home />}></Route>
        </Routes>
        <Toaster richColors duration={2000}/>
      </BrowserRouter>
    </>
  );
}

export default App;
