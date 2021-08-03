import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AdminRoute from "../Utils/AdminRoute";
import PrivateRoute from "../Utils/PrivateRoute";
import PublicRoute from "../Utils/PublicRoute";
import AboutUs from "./AboutUsComponent";
import Admin from "./AdminPage/Admin";
import HomePage from "./HomePageComponent";
import StuRegister from "./register/student";
import TeaRegister from "./register/teacher";
import AddNewWriting from "./student/addNewWriting";
import Cart from "./student/cart";
import DetailResultStu from "./student/results";
import HomeStudent from "./student/homepage";
import MyReviews from "./student/review";
import PersonalInfo from "./student/personalInfo";
import DetailRequirement from "./student/requirements";
import DetailReq from "./teacher/requirements";
import DetailResult from "./teacher/results";
import MyRating from "./teacher/myRate";
import PersonalInfoTea from "./teacher/personInfo";
import ScoreEssay from "./teacher/marking";
import HomeTeacher from "./teacher/homepage";
import AddWritingT from "./teacher/addWriting";

class Main extends Component {
  render() {
    return (
      <div>
        <Switch>
          <PublicRoute path="/Home" component={() => <HomePage />} />
          <Route exact path="/AboutUs" component={() => <AboutUs />} />
          <Route
            exact
            path="/RegisterforTeacher"
            component={() => <TeaRegister />}
          />
          <Route
            exact
            path="/RegisterforStudent"
            component={() => <StuRegister />}
          />

          <PrivateRoute
            exact
            path="/HomeStudentPage"
            component={() => <HomeStudent />}
          />
          <PrivateRoute
            path="/HomeStudentPage/AddNewWriting"
            component={() => <AddNewWriting />}
          />
          <PrivateRoute
            path="/HomeStudentPage/DetailResult"
            component={() => <DetailResultStu />}
          />
          <PrivateRoute
            path="/HomeStudentPage/DetailWriting"
            component={() => <DetailRequirement />}
          />
          <PrivateRoute
            exact
            path="/HomeStudentPage/Cart"
            component={() => <Cart />}
          />
          <PrivateRoute
            exact
            path="/HomeStudentPage/PersonalInfo"
            component={() => <PersonalInfo />}
          />
          <PrivateRoute
            exact
            path="/HomeStudentPage/MyReview"
            component={() => <MyReviews />}
          />

          <PrivateRoute
            exact
            path="/HomeTeacherPage"
            component={() => <HomeTeacher />}
          />
          <PrivateRoute
            exact
            path="/HomeTeacherPage/AddNewWriting"
            component={() => <AddWritingT/>}
          />
          <PrivateRoute
            exact
            path="/HomeTeacherPage/DetailRequirement"
            component={() => <DetailReq />}
          />
          <PrivateRoute
            exact
            path="/HomeTeacherPage/ScoreEssay"
            component={() => <ScoreEssay />}
          />
          <PrivateRoute
            exact
            path="/HomeTeacherPage/PersonalInfo"
            component={() => <PersonalInfoTea />}
          />
          <PrivateRoute
            exact
            path="/HomeTeacherPage/DetailResult"
            component={() => <DetailResult />}
          />
          <PrivateRoute
            exact
            path="/HomeTeacherPage/MyRating"
            component={() => <MyRating />}
          />

          <AdminRoute exact path="/admin" component={() => <Admin />} />
          <Redirect to="/Home" />
        </Switch>
      </div>
    );
  }
}
export default Main;
