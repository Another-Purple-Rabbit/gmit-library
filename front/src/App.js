import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import store from './store';
import { checkSession, userLogout } from './components/LoginForm/usersSlice';

import LoginForm from './components/LoginForm/LoginForm';
import Dummy from './components/Dummy/Dummy';
import LanguageSelector from './components/LanguageSelector/LanguageSelector';

const sid = localStorage.getItem('sid')
if (sid) store.dispatch(checkSession(sid))

function App() {    
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userCollection);

  const handleLogoutClick = () => {
    localStorage.removeItem('sid');
    dispatch(userLogout());
  }
  
  return (
    <Router>
      <div className='layout'>
        <div className='header'>
          <h1 style={{'color': 'white'}}>I am a big header</h1>
          <LanguageSelector />
        </div>
        <div className='body'>
          <Routes>
            <Route path='/' element={<h1>hahahahahahaha</h1>} />
            <Route path='test' element={<Dummy dummyprop='dummyvalue' />} />
          </Routes>
        </div>
        <div className='nav'>
          {user.isAuthorised ? 
          <p>Hello, dear {user.name}! Wanna <span className='logout' onClick={handleLogoutClick}>logout</span>?</p> : 
          <LoginForm />}
        </div>
      </div>
    </Router>
  );
}

export default App;