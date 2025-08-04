import { BrowserRouter,Routes,Route } from "react-router-dom"
import Home from "./pages/Home/Home"
import { AuthProvider } from "./providers/authContext"
import Login from "./pages/users/login/Login"
import Register from "./pages/users/register/Register"

const App = () =>{
  return(
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
