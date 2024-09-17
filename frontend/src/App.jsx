import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import CreateBook from './pages/CreateBook'
import ShowBook from './pages/ShowBook'
import EditBook from './pages/EditBook'
import DeleteBook from './pages/DeleteBook'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/commodities/create' element={<CreateBook />} />
      <Route path='/commodities/details/:id' element={<ShowBook />} />
      <Route path='/commodities/edit/:id' element={<EditBook />} />
      <Route path='/commodities/delete/:id' element={<DeleteBook />} />
    </Routes>
  )
}

export default App