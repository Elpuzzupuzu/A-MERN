
import './App.css';
import AdminLayout from './components/admin-view/layout';
import AuthLayout from './components/auth/layout';
import ShoppingLayout from './components/shopping-view/layout';
import AdminDashboard from './pages/admin-view/dashboard';
import AdminFeatures from './pages/admin-view/features';
import AdminOrders from './pages/admin-view/order';
import AdminProducts from './pages/admin-view/products';
import AuthLogin from './pages/auth/login';
import AutRegister from './pages/auth/register';
import { Routes, Route } from 'react-router-dom'; // Importa Routes y Route
import NotFound from './pages/not-found';
import ShoppingHome from './pages/shopping-view/home';
import ShoppingListing from './pages/shopping-view/listing';
import ShoppingCheckout from './pages/shopping-view/checkout';
import ShoppingAccount from './pages/shopping-view/account';

function App() {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
     
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AutRegister />} />
        </Route>
        <Route path="/admin" element={<AdminLayout/>}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures/>} />
        </Route>

        <Route path="/shop" element={<ShoppingLayout/>}>
        
         <Route path="home" element={<ShoppingHome />} /> 
         <Route path="listing" element={<ShoppingListing/>} />
         <Route path="checkout" element={<ShoppingCheckout/>} />
         <Route path="account" element={<ShoppingAccount/>} />
        
        
        
        </Route>

        <Route path="*" element={<NotFound/>} />






      </Routes>
    </div>
  );
}

export default App;


