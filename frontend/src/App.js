import {BrowserRouter,Routes, Route} from 'react-router-dom'
import Homepage from './pages/Homepage';
import AddProductPage from './pages/AddProductPage';
import UpdateProductPage from './pages/UpdateProductPage';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/addProduct' element={<AddProductPage/>}/>
        <Route path='/updateProduct/:id' element={<UpdateProductPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
