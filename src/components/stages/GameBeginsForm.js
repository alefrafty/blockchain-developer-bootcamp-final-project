import React from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./GameBeginsForm.module.css";

function GameBeginsForm(props) {
  const navigate = useNavigate();

  function submitHandler(event) {
    // prevents browser default, allowing us to handle the submission with JS
    event.preventDefault();
    navigate("/play");
  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.actions}>
        <button>Start Game</button>
      </div>
    </form>
  );
}

export default GameBeginsForm;
