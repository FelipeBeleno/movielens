import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import Navbar from "./components/layout/Navbar";
import Loader from "./components/ui/Loader"; 
import NotFound from "./pages/NotFound";


const Home = lazy(() => import("./pages/Home"));
const DetailMovie = lazy(() => import("./pages/DetailMovie"));
const PopularMovies = lazy(() => import("./pages/PopularMovies"));


function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />


        <main className="flex-1">
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movie/:id" element={<DetailMovie />} />
              <Route path="/populars" element={<PopularMovies />} />
              
              <Route path="*" element={<NotFound />} />
              
            </Routes>
          </Suspense>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
