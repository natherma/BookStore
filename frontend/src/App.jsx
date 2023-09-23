import React from "react"
import {BrowserRouter,Routes,Route}  from "react-router-dom"
import {Createbook,Home,Showbook,Editbook} from "./pages"


function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/Createbook" element={<Createbook/>}/>
      <Route path='Showbook/:id' element={<Showbook/>}/>
      <Route path='Editbook/:id' element={<Editbook/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
