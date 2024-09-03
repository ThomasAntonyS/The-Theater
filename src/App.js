import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './Components/Pages/Home'
import Popular from './Components/Pages/Popular'
import TopRated from './Components/Pages/TopRated'
import Upcoming from './Components/Pages/Upcoming'
import Movie from './Components/Pages/Movie'
import './App.css'
import Profile from './Components/Pages/Profile'
import Watchlist from './Components/Pages/Watchlist'
import Search from './Components/Pages/Search'
import SignIn from './Components/Pages/SignIn'
import SignUp from './Components/Pages/SignUp'
import ProfileContextProvider from './Context/ProfileContextProvider'


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
            path={'movie/:id'}
            element={<Movie/>}
            />

            <Route
            path={'/profile'}
            element={<Profile/>}
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
            element={<SignIn/>}
            />

            <Route
            path={'/sign_up'}
            element={<SignUp/>}
            />

        </Routes>

        </ProfileContextProvider>

      </BrowserRouter>
      
    </div>
  )
}

export default App
