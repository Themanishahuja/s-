import React, { useState } from 'react';
import Layout from './components/layout/Layout';
import RolesPage from './pages/RolesPage';
import AddRolePage from './pages/AddRolePage';
import InfrastructureVulnerabilityPage from './pages/InfrastructureVulnerabilityPage';
import Dashboard from './pages/Dashboard';
import AdminPage from './pages/AdminPage';
import JiraDataPage from './pages/JiraDataPage';
import ThirdPartyConfigPage from './pages/ThirdPartyConfigPage';
import MainDashboard from './pages/MainDashboard';

function App() {
  const [currentPage, setCurrentPage] = useState('AddRolePage');
  const [showAddRole, setShowAddRole] = useState(false);

  const renderPage = () => {
    if (currentPage === 'roles' && showAddRole) {
      return <AddRolePage onBack={() => setShowAddRole(false)} />;
    }

    switch (currentPage) {
      case 'roles':
        return <RolesPage onAddRole={() => setShowAddRole(true)} />;
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
        return <RolesPage onAddRole={() => setShowAddRole(true)} />;
    }
  };

  // Don't show layout for Add Role page
  if (currentPage === 'roles' && showAddRole) {
    return renderPage();
  }

  return (
    <Layout currentPage={currentPage} setCurrentPage={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
}

export default App;