import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './pages/home';
import Redirect from './pages/redirect';

function App() {
  return (
      <Router>
       <div className="App">
          <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/:id" element={<Redirect />} />
          </Routes>
        </div>
      </Router>

  );
}

export default App;
