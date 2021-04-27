import axios from "axios";

export const getBaseURL = () =>{
    return axios.create({
        baseURL: 'http://da95727dd6d8.ngrok.io/'
    })
}

export const getUser = () =>{
    const userStr = sessionStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    else return null;
}

export const getToken = () =>{
    return sessionStorage.getItem('token') || null;
}

export const getTokenType = () =>{
    return sessionStorage.getItem('type') || null;
}

export const setUserSession = (token,type) =>{
    //sessionStorage.setItem("user", JSON.stringify(user));
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("type", type);
    
}

export const removeUserSession = () =>{
   // sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
}

const api = getBaseURL();
export const setRoleID = () => {
    api.get('/accounts/me',{
        headers: {Authorization: getTokenType() + ' ' + getToken()}
      }).then(response => {
          console.log(response.data.role_id);
          sessionStorage.setItem("roleID", response.data.role_id);
        
    }) 
}

export const getRoleID = () => {
    return sessionStorage.getItem('roleID') || null;
}