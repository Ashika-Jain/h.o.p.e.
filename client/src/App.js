import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import FrontPage from './components/FrontPage/FrontPage';
import Auth from './components/Auth/Auth';

const App = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Switch>
                <Route path="/" component={FrontPage} exact />
                <Route path="/auth" component={Auth} exact />
            </Switch>
        </BrowserRouter>
    )
}

export default App;