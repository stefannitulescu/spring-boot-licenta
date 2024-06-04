import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './components/LoginPage';
import Register from './components/RegisterPage';
import Landing from './pages/LandingPage';
import ProductDetails from './pages/ProductDetails';
import CartPage from './pages/CartPage';
import EditProduct from './pages/EditProduct';
import ProductsComponent from './components/ProductsComponent';
import FilterSidebar from './components/FilterSidebar';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import ManageProducts from './components/ManageProducts';
import ManageUsers from './components/ManageUsers';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import UserProfile from './pages/UserProfile';
import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [filters, setFilters] = useState({});

  const handleSortChange = (sortOrder) => {
    setFilters((prev) => ({ ...prev, sortOrder }));
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <AuthProvider>
      <MainApp 
        handleSortChange={handleSortChange} 
        handleFilterChange={handleFilterChange} 
        filters={filters} 
      />
    </AuthProvider>
  );
}

function MainApp({ handleSortChange, handleFilterChange, filters }) {
  const { isAdmin } = useAuth();

  return (
    <div className="App">
      <Router>
        <Navbar isAdmin={isAdmin} />
        <div className="content-area">
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/home" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <ProtectedRoute 
              exact path="/products"
              component={() => (
                <div className="products-page">
                  <FilterSidebar onSortChange={handleSortChange} onFilterChange={handleFilterChange} />
                  <ProductsComponent filters={filters} />
                </div>
              )} 
            />
            <ProtectedRoute path="/products/:id" component={ProductDetails} />
            <ProtectedRoute path="/cart" component={CartPage} />
            <AdminRoute path="/admin/products" exact component={ManageProducts} />
            <AdminRoute path="/admin/products/edit/:id" component={EditProduct} />
            <AdminRoute path="/admin/users" component={ManageUsers} />
            <Route path="/profile" component={UserProfile} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
