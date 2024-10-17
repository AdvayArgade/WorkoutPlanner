//pages/Routine/Routines.jsx

import React, { useContext } from 'react'
import Navbar from '../../Navbar/Navbar';
import Footer from '../../Footer/Footer';
import useFetch from '../../../useFetch';
import { AuthContext } from '../../../authContext';
import './routineTailwind.css'
import {Link, useParams} from 'react-router-dom';

const SharedRoutines = () => {
    // const { link } = useParams();
    // const { data } = useFetch(`/share/routines/${link}`);
    const { data } = useFetch("/share/routines/MzJfMTcyOTA3MTM3MjExOV82MTA=")
    console.log("Data: ", data);
    return (
        <div className='routinesView'>
            <Navbar />
            <div className="routinesViewContainer">
                {

                    <div className="routineViewItem">

                        <div className="buttonContainer">
                            <button className="edit-btn">
                                ✏️
                            </button>
                            <button className="delete-btn">
                                🗑️
                            </button>
                            <button className="share-btn">
                                🔗
                            </button>
                        </div>

                        <div className="routineDetails">
                            <div className="routineName">{data.routine.name}</div>
                            <div className="routineType">{data.routine.workout_type}</div>
                            <div className="routinePart">{data.routine.body_part}</div>
                            <div className="routineName">{data.routine.description}</div>
                        </div>
                        {data.link && <Link to={data.link} style={{ textDecoration: "none", color: "black" }}>
                            <div className="routineLink">Watch Workout Video</div>
                        </Link>}
                    </div>

                }
            </div>
            <Footer />
        </div>
    )
}

export default SharedRoutines;
