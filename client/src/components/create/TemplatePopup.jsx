import './popUp.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const TemplatePopup = ({ template, setShowTemplatePopup }) => {
    return (
        <div className="modal">
            <div className="mContainer">

                {/* Close button */}
                <FontAwesomeIcon icon={faXmark} className="mClose" onClick={() => setShowTemplatePopup(false)} />

                <div className="mTitle">Your Workout Template</div>

                {/* Display the workout template in a textarea */}
                <textarea value={template} readOnly rows="8" className="templateDisplay"></textarea>

                <button className="mButton" onClick={() => setShowTemplatePopup(false)}>
                    Close
                </button>
            </div>
        </div>
    )
}

export default TemplatePopup;
