import './App.css';
import LoginForm from './components/LoginForm/LoginForm';
import Dummy from './components/Dummy/Dummy';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {    
  return (
    <Router>
      <div className='layout'>
        <div className='header'>
          <h1 style={{'color': 'white'}}>I am a big header</h1>
        </div>
        <div className='body'>
          <Routes>
            <Route path='/' element={<LoginForm />} />
            <Route path='test' element={<Dummy dummyprop='dummyvalue' />} />
          </Routes>
        </div>
        <div className='nav'>Dummy text</div>
      </div>
    </Router>
  );
}

export default App;