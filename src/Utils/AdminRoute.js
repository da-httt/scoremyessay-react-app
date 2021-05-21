import React from "react";
import {  Route, withRouter } from "react-router-dom";

const AdminRoute = ({ component: Component, ...rest}) => {
    return(
        <Route
        {...rest}
        render={props => {
            return <Component { ...props} />
        }}
        />
    )
}
export default withRouter(AdminRoute);
