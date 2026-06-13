import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './components/Layout/DashboardLayout';
import CharactersPage from './pages/CharactersPage';
import CharacterDetailPage from './pages/CharacterDetailPage';
import StatusPage from './pages/StatusPage';
import LibraryPage from './pages/LibraryPage';
import BoardPage from './pages/BoardPage';
import PlotPage from './pages/PlotPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/characters" replace />} />
          <Route path="characters" element={<CharactersPage />} />
          <Route path="characters/:id" element={<CharacterDetailPage />} />
          <Route path="status" element={<StatusPage />} />
          <Route path="library" element={<LibraryPage />} />
          <Route path="board" element={<BoardPage />} />
          <Route path="plot" element={<PlotPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
