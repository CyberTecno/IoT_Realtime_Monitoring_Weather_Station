import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Summary from './pages/Summary';
import DeepDive from './pages/DeepDive';
import Interests from './pages/Interests';
import Developer from './pages/Developer';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Summary />} />
        <Route path="/deep-dive" element={<DeepDive />} />
        <Route path="/interests" element={<Interests />} />
        <Route path="/developer" element={<Developer />} />
      </Routes>
    </Layout>
  );
}

export default App;
