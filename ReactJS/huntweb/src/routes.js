import React from 'react';

import {BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/main';
import Product from './pages/product';

// Switch serve para permitir apenas 1 rota ser chamada ao mesmo tempo
// 'exact' serve para verificar se o path é exatamente o especificado
const Routes = () => (
    <BrowserRouter>

        <Switch>
            <Route exact path="/" component={Main}/>
            <Route path="/products/:id" component={Product}/>
        </Switch>
    </BrowserRouter>
)

export default Routes;