import { useSelector } from 'react-redux';
import './App.css';
import { FriendList, Home } from './pages';
import { Register } from './pages';
import { Profile } from './pages';
import { Login } from './pages';
import { ResetPassword } from './pages';
import { Outlet, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { Search } from './pages/Search';
import { CreatePost } from './pages';


function Layout() {
  const { user } = useSelector(state => state.user);
  const loaction = useLocation();

  return user?.token ? (<Outlet />) : (
    <Navigate to="/login" state={{ from: loaction }} replace />
  )
}

function App() {

  const { theme } = useSelector((state) => state.theme);

  return (

    <div data-theme={theme} className="w-full min-h-[100vh]">
      <Routes>
        <Route element={<Layout />} >
          <Route path="/" element={<Home />} />
          <Route path="/profile/:id?" element={<Profile />} />
          <Route path="/friends" element={<FriendList />} />
          <Route path='/search' element={<Search />} />
          <Route path='/create-post' element={<CreatePost />} />
        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />

      </Routes>

    </div>
  );
}

export default App;
