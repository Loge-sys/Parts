import { BrowserRouter,Switch, Route } from 'react-router-dom'
import React from 'react';
import LandingPage from '~/components/LandingPage';
import UserLogin from '~/components/pages/UserLogin';
import ListAccounts from '~/components/pages/ListAccounts';
import ListProducts from '~/components/pages/ListProducts';

export default function routes() {
  return (
    <BrowserRouter>
    <Switch>
      <Route path="/" exact={true} component={LandingPage} />
      <Route path="/users/login" exact={true} component={UserLogin} />
      <Route path="/users/list" exact={true} component={ListAccounts} />
      <Route path="/products/list" exact={true} component={ListProducts} />







    </Switch>
    </BrowserRouter>
  );
}
