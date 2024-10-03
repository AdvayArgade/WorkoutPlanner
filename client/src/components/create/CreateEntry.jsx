//components/create/CreateEntry.jsx

import './popUp.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { useContext, useState } from 'react';
import axios from "axios"
import useFetch from '../../useFetch';
import { AuthContext } from '../../authContext';

const CreateEntry = ({ setOpen }) => {

    const { user } = useContext(AuthContext);
    const [info, setInfo] = useState({});
    const { data } = useFetch(`/entries/fetchMealsAndRoutines/${user._id}`)
    const handleChange = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    }
    const handleClick = async (e) => {
        e.preventDefault();

        const newEntry = {
            ...info, author: user._id
        }
        try {
            await axios.post('http://localhost:2000/api/entries/', newEntry, {
                withCredentials: false
            })
            setOpen(false)
            console.log(newEntry)
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleMultiSelectChange = (e) => {
        const { id, options } = e.target;
        const selectedOptions = Array.from(options)
            .filter(option => option.selected)
            .map(option => option.value);
        setInfo(prev => ({ ...prev, [id]: selectedOptions }));
    }

    return (
        <div className="modal">
            <div className="mContainer">

                <FontAwesomeIcon icon={faXmark} className="mClose" onClick={() => setOpen(false)} />

                <div className="mTitle">Create Entry</div>

                <form>
                    <input
                        className="formInput"
                        type="date"
                        onChange={handleChange}
                        id="date"
                    />

                    <div className="formInput" id='options'>
                        <label>Choose Meals</label>
                        <select
                            id="meals"
                            multiple
                            onChange={handleMultiSelectChange}
                        >
                            {data?.meals?.map((meal, index) => (
                                <option key={index} value={meal._id}>{meal.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="formInput" id='options'>
                        <label>Choose Routines</label>
                        <select
                            id="routines"
                            multiple
                            onChange={handleMultiSelectChange}
                        >
                            {data?.routines?.map((routine, index) => (
                                <option key={index} value={routine._id}>{routine.name}</option>
                            ))}
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

export default CreateEntry
