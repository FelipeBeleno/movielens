import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./components/layout/Navbar"
import Home from "./pages/Home";
import DetailMovie from "./pages/DetailMovie";
import PopularMovies from "./pages/PopularMovies";


function App() {


  return (
    <>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
          <Navbar />


          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movie/:id" element={<DetailMovie />} />
              <Route path="populars" element={<PopularMovies />} />
              {
                /*
               
              <Route path="/movie/:id" element={<MovieDetail />} />
              <Route path="*" element={<NOTFOUND />} />
               */
              }
            </Routes>
          </main>

        </div>
      </BrowserRouter>
    </>
  )
}

export default App
