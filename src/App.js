import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import Root from "./Root";
import { loadProfileByUserId } from "./Services/Actions/UserProfile/getUserProfileByUserIdAction";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadProfileByUserId());
  }, []);
  return <Root></Root>;
}

export default App;
