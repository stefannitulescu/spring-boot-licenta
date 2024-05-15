import logo from './logo.svg';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './styles/App.css';
import Home from './pages/Home';
import Login from './components/LoginPage';
import Register from './components/RegisterPage';
import Landing from './pages/LandingPage';
import Navbar from './components/Navbar';
import ProductsComponent from './components/ProductsComponent';


function App() {
  const isAdmin = true;

  return (
    <div className="App">
 <Router>
   <Navbar isAdmin={isAdmin} />
   <Switch>
        <Route exact path="/home"><Home /></Route>
        <Route exact path="/login"><Login /></Route>
        <Route exact path="/register"><Register /></Route>
        <Route exact path="/"><Landing /></Route>
        <Route exact path="/products" component={ProductsComponent} /> {/* New Route */}
   </Switch>
 </Router>
    </div>
  );
}

export default App;