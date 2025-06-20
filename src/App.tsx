import React, { useState } from 'react';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import AdminPage from './pages/AdminPage';
import JiraDataPage from './pages/JiraDataPage';
import ThirdPartyConfigPage from './pages/ThirdPartyConfigPage';
import MainDashboard from './pages/MainDashboard';
import InfrastructureVulnerabilityPage from './pages/InfrastructureVulnerabilityPage';

function App() {
  const [currentPage, setCurrentPage] = useState('infrastructure-vulnerability');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <InfrastructureVulnerabilityPage />;
      case 'admin':
        return <AdminPage />;
      case 'jira':
        return <JiraDataPage />;
      case 'integrations':
        return <ThirdPartyConfigPage />;
      default:
        return <MainDashboard />;
    }
  };

  return (
    <Layout currentPage={currentPage} setCurrentPage={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
}

export default App;