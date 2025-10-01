import { Route, Routes, useLocation } from 'react-router';
import { Homepage } from './components/pages/homepage';
import Register from './components/pages/register';
import { Toaster } from './components/ui/sonner';
import Login from './components/pages/login';

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
        </Routes>
      </div>
      <Toaster position='top-center' richColors />
    </>
  );
}

export default App;
