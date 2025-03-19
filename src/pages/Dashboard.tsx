
import { Routes, Route } from "react-router-dom";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import DashboardTools from "./DashboardTools";
import DashboardBlogs from "./DashboardBlogs";
import DashboardProfile from "./DashboardProfile";
import DashboardSettings from "./DashboardSettings";
import DashboardMessages from "./DashboardMessages";
import { useAuth } from "@/hooks/useAuth";

const Dashboard = () => {
  const { isLoading } = useAuth();
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route index element={<DashboardOverview />} />
      <Route path="tools" element={<DashboardTools />} />
      <Route path="blogs" element={<DashboardBlogs />} />
      <Route path="messages" element={<DashboardMessages />} />
      <Route path="profile" element={<DashboardProfile />} />
      <Route path="settings" element={<DashboardSettings />} />
    </Routes>
  );
};

export default Dashboard;
