//components/homeComp/HomeComp.jsx

import React from "react";
import "./homeComp.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEye } from "@fortawesome/free-solid-svg-icons";
import CreateMeal from "../create/CreateMeal";
import CreateEntry from "../create/CreateEntry";
import CreateRoutine from "../create/CreateRoutine";
import WorkoutTemplate from "../create/WorkoutTemplate";

const HomeComp = ({ image, name, description, view }) => {
  const [openPopup, setOpenPopup] = useState(false);
  const [openTemplatePopup, setTemplatePopup] = useState(false);

  return (
    <div className="homeCompContainer">
      <div className="imgCont">
        <img src={image} alt="" />
      </div>
      <h2>{name}</h2>
      <p>{description}</p>
      {/* create */}
      <div className="buttons">
        <div className="createButton">
          <button onClick={() => setOpenPopup(true)}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
          <p>Add</p>
        </div>
        {/* view */}
        <div className="viewButton">
          <Link to={view}>
            <button>
              <FontAwesomeIcon icon={faEye} />
            </button>
          </Link>
          <p>View</p>
        </div>
          <div className="createButton">
              <button onClick={() => setTemplatePopup(true)}>
                  <FontAwesomeIcon icon={faPlus} />
              </button>
              <p>Template</p>
          </div>
      </div>
      {openPopup && name === "Meals" && <CreateMeal setOpen={setOpenPopup} />}
      {openPopup && name === "Entries" && (
        <CreateEntry setOpen={setOpenPopup} />
      )}
      {openPopup && name === "Routines" && (
        <CreateRoutine setOpen={setOpenPopup} />
      )}
        {openTemplatePopup && name === "Routines" && (
            <WorkoutTemplate setOpen={setTemplatePopup} />
        )}
    </div>
  );
};

export default HomeComp;
