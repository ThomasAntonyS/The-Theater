import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './Components/Pages/Home'
import Popular from './Components/Pages/Popular'
import TopRated from './Components/Pages/TopRated'
import Upcoming from './Components/Pages/Upcoming'
import Movie from './Components/Pages/Movie'
import Watchlist from './Components/Pages/Watchlist'
import Search from './Components/Pages/Search'
import Sign_In from './Components/Pages/Sign_In'
import Sign_Up from './Components/Pages/Sign_Up'
import ProfileContextProvider from './Context/ProfileContextProvider'
import './App.css'
import CastMovies from './Components/Pages/CastMovies'
import NotFound from './Components/Pages/NotFound'
import GenreMoviesPage from './Components/GenreMoviesPage'
import CollectionPage from './Components/Pages/CollectionsPage'
import Trending from './Components/Pages/Trending'


function App() {

  return (
    <div>
      <BrowserRouter>

        <ProfileContextProvider>

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
            path='/trending'
            element={<Trending/>}
            />

            <Route
            path={'/movie/:id'}
            element={<Movie/>}
            />

            <Route
            path={'/cast/:id'}
            element={<CastMovies/>}
            />

            <Route
            path={'/watchlist'}
            element={<Watchlist/>}
            />

            <Route
            path={'/search'}
            element={<Search/>}
            />

            <Route
            path={'/sign_in'}
            element={<Sign_In/>}
            />

            <Route
            path={'/sign_up'}
            element={<Sign_Up/>}
            />

            <Route
            path='/genre/:genreId'
            element={<GenreMoviesPage/>}
            />

            <Route
            path ='/collection/:collectionId'
            element={<CollectionPage/>}
            />

            <Route
            path='/*'
            element={<NotFound/>}
            />

        </Routes>

        </ProfileContextProvider>

      </BrowserRouter>
      
    </div>
  )
}

export default App
