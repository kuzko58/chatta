import Home from './container/Home';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import { BrowserRouter, Route } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <Route path="/login" component={LoginForm} />
      <Route path="/signup" component={SignUpForm} />
      <Route exact path="/" component={Home} />
    </BrowserRouter>
  )
}

export default App;
