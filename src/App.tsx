import { Route, Routes, useLocation } from 'react-router';
import { Homepage } from './components/pages/homepage';
import Register from './components/pages/register';
import { Toaster } from './components/ui/sonner';
import Login from './components/pages/login';
import AddPost from './components/pages/add-post';
import { UserSearch } from './components/pages/user-search';
import { Timeline } from './components/pages/timeline';

function App() {
  const location = useLocation();

  // Daftar route yang tidak memakai max-w-360
  const noMaxWidthRoutes = ['/register', '/login'];
  const isNoMaxWidth = noMaxWidthRoutes.includes(location.pathname);
  return (
    <>
      <div className={`mx-auto ${isNoMaxWidth ? '' : 'max-w-360'}`}>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/addpost' element={<AddPost />} />
          <Route path='/user-search' element={<UserSearch />} />
          <Route path='/timeline' element={<Timeline />} />
        </Routes>
      </div>
      <Toaster position='top-center' richColors />
    </>
  );
}

export default App;
