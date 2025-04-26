import { Outlet } from "react-router-dom"
import { Nav } from "./components/Nav"
import { Footer } from "./components/Footer"


function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default App
