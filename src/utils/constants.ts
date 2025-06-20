import { 
  Shield, Database, Activity, 
  AlertCircle, Scan, ClipboardList, 
  UserCog, PieChart, Factory, BarChart3, Server 
} from 'lucide-react';

export const dashboardCards = [
  {
    title: 'Asset Inventory',
    icon: Database,
    bgColor: 'from-rose-400/70 to-rose-600/70'
  },
  {
    title: 'TVM',
    icon: Shield,
    bgColor: 'from-orange-400/70 to-orange-600/70'
  },
  {
    title: 'ASM',
    icon: Scan,
    bgColor: 'from-cyan-400/70 to-cyan-600/70'
  },
  {
    title: 'AI-VA',
    icon: Activity,
    bgColor: 'from-pink-400/70 to-pink-600/70'
  },
  
  {
    title: 'GRC',
    icon: ClipboardList,
    bgColor: 'from-amber-400/70 to-amber-600/70'
  },
  {
    title: 'TPRM',
    icon: BarChart3,
    bgColor: 'from-emerald-400/70 to-emerald-600/70'
  },
  {
    title: 'Remediation Factory',
    icon: Factory,
    bgColor: 'from-purple-400/70 to-purple-600/70'
  },
  {
    title: 'Reports',
    icon: PieChart,
    bgColor: 'from-blue-400/70 to-blue-600/70'
  },
  {
    title: 'Administration',
    icon: UserCog,
    bgColor: 'from-yellow-400/70 to-yellow-600/70',
    path: '/admin'
  }
];

export const navItems = [
  { title: 'Dashboard', path: '/' },
  { title: 'Infrastructure Vulnerability', path: '/infrastructure-vulnerability' },
  { title: 'Analytics', path: '/analytics' },
  { title: 'Alerts', path: '/alerts' },
  { title: 'Settings', path: '/settings' }
];