import './popUp.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { useContext, useState } from 'react';
import axios from "axios"
import { AuthContext } from '../../authContext.js';
import { WorkoutType, BodyPart } from "../../data.js"
import TemplatePopup from "./TemplatePopup"; // You may also include options for intensity

const WorkoutTemplate = ({ setOpen }) => {

    const { user } = useContext(AuthContext);
    const [info, setInfo] = useState({});
    const [template, setTemplate] = useState('');  // To store the workout template from the backend
    const [showTemplatePopup, setShowTemplatePopup] = useState(false);

    const handleChange = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    }

    const handleClick = async (e) => {
        e.preventDefault();

        // Send request to backend to get workout template
        try {
            const response = await axios.post("http://localhost:2000/api/routines/template/getTemplate", {
                ...info, author: user._id
            }, {
                withCredentials: false
            });
            // Set template from backend response
            setTemplate(response.data.template);
            setShowTemplatePopup(true);
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="modal">
            <div className="mContainer">

                <FontAwesomeIcon icon={faXmark} className="mClose" onClick={() => setOpen(false)} />

                <div className="mTitle">Get Workout Template</div>

                <form>
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

                    <div className="formInput" id='options'>
                        <label>Choose Intensity</label>
                        <select id="intensity" onChange={handleChange}>
                            <option key={0} value="none">-</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    <div className="formInput" id='options'>
                        <label>Select Duration (in minutes)</label>
                        <input
                            type="number"
                            onChange={handleChange}
                            id="duration"
                            placeholder="Enter workout duration"
                        />
                    </div>
                </form>

                <button className="mButton" onClick={handleClick}>
                    Submit
                </button>

                {/* Display the workout template from the backend */}
                {showTemplatePopup && (
                    <TemplatePopup template={template} setShowTemplatePopup={setShowTemplatePopup} />
                )}

            </div>
        </div>
    )
}

export default WorkoutTemplate;
