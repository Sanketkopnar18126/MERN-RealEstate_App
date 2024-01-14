import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Home} from './Pages/Home/Home'
import {Login} from './Pages/Login/Login'
import {Profile} from './Pages/Profile/Profile'
import {SignUp} from './Pages/SignUp/SignUp'
import {About} from './Pages/About/About'
function App() {

  return (
    <>
    <BrowserRouter>
    
    <Routes>

<Route path="/" element={<Home/>}/>
<Route path="/login" element={<Login/>}/>
<Route path="/profile" element={<Profile/>}/>
<Route path="/signup" element={<SignUp/>}/>
<Route path="/about" element={<About/>}/>




    </Routes>
    
    </BrowserRouter>
    </>
  )
}

export default App
