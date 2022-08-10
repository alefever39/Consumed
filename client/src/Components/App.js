import { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar/NavBar";
import Login from "./UserAuth/Login";
import Signup from "./UserAuth/Signup";
import { getUser } from "./Slices/userSlice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import MediaContainer from "./MediaContainer/MediaContainer";

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
          <NavBar>
            <MediaContainer />
          </NavBar>
        </Route>
        <Route path="/my_media">
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
