import { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Login from "./Login";
import Signup from "./Signup";
import { getUser } from "../Slices/userSlice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    fetch("/me", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.id) {
          dispatch(getUser(data));
          history.push("/home");
        } else {
          history.push("/login");
        }
      });
  }, []);

  return (
    <div className="App">
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/home">
          <NavBar></NavBar>
        </Route>
        <Route path="/">
          <h1>Loading...</h1>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
