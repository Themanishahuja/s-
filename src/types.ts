export interface DashboardCardProps {
  title: string;
  icon: React.ReactNode;
  bgColor: string;
  onClick?: () => void;
}

export interface NavItem {
  title: string;
  path: string;
}

export interface User {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  role: string;
  approvalStatus: string;
  status: string;
}