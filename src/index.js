import React from 'react';
import ReactDOM from 'react-dom';

import {
    BrowserRouter, Switch,
    Route, Redirect, Link
} from "react-router-dom";

import Urls from "./containers/urls.container";
import Url from "./containers/url.container";
import UrlRouter from "./containers/urlRouter.container";



ReactDOM.render(

        <BrowserRouter>
            <Link to={'/urls'}>Back</Link>
            <Switch>
                <Route path="/urls" component={Urls}/>
                <Route exact path={"/url/:shortUrl"} component={UrlRouter}/>
                <Route path={"/url/:shortUrl/edit"} component={Url}/>

                <Redirect exact from="/" to="urls"/>
            </Switch>
        </BrowserRouter>
,

    document.getElementById('root')
);