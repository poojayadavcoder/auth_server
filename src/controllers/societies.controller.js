import Society from "../models/Society.js";

/**
 * POST /societies
 * Create a new society.
 * Access: Superadmin only
 */
export const createSociety = async (req, res) => {
  try {
    // Check if the requester is a superadmin
    if (!req.user || !req.user.isSuperadmin) {
      return res.status(403).json({ message: "Access denied. Superadmin privileges required." });
    }

    const { 
      name, 
      address, 
      timezone, 
      contactNumbers, 
      email, 
      branding, 
      config, 
      status, 
      builderName,
      structure
    } = req.body;


    // Basic validation
    if (!name || !address || !address.line1 || !address.city || !address.state || !address.pincode || !address.country) {
      return res.status(400).json({ message: "Missing required fields (name and full address are required)" });
    }

    const newSociety = new Society({
      name,
      address,
      timezone,
      contactNumbers,
      email,
      branding,
      config,
      status,
      builderName,
      structure
    });


    await newSociety.save();

    res.status(201).json({
      message: "Society created successfully",
      society: newSociety
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * GET /societies/:societyId
 * Get a single society by ID.
 * Access: Admin
 */
export const getSocietyById = async (req, res) => {
  try {
    const { societyId } = req.params;
    const society = await Society.findById(societyId);

    if (!society) {
      return res.status(404).json({ message: "Society not found" });
    }

    res.json(society);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * GET /societies
 * List all societies.
 * Access: Admin
 */
export const getAllSocieties = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = {};
    if (status) {
      filter.status = status;
    }

    const societies = await Society.find(filter);
    res.json(societies);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * PUT /societies/:societyId
 * Update a society by ID.
 * Access: Admin
 */
export const updateSociety = async (req, res) => {
  try {
    const { societyId } = req.params;
    const updates = req.body;

    const society = await Society.findById(societyId);
    if (!society) {
      return res.status(404).json({ message: "Society not found" });
    }

    // Apply updates
    Object.assign(society, updates);
    await society.save();

    res.json({
      message: "Society updated successfully",
      society
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * DELETE /societies/:societyId
 * Delete a society by ID.
 * Access: Superadmin
 */
export const deleteSociety = async (req, res) => {
  try {
    const { societyId } = req.params;

    // Check if the requester is a superadmin
    if (!req.user || !req.user.isSuperadmin) {
      return res.status(403).json({ message: "Access denied. Superadmin privileges required." });
    }

    const society = await Society.findByIdAndDelete(societyId);

    if (!society) {
      return res.status(404).json({ message: "Society not found" });
    }

    res.json({ message: "Society deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * GET /societies/search
 * Search societies by name.
 * Access: Public
 */
export const searchSocieties = async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) {
      return res.status(400).json({ message: "Search query 'name' is required" });
    }

    const societies = await Society.find({
      name: { $regex: name, $options: "i" },
      $or: [
        { status: "active" },
        { status: { $exists: false } }
      ]
    }).select("name address branding");


    res.json(societies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * GET /societies/:societyId/structure
 * Get the block/flat structure of a society.
 * Access: Public
 */
export const getSocietyStructure = async (req, res) => {
  try {
    const { societyId } = req.params;
    const society = await Society.findById(societyId).select("structure name");

    if (!society) {
      return res.status(404).json({ message: "Society not found" });
    }

    res.json(society);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

