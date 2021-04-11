import React, { Component } from 'react';
import {Switch, Route, Redirect } from 'react-router-dom'
import Footer from './FooterComponent';
import Header from './HeaderComponent';
import IntroVideo from './HomePage/IntroVideo';
import HomePage from './HomePageComponent';
import TeaRegister from './Register/TeaRegisterComponent';

class Main extends Component{

    render(){
        return(
            <div>
                <Header/>
                <Switch>
                    <Route path="/Home" component={() =><HomePage/>}/>
                    <Route exact path="/AboutUs" component={() =><IntroVideo/>}/>
                    <Route exact path="/RegisterforTeacher" component={() =><TeaRegister/>}/>
                    <Redirect to="/Home"/>
                </Switch>
                <Footer/>
            </div>
        );
    }
}
export default Main;