import { Route, Routes } from 'react-router';
import { Homepage } from './components/pages/homepage';
import Register from './components/pages/register';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Homepage />} />
        {/* <Route path='/login' element={<Login />} /> */}
        <Route path='/register' element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
