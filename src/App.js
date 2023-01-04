import FeedPage from './pages/Feed';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={FeedPage} />
      </Switch>
    </Router>
  );
}

export default App;
