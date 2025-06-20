import React, { useState } from 'react';
import Layout from './components/layout/Layout';
import InfrastructureVulnerabilityPage from './pages/InfrastructureVulnerabilityPage';
import Dashboard from './pages/Dashboard';
import AdminPage from './pages/AdminPage';
import JiraDataPage from './pages/JiraDataPage';
import ThirdPartyConfigPage from './pages/ThirdPartyConfigPage';
import MainDashboard from './pages/MainDashboard';

function App() {
  const [currentPage, setCurrentPage] = useState('infrastructure-vulnerability');

  const renderPage = () => {
    switch (currentPage) {
      case 'infrastructure-vulnerability':
        return <InfrastructureVulnerabilityPage />;
      case 'dashboard':
        return <MainDashboard />;
      case 'admin':
        return <AdminPage />;
      case 'jira':
        return <JiraDataPage />;
      case 'integrations':
        return <ThirdPartyConfigPage />;
      default:
        return <InfrastructureVulnerabilityPage />;
    }
  };

  return (
    <Layout currentPage={currentPage} setCurrentPage={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
}

export default App;