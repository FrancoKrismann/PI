import './App.css';
import {Switch, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Home from "./pages/Home"
function App() {
  return (
    <div>
    <Switch>
      <Route exact path="/home"> <Home/>  </Route>
      <Route exact path="/"><Landing/> </Route>
    </Switch>
      
    </div>
    
  );
}

export default App;