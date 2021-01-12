import React, { useState } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';
import MainNavigation from './components/navigation/main-navigation.component';
import AuthPage from './pages/auth.page';
import BookingPage from './pages/booking.page';
import EventsPage from './pages/events.page';
import { AuthProvider, initialContext } from './context/auth-context';

const App = () => {

  const [authContext, setAuthContext] = useState(initialContext);

  const login = (userData) => {
    setAuthContext(userData);
  }

  const logout = () => {
    setAuthContext(initialContext);
  }

  return (
    <BrowserRouter>
      <React.Fragment>
        <AuthProvider value={{ authContext, login, logout }}>
          <MainNavigation />
          <main className="main-content">

            <Switch>

              {
                authContext.token ? <Redirect from="/" to="/events" exact /> : <Redirect from="/" to="/auth" exact />
              }

              {
                authContext.token ? <Redirect from="/auth" to="/events" exact /> : <Route path="/auth" component={AuthPage} />
              }

              {
                authContext.token ? <Route path="/booking" component={BookingPage} /> : <Redirect from="/booking" to="/auth" exact />
              }

              <Route path="/events" component={EventsPage} />

            </Switch>
          </main>
        </AuthProvider>
      </React.Fragment>
    </BrowserRouter>
  );

}

export default App;
