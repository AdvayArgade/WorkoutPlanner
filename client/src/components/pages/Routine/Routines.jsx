//pages/Routine/Routines.jsx

import React, { useContext } from 'react'
import Navbar from '../../Navbar/Navbar';
import Footer from '../../Footer/Footer';
import useFetch from '../../../useFetch';
import { AuthContext } from '../../../authContext';
import './routine.css'
import { Link } from 'react-router-dom';

const Routines = () => {
    const { user } = useContext(AuthContext)
    const { data } = useFetch(`/routines/${user._id}`)
    console.log("User id: ", user._id);
    return (
        <div className='routinesView'>
            <Navbar />
            <div className="routinesViewContainer">
                {
                    data?.map((r, index) => (
                        <div className="routineViewItem" key={index}>

                            <div className="routineDetails">
                                <div className="routineName">{r.name}</div>
                                <div className="routineType">{r.workout_type}</div>
                                <div className="routinePart">{r.body_part}</div>
                                <div className="routineName">{r.description}</div>
                            </div>
                            {r.link && <Link to={r.link} style={{ textDecoration: "none", color: "black" }}>
                                <div className="routineLink">Watch Workout Video</div>
                            </Link>}
                        </div>
                    ))
                }
            </div>
            <Footer />
        </div>
    )
}

export default Routines
