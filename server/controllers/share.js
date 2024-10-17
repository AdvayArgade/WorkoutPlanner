import Routine from "../models/Routine.js";
import { UniqueString } from "unique-string-generator";
const generateShareableLink = () => {
    // return crypto.randomBytes(16).toString('hex');
    return UniqueString();
};

// Route to generate shareable link for a routine
export const shareRoutine = async (req, res) => {
    try {
        const routineId = req.params.id;

        // Generate unique shareable link
        const shareableLink = generateShareableLink();

        // Find the routine by ID and update with shareable link
        const updatedRoutine = await Routine.findByIdAndUpdate(
            routineId,
            { shareable_link: shareableLink },
            { new: true }
        );

        if (!updatedRoutine) {
            return res.status(404).json({ message: 'Routine not found' });
        }

        // Return the shareable URL
        res.json({ shareableUrl: `http://localhost:3000/share/routines/${shareableLink}` });
    } catch (err) {
        res.status(500).json({ message: 'Error generating shareable link', error: err.message });
    }
}

// Route to view a shared routine
export const viewSharedRoutine = async (req, res) => {
    try {
        const shareableLink = req.params.link;

        // Find the routine by shareable link
        const routine = await Routine.findOne({ shareable_link: shareableLink });

        if (!routine) {
            return res.status(404).json({ message: 'Routine not found' });
        }

        // Return the routine data
        res.json({ routine });
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving routine', error: err.message });
    }
}
