import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { SignUp, Login, Chats, Chat, Search } from './routers';


const App = () =>{
    return(
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Switch>
                <Route path="/signUp" component={SignUp} />
                <Route path="/login" component={Login} />
                <Route path="/chats" component={Chats} />
                <Route path="/chat/:id" component={Chat} />
                <Route path="/search" component={Search} />
                {/* <Route path="/modal" component={Modal} /> */}
                <Redirect to="/login"/>
            </Switch>
        </BrowserRouter>
    );
}


export default App;
