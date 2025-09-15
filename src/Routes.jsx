import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import UserLogin from './pages/user-login';
import RetailerStockManagement from './pages/retailer-stock-management';
import FarmerDashboard from './pages/farmer-dashboard';
import LandingPage from './pages/landing-page';
import UserRegistration from './pages/user-registration';
import ConsumerVerification from './pages/consumer-verification';
import DistributorDashboard from './pages/distributor-dashboard';
import ConsumerDashboard from "./pages/consumer-dashboard";
import AdminControl from "./pages/admin-control";

// Farmer Dashboard Pages
import FarmerProducts from "./pages/farmer-products";
import FarmerHarvest from "pages/farmer-harvest";
import FarmerEarnings from "pages/farmer-earnings";
import FarmerProfile from "pages/farmer-profile";
import ConsumerHistory from "pages/consumer-history";
import ConsumerFavorites from "pages/consumer-favorites";
import DistributorShipments from "pages/distributor-shipments";
import DistributorScan from "pages/distributor-scan";
import DistributorRoutes from "pages/distributor-routes";
import AdminUsers from "pages/admin-users";
import AdminAnalytics from "pages/admin-analytics";
import AdminCompliance from "pages/admin-compliance";
import AdminDashboard from "pages/admin-dashboard";
import RetailerVerify from "pages/retailer-verify";
import RetailerReports from "pages/retailer-reports";
import RetailerDashboard from "pages/retailer-dashboard";
import RetailerProfile from "pages/retailer-profile";
import { ConstructionIcon } from "lucide-react";
import ConsumerProfile from "pages/consumer-profile";
import DistributorProfile from "pages/distributor-profile";
import AdminSettings from "pages/admin-settings";

// Consumer Dashboard Pages


// Distributor Dashboard Pages


// Admin Control Pages


const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<ConsumerVerification />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/retailer-stock-management" element={<RetailerStockManagement />} />
        <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/user-registration" element={<UserRegistration />} />
        <Route path="/consumer-verification" element={<ConsumerVerification />} />
        <Route path="/distributor-dashboard" element={<DistributorDashboard />} />
        <Route path="/consumer-dashboard" element={<ConsumerDashboard/>}/>
        <Route path="/admin-control" element={<AdminControl/>}/>

        {/* Retailer Dashboard Pages */}
        <Route path="/retailer-dashboard" element={<RetailerDashboard/>}/>
        <Route path="/retailer-verify" element={<RetailerVerify/>}/>
        <Route path="/retailer-reports" element={<RetailerReports/>}/>
        <Route path="/retailer-profile" element={<RetailerProfile/>}/>

        {/* Farmer Dashboard Pages */}
        <Route path="/farmer-products" element={<FarmerProducts />} />
        <Route path="/farmer-harvest" element={<FarmerHarvest/>}/>
        <Route path="/farmer-earnings" element={<FarmerEarnings/>}/>
        <Route path="/farmer-profile" element={<FarmerProfile/>}/>

        {/* Consumer Dashboard Pages */}
        <Route path="/consumer-history" element={<ConsumerHistory />}/>
        <Route path="/consumer-favorites" element={<ConsumerFavorites/>}/>
        <Route path="/consumer-profile" element={<ConsumerProfile/>}/>
        {/* Distributor Dashboard Pages */}
        <Route path="/distributor-shipments" element={<DistributorShipments/>} />
        <Route path="/distributor-scan" element={<DistributorScan/>}/>
        <Route path="/distributor-routes" element={<DistributorRoutes/>}/>
        <Route path="/distributor-profile" element={<DistributorProfile/>}/>


        {/* Admin Control Pages */}
        <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
        <Route path="/admin-users" element={<AdminUsers/>}/>
        <Route path="/admin-analytics" element={<AdminAnalytics/>}/>
        <Route path="/admin-compliance" element={<AdminCompliance/>}/>
        <Route path="/admin-settings" element={<AdminSettings/>}/>

        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;