import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";  // ✅ Import Routes and Route
import Home from './pages/home';


function App() {

  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
