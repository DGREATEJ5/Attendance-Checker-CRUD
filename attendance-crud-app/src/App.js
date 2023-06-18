import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Home from './pages/Home'
import AddEdit from './pages/AddEdit'
import View from './pages/View'

function App() {
  return ( 
    <BrowserRouter>
      <div className="App">
      <h1>ATTENDANCE CHECKER</h1>
      <ToastContainer position='top-center'/>
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route path='/addStudent' element={<AddEdit/>} />
        <Route path='/update/:number' element={<AddEdit/>} />
        {/* <Route path='/view/:number' element={<View/>} /> */}
      </Routes>
      
    `</div>
    </BrowserRouter>
    
  );
}

export default App;
