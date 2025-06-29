import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/organisms/navbar';


import WarDetail from './pages/war-detail'

const App: React.FC = () => {
  return (

    <HashRouter>
      <div className="flex flex-col h-screen">
        <Navbar />
        <main className="flex-grow  pt-16">
          <Routes>


            <Route path="/wars/:warId" element={<WarDetail />} />


          </Routes>
        </main>
      </div>
    </HashRouter>

  );
};

export default App;
