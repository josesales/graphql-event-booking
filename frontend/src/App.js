import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';
import MainNavigation from './components/navigation/main-navigation.component';
import AuthPage from './pages/auth.page';
import BookingPage from './pages/booking.page';
import EventsPage from './pages/events.page';

function App() {
  return (
    <BrowserRouter>
      <MainNavigation />
      <main className="main-content">
        <Switch>
          <Redirect from="/" to="/auth" exact />
          <Route path="/auth" component={AuthPage} />
          <Route path="/events" component={EventsPage} />
          <Route path="/booking" component={BookingPage} />
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;
