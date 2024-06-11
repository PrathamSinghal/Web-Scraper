import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./index.css";

import axios from "./axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as actionTypes from "./store/actions";
import CategoryManagement from "./pages/CategoryManagement/CategoryManagement";
import CategoryDetails from "./pages/CategoryManagement/CategoryDetails";

const PublicRoute = (props) => {

  return (
    <Switch>
      <Route path="/" exact>
        <CategoryManagement />
      </Route>
      <Route path="/websiteDetails/:id" exact>
        <CategoryDetails />
      </Route>
    </Switch>
  );
};

function App(props) {

  return (
    <div>
      <Router>
        <PublicRoute />
      </Router>
      <ToastContainer theme="colored" />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userData: state.userData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setUsers: (updatedValue) => {
      dispatch({
        type: actionTypes.UPDATE_USER,
        updatedUser: updatedValue,
      });
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
