import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Sign from './components/Sign/Sign';

function App() {
  const user = useSelector(state => state.Auth.User)



  const AuthCheck = ({ children }) => {

    return user != '' ? (children) : <Navigate to='/sign' />
  }
  const NonAuthCheck = ({ children }) => {
    return user != '' ? <Navigate to='/' /> : (children)
  }





  return (
    <div className="App dark">


      {user!= ''&&<Header />}
      <div className='  pt-14 '>
        <BrowserRouter>
          <Routes>

            <Route path='/' element={<AuthCheck><Home /></AuthCheck>} />
            <Route path='/sign' element={<NonAuthCheck><Sign /></NonAuthCheck>} />
          </Routes>
        </BrowserRouter>
      </div>





    </div>
  );
}

export default App;
