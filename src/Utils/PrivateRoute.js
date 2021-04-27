import React from "react";
import { Redirect, Route, withRouter } from "react-router-dom";
import { getToken } from "./Common";

const PrivateRoute = ({ component: Component, ...rest}) => {
    return(
        <Route
        {...rest}
        render={props => {
            return getToken() ? <Component { ...props} />
            : <Redirect to={{pathname: "/Home", state: {from: props.location}}}/>
        }}
        />
    )
}
export default withRouter(PrivateRoute);
