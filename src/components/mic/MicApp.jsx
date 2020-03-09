import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import AuthenticatedRoute from "./AuthenticatedRoute";
import LoginComponent from "./LoginComponent";
import Dashboard from "./dashboard/DashboardComponent";
import LogoutComponent from "./LogoutComponent";
import TodoComponent from "./util/TodoComponent";
import {CssBaseline} from "@material-ui/core";
import Scan from "./ScanComponent";
import InventoryCountComponent from "./InventoryCountComponent";

class MicApp extends Component {
    render = () => {
        return (
            <Router>
                <CssBaseline/>
                <Switch>
                    <Route path="/" exact component={LoginComponent}/>
                    <Route path="/login" component={LoginComponent}/>
                    <AuthenticatedRoute path="/logout" component={LogoutComponent}/>
                    <AuthenticatedRoute path="/welcome" component={Dashboard}/>
                    <AuthenticatedRoute path="/welcome/:name" component={Dashboard}/>
                    <AuthenticatedRoute path="/todos/:id" component={TodoComponent}/>
                    <AuthenticatedRoute path="/scan" component={Scan}/>
                    <AuthenticatedRoute path="/inventory" component={InventoryCountComponent}/>
                    <Route component={ErrorComponent}/>
                </Switch>

            </Router>
        );
    }
}


/*function ShowInvalidCredentials(props) {
    if (props.hasLoginFailed) {
        return <div>Invalid Credentials</div>;
    } else if (props.showSuccessMessage) {
        return <div>Login Successful</div>;
    } else {
        return null;
    }
}*/

export function ErrorComponent() {
    return <div>An error bla bla bla</div>;
}

export default MicApp;
