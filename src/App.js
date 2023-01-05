import FeedPage from './pages/Feed';
import NotFoundPage from './pages/NotFound';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={FeedPage} />
        <Route path='*' component={NotFoundPage} />
      </Switch>
    </Router>
  );
}

export default App;
