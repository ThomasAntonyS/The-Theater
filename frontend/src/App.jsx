import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './Pages/Home'
import Popular from './Pages/Popular'
import TopRated from './Pages/TopRated'
import Upcoming from './Pages/Upcoming'
import Movie from './Pages/Movie'
import Watchlist from './Pages/Watchlist'
import Search from './Pages/Search'
import ProfileContextProvider from './Context/ProfileContextProvider'
import './App.css'
import CastMovies from './Pages/CastMovies'
import NotFound from './Pages/NotFound'
import GenreMoviesPage from './Components/GenreMoviesPage'
import CollectionPage from './Pages/CollectionsPage'
import Trending from './Pages/Trending'


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
            path='/popular/page/:page_no'
            element={<Popular/>}
            />

            <Route
            path='/top_rated/page/:page_no'
            element={<TopRated/>}
            />

            <Route
            path='/upcoming/page/:page_no'
            element={<Upcoming/>}
            />

            <Route
            path='/trending/page/:page_no'
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
            path="/search/:q/page/:page_no" 
            element={<Search />} 
            />
      
            <Route 
            path="/search" 
            element={<Search />} 
            />

            <Route
            path='/genre/:genreId/page/:pageCount'
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
