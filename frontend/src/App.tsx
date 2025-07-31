import { BrowserRouter,Routes,Route } from "react-router-dom"
import Home from "./pages/Home/Home"
import { AuthProvider } from "./providers/authContext"

const App = () =>{
  return(
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home/>}/>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
