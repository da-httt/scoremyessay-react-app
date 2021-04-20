import React, { Component } from 'react';
import {Switch, Route, Redirect } from 'react-router-dom'
import AboutUs from './AboutUsComponent';
import HomePage from './HomePageComponent';
import TeaRegister from './Register/TeaRegisterComponent';
import StuRegister from './Register/StuRegisterComponent';
import HomeStudent from './StudentPage/HomePageStu';
import AddNewWriting from './StudentPage/AddWriting';
import DetailWriting from './StudentPage/DetailWriting';

class Main extends Component{

    render(){
        return(
            <div>
                <Switch>
                    <Route path="/Home" component={() =><HomePage/>}/>
                    <Route exact path="/AboutUs" component={() =><AboutUs/>}/>
                    <Route exact path="/RegisterforTeacher" component={() =><TeaRegister/>}/>
                    <Route exact path="/RegisterforStudent" component={() =><StuRegister/>}/>
                    <Route exact path="/HomeStudentPage" component={() => <HomeStudent/>}/>
                    <Route exact path="/HomeStudentPage/AddNewWriting" component={() => <AddNewWriting/>}/>
                    <Route exact path="/HomeStudentPage/DetailWriting" component={() => <DetailWriting/>}/>
                    <Redirect to="/Home"/>
                </Switch>
            </div>
        );
    }
}
export default Main;