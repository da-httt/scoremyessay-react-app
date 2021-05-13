import React, { Component } from 'react';
import {Switch, Route, Redirect } from 'react-router-dom'
import AboutUs from './AboutUsComponent';
import HomePage from './HomePageComponent';
import TeaRegister from './Register/TeaRegisterComponent';
import StuRegister from './Register/StuRegisterComponent';
import HomeStudent from './StudentPage/HomePageStu';
import AddNewWriting from './StudentPage/AddWriting';
import DetailWriting from './StudentPage/DetailWriting';
import Test from './StudentPage/test';
import Cart from './StudentPage/Cart';
import HomeTeacher from './TeacherPage/HomePageTeacher';
import PublicRoute from '../Utils/PublicRoute';
import PrivateRoute from '../Utils/PrivateRoute';
import AddWritingT from './TeacherPage/AddWrittingT';
import DetailReq from './TeacherPage/DetailRequirements';
import ScoreEssay from './TeacherPage/ScoreEssay';
import PersonalInfo from './StudentPage/PersonalInfo';

class Main extends Component{

    render(){
        return(
            <div>
                <Switch>
                    <PublicRoute path="/Home" component={() =><HomePage/>} />
                    <Route exact path="/AboutUs" component={() =><AboutUs/>}/>
                    <Route exact path="/RegisterforTeacher" component={() =><TeaRegister/>}/>
                    <Route exact path="/RegisterforStudent" component={() =><StuRegister/>}/>
                    
                    <PrivateRoute exact path="/HomeStudentPage" component={() => <HomeStudent/>} />
                    <PrivateRoute  path="/HomeStudentPage/AddNewWriting" component={() => <AddNewWriting/>}/>
                    <PrivateRoute  path="/HomeStudentPage/DetailWriting" component={() => <DetailWriting/>}/>
                    <PrivateRoute exact path="/HomeStudentPage/Cart" component={() => <Cart/>}/>
                    <PrivateRoute exact path="/HomeStudentPage/PersonalInfo" component={() => <PersonalInfo/>}/>

                    <PrivateRoute exact path="/HomeTeacherPage" component={() => <HomeTeacher/>}/>
                    <PrivateRoute exact path="/HomeTeacherPage/AddNewWriting" component={() => <AddWritingT/>}/>
                    <PrivateRoute exact path="/HomeTeacherPage/DetailRequirement" component={() => <DetailReq/>}/>
                    <PrivateRoute exact path="/HomeTeacherPage/ScoreEssay" component={() => <ScoreEssay/>}/>
                    <PrivateRoute exact path="/HomeTeacherPage/PersonalInfo" component={() => <PersonalInfo/>}/>

                    <Route exact path="/test" component={() => <Test/>}/>
                    <Redirect to="/Home"/>
                </Switch>
            </div>
        );
    }
}
export default Main;