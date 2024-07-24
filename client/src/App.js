import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EditorPage from './pages/EditorPage';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Router>
      <Toaster />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/editor/:roomId' element={<EditorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
