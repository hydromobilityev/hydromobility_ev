import { Routes, Route, Link } from "react-router-dom";
import './App.css'
import Landing from './Landingpage/Landingpage';
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Privacy from "./Landingpage/Privacy";
import Terms from "./Landingpage/Terms";

function App() {

  return (
   <div>
    <Header/>
     <Routes>
        <Route path="/" element={<Landing />} />
         <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />

      </Routes>
      <Footer/>
   </div>
  )
}

export default App
