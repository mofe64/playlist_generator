import './App.css';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/home';
import Playlist from './pages/playlist';

function App() {
  return (
    <>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/:mood' component = {Playlist} />
      </Switch>
    </>
  );
}

export default App;
