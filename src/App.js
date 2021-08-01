import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Layout from './components/Layout';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Switch>
          <Route exact path='/' component={Landing} />
          <Layout>
            <Route exact path='/home' component={Home} />
            <Route exact path='/profile' component={Profile} />
          </Layout>
        </Switch>
      </Router>
    </ChakraProvider>
  );
}

export default App;
