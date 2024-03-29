import logo from './logo.svg';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.css';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import CommingSoon from './CommingSoon';
import Header from './Header';
import Search  from './Search'
import Premium from './Premium';
import SeeAll from './SeeAll';
import { Navigate, BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { useUser } from './UserProvider';
import Liked from './Liked';

function ProtectedRoute({ children }) {
  const { getUser } = useUser();
  if (getUser && getUser.status == "success") {
    return children;
  }
  else {
    return <Navigate to={"/login"} />
  }
}

function App() {

  axios.interceptors.request.use(async (config) => {
    config.headers['projectid'] = "f104bi07c490";
    return config;
  })

  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search" element={<Search />} />
          <Route path="/liked" element={<ProtectedRoute>
            <Liked />
          </ProtectedRoute>} />
          <Route path="/premium" element={<Premium />} />
          <Route path='/commingSoon' element={<CommingSoon/>} />
          <Route path="/:filterValue" element= {<SeeAll/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
