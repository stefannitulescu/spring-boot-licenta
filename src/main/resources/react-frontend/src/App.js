import logo from './logo.svg';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './styles/App.css';
import Home from './pages/Home';
import Login from './components/LoginPage';
import Register from './components/RegisterPage';

function App() {
  return (
    <div className="App">
 <Router>
   <Switch>
        <Route exact path="/"><Home /></Route>
        <Route exact path="/login"><Login /></Route>
        <Route exact path="/register"><Register /></Route>
   </Switch>
 </Router>
    </div>
  );
}

export default App;