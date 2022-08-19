import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
axios.defaults.withCredentials = true;

const Welcome = () => {
  const [user, setUser] = useState();
  const dispatch = useDispatch();

  const refreshToken = async () => {
    const res = await axios
      .get("/api/refresh", {
        withCredentials: true,
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };
  const sednRequest = async () => {
    const res = await axios
      .get("/api/user", {
        withCredentials: true,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    console.log("reloaded");
    sednRequest().then((data) => {
      setUser(data.user);
      dispatch(authActions.login());
    });

    let interval = setInterval(() => {
      refreshToken().then((data) => setUser(data.user));
    }, 1000 * 29);
    return () => clearInterval(interval);
  }, []);

  return <div>{user && <h1>{user.name}</h1>}</div>;
};

export default Welcome;
