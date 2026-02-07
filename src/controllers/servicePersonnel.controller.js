import ServicePersonnel from "../models/ServicePersonnel.js";
import Society from "../models/Society.js";

/**
 * POST /service-personnel
 * Create a new service personnel (Daily Help).
 * Access: Admin, Society Head
 */
export const createServicePersonnel = async (req, res) => {
    try {
        const { societyId, type, name, mobile, address, assignedFlats } = req.body;

        if (!societyId || !type || !name || !mobile) {
            return res.status(400).json({ message: "SocietyId, Type, Name and Mobile are required" });
        }

        // Check if already exists by mobile
        let personnel = await ServicePersonnel.findOne({ mobile });

        if (personnel) {
            // If exists, check if already added to this society
            if (personnel.societyIds.includes(societyId)) {
                return res.status(409).json({ message: "Service personnel already exists in this society" });
            }
            // Add to this society
            personnel.societyIds.push(societyId);
            if (assignedFlats) {
                // Merge assigned flats logic if needed, simplify for now
            }
        } else {
            // Create new
            personnel = new ServicePersonnel({
                type, // maid, cook, driver, etc.
                name,
                mobile,
                address,
                societyIds: [societyId],
                assignedFlats: assignedFlats || [],
                status: "active"
            });
        }

        await personnel.save();

        res.status(201).json({
            message: "Service personnel created successfully",
            personnel
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/**
 * GET /service-personnel
 * Get all service personnel for a society.
 * Access: Authenticated User (Resident, Guard, Admin)
 */
export const getAllServicePersonnel = async (req, res) => {
    try {
        const { societyId } = req.query;

        if (!societyId) {
            return res.status(400).json({ message: "SocietyId is required" });
        }

        const personnelList = await ServicePersonnel.find({
            societyIds: societyId,
            status: { $ne: "banned" } // Don't show banned?
        });

        res.json(personnelList);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/**
 * PUT /service-personnel/:id
 * Update service personnel details.
 * Access: Admin, Society Head
 */
export const updateServicePersonnel = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const personnel = await ServicePersonnel.findByIdAndUpdate(id, updates, { new: true });

        if (!personnel) {
            return res.status(404).json({ message: "Service personnel not found" });
        }

        res.json(personnel);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/**
 * DELETE /service-personnel/:id
 * Remove personnel from society (or soft delete if only one society).
 * Access: Admin, Society Head
 */
export const deleteServicePersonnel = async (req, res) => {
    try {
        const { id } = req.params;
        const { societyId } = req.query; // Remove from specific society

        if (!societyId) {
            return res.status(400).json({ message: "SocietyId is required for deletion context" });
        }

        const personnel = await ServicePersonnel.findById(id);
        if (!personnel) {
            return res.status(404).json({ message: "Service personnel not found" });
        }

        // Remove societyId from list
        personnel.societyIds = personnel.societyIds.filter(sid => sid !== societyId);

        if (personnel.societyIds.length === 0) {
            // If no societies left, maybe set status to inactive?
            personnel.status = "inactive";
        }

        await personnel.save();

        res.json({ message: "Service personnel removed from society successfully" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
