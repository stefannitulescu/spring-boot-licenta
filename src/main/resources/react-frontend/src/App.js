import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './components/LoginPage';
import Register from './components/RegisterPage';
import Landing from './pages/LandingPage';
import ProductsComponent from './components/ProductsComponent';
import FilterSidebar from './components/FilterSidebar';
import './styles/App.css';

function App() {
  const isAdmin = true;

  const [filters, setFilters] = useState({});

  const handleSortChange = (sortOrder) => {
    setFilters((prev) => ({ ...prev, sortOrder }));
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="App">
      <Router>
        <Navbar isAdmin={isAdmin} />
        <div className="content-area">
          <FilterSidebar onSortChange={handleSortChange} onFilterChange={handleFilterChange} />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/home" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/products" component={ProductsComponent} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
