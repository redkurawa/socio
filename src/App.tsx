import { Route, Routes, useLocation } from 'react-router';
import PostForm from './components/pages/add-post2';
import EditProfile from './components/pages/edit-profile';
import Login from './components/pages/login';
import { PostDetail } from './components/pages/post-detail';
import Register from './components/pages/register';
import { Timeline } from './components/pages/timeline';
import { UserSearch } from './components/pages/user-search';
import { Toaster } from './components/ui/sonner';

function App() {
  const location = useLocation();

  const noMaxWidthRoutes = ['/register', '/login'];
  const isNoMaxWidth = noMaxWidthRoutes.includes(location.pathname);
  return (
    <>
      <div className={`mx-auto ${isNoMaxWidth ? '' : 'max-w-360'}`}>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/addpost' element={<PostForm />} />
          <Route path='/user-search' element={<UserSearch />} />
          <Route path='/timeline' element={<Timeline />} />
          <Route path='/posts/:id' element={<PostDetail />} />
          <Route path='/profile' element={<EditProfile />} />
        </Routes>
      </div>
      <Toaster position='top-center' richColors />
    </>
  );
}

export default App;
