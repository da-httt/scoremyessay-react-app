import React from 'react';
import { withRouter } from 'react-router-dom';

import { getRoleID, getToken } from '../../Utils/Common';

import AdminPage from "./AdminPage"
import Login from "./Login"


const Admin = (props) => {

    console.log("admin page")
    console.log(getRoleID() === '0')
    return (
            (getToken() && getRoleID() ==='0')? <AdminPage />
            : <Login history={props.history}/>
    )
};


export default withRouter(Admin);