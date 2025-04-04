import React from "react"
import Home from "./Pages/Home"
import { ToastContainer } from "react-toastify"

function App() {

  return (
    <div>
      <Home />
      <ToastContainer position="top-right" autoClose={2000} />

    </div>
  )
}

export default App
