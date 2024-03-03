
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Index from './modules/common/index';
import './globalStyles.css'; 
import Auth from "./modules/common/auth/auth";
import Dashboard from "./modules/users/pages/dashboard/dashboard";
import Profile from "./modules/users/pages/profile/profile";
import AdminDashboard from "./modules/admin/pages/DashBoard/Dashboard";
import TurfDetails from "./modules/users/turfDetails/TurfDetails";
import SuccessPage from "./modules/users/paymentSuccess/SuccessPage";

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
      
      <Route path="/" element={<Index/>}/>
      <Route path="/auth" element={<Auth/>}/>
      <Route path="/dashboard/:userid" element={<Dashboard/>}/>
      <Route path="/profile/:userid" element={<Profile/>}/>
      <Route path="/adminDash" element={<AdminDashboard/>}/>
      <Route path="/success/:userId" element={<SuccessPage/>}/>
      <Route path="/turfDetails/:userId/:id" element={<TurfDetails/>}/>

    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
