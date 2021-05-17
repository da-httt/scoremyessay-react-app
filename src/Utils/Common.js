import axios from "axios";

export const getBaseURL = () =>{
    return axios.create({
        baseURL: 'http://127.0.0.1:8000/'
    })
}

export const getUser = () =>{
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    else return null;
}

export const getToken = () =>{
    return localStorage.getItem('token') || null;
}

export const getTokenType = () =>{
    return localStorage.getItem('type') || null;
}

export const setUserSession = (token,type) =>{
    localStorage.setItem("token", token);
    localStorage.setItem("type", type);
    
}

export const removeUserSession = () =>{
    localStorage.removeItem("token");
}


export const getRoleID = () => {
    return localStorage.getItem('roleID') || null;
}