import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './Components/Pages/Home'
import Popular from './Components/Pages/Popular'
import TopRated from './Components/Pages/TopRated'
import Upcoming from './Components/Pages/Upcoming'
import MovieMain from './Components/Pages/MovieMain'
import './App.css'


function App() {

  return (
    <>
      <BrowserRouter>

          <Routes>

            <Route 
            path='/' 
            element={<Home/>}/>

            <Route
            path='/popular'
            element={<Popular/>}
            />

            <Route
            path='/top_rated'
            element={<TopRated/>}
            />

            <Route
            path='/upcoming'
            element={<Upcoming/>}
            />

            <Route
            path={'movie/:id'}
            element={<MovieMain/>}
            />


          </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
