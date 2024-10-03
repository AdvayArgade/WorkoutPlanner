//components/create/CreateRoutine.jsx

import './popUp.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { useContext, useState } from 'react';
import axios from "axios"
import { AuthContext } from '../../authContext.js';
import { WorkoutType, BodyPart } from "../../data.js"

const CreateRoutine = ({ setOpen }) => {

    const { user } = useContext(AuthContext);
    const [info, setInfo] = useState({});

    const handleChange = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    }

    const handleClick = async (e) => {
        e.preventDefault();

        const newRoutine = {
            ...info, author: user._id
        }
        try {
            await axios.post("http://localhost:2000/api/routines", newRoutine, {
                withCredentials: false
            })
            setOpen(false)
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="modal">
            <div className="mContainer">

                <FontAwesomeIcon icon={faXmark} className="mClose" onClick={() => setOpen(false)} />

                <div className="mTitle">Create Routine</div>

                <form>
                    <input
                        className="formInput"
                        type="text"
                        onChange={handleChange}
                        id="name"
                        placeholder='Enter the Workout Name'
                    />
                    <input
                        className="formInput"
                        type="text"
                        onChange={handleChange}
                        id="link"
                        placeholder='Add workout link'
                    />

                    <div className="formInput" id='options'>
                        <label>Choose Workout Type</label>
                        <select id="workout_type" onChange={handleChange}>
                            <option key={0} value="none">-</option>
                            {
                                WorkoutType.map((w, index) => (

                                    <option key={index} value={w}>{w}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="formInput" id='options'>
                        <label>Choose Body Part</label>
                        <select id="body_part" onChange={handleChange}>
                            <option key={0} value="none">-</option>
                            {
                                BodyPart.map((b, index) => (

                                    <option key={index} value={b}>{b}</option>
                                ))
                            }
                        </select>
                    </div>
                </form>

                <button className="mButton" onClick={handleClick}>
                    Submit
                </button>
            </div>
        </div>
    )
}

export default CreateRoutine
