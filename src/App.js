import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './Components/Pages/Home'
import Movies from './Components/Pages/Movies'
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
            path='/movies'
            element={<Movies/>}
            />

          </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
