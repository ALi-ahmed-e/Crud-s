
import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import AddTask from './components/AddTask/AddTask';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import useRefreshUser from './components/RefreshUser/RefreshUser';
import Settings from './components/Settings/Settings';
import Sign from './components/Sign/Sign';

function App() {
  const user = useSelector(state => state.Auth.User)
  const theme = useSelector(state => state.Theme.theme)
  const Addcomponent = useSelector(state => state.Add.buttonShow)
  const [AppTheme, setAppTheme] = useState();
  useEffect(() => {

    switch (theme) {
      case 'light':
        document.body.style.backgroundColor = "rgb(226 232 240)"
        setAppTheme('')
        break;
      case 'dark':
        setAppTheme('dark')
        document.body.style.backgroundColor = "rgb(32 48 73)"

        break;
      case 'system':

        if (window.matchMedia('(prefers-color-scheme:dark)').matches) {
          document.body.style.backgroundColor = "rgb(32 48 73)"
          setAppTheme('dark')

        }
        else {
          document.body.style.backgroundColor = "rgb(226 232 240)"
          setAppTheme('')
        }
        break;

      default:
        if (window.matchMedia('(prefers-color-scheme:dark)').matches) {
          document.body.style.backgroundColor = "rgb(32 48 73)"
          setAppTheme('dark')

        } else {
          document.body.style.backgroundColor = "rgb(226 232 240)"
          setAppTheme('')
        }
        break;

    }


  }, [theme]);
const [refreshUser] = useRefreshUser()
 


  useLayoutEffect(() => {
    refreshUser()
  }, [])

  const AuthCheck = ({ children }) => {

    return user != '' ? (children) : <Navigate to='/sign' />
  }
  const NonAuthCheck = ({ children }) => {
    return user != '' ? <Navigate to='/' /> : (children)
  }





  return (
    <div className={`App ${AppTheme}`}>




      <BrowserRouter>
        {user != '' && <Header />}
        {Addcomponent != false && <AddTask />}
        <div className='  pt-14 '>
          <Routes>

            <Route path='/' element={<AuthCheck><Home /></AuthCheck>} />
            <Route path='/settings' element={<AuthCheck><Settings /></AuthCheck>} />
            <Route path='/sign' element={<NonAuthCheck><Sign /></NonAuthCheck>} />

          </Routes>
        </div>
      </BrowserRouter>






    </div>
  );
}

export default App;
