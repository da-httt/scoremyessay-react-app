import React from "react";
import { Redirect, Route, withRouter } from "react-router-dom";
import { getRoleID, getToken } from "./Common";

const PublicRoute = ({ component: Component, ...rest}) => {

    return(
        <Route
        {...rest}
        render={props => {
            if(!getToken())
                return <Component { ...props} />;
            else{
                console.log("PublicRoute");
                const role = getRoleID();
                console.log("return function");
                console.log(role);
                if (role === '1') return <Redirect to='/HomeStudentPage'/>;
                else if (role === '2') return <Redirect to='/HomeTeacherPage'/>;
                else if (role === '0') return <Redirect to='/HomeStudentPage'/>;
            }
        }}
        />
    )
}
export default withRouter(PublicRoute);
