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
                const role = getRoleID();
                if (role === '1') return <Redirect to='/HomeStudentPage'/>;
                else if (role === '2') return <Redirect to='/HomeTeacherPage'/>;
                else if (role === '0') return <Redirect to='/admin'/>;
            }
        }}
        />
    )
}
export default withRouter(PublicRoute);
