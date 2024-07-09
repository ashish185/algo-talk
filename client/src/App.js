import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Editor from './pages/Editor';

function App() {
  return (
    // <h1>hi</h1>
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/editor' element={<Editor />} />
    </Routes>
  );
}

export default App;
