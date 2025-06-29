import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/organisms/navbar';


import WarDetail from './pages/war-detail'
import Wars from './pages/wars';
import Companies from './pages/companies';
import Players from './pages/players';
import NotFound from './pages/notfound';
import Home from './pages/home';
import CompanyDetail from './pages/company-detail';

const App: React.FC = () => {
  return (

    <HashRouter>
      <div className="flex flex-col h-screen">
        <Navbar />
        <main className="flex-grow  pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/players" element={<Players />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/companies/:companyName" element={<CompanyDetail />} />
            <Route path="/wars" element={<Wars />} />
            <Route path="/wars/:warId" element={<WarDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </HashRouter >

  );
};

export default App;
