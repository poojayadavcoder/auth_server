import AdminRole from "../models/AdminRole.js";

/**
 * POST /adminRoles
 * Create a new admin role.
 * Access: Authenticated Admin
 */
export const createAdminRole = async (req, res) => {
  try {
    const { name, description, permissions } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    // Check if role name already exists
    const existingRole = await AdminRole.findOne({ name });
    if (existingRole) {
      return res.status(409).json({ message: "Role with this name already exists" });
    }

    const newRole = new AdminRole({
      name,
      description,
      permissions: permissions || []
    });

    await newRole.save();

    res.status(201).json({
      message: "Admin role created successfully",
      role: newRole
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * GET /adminRoles
 * Get all admin roles.
 * Access: Authenticated Admin
 */
export const getAllAdminRoles = async (req, res) => {
  try {
    const roles = await AdminRole.find();
    res.json(roles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * PUT /adminRoles/:roleId
 * Update an admin role by ID.
 * Access: Authenticated Admin
 */
export const updateAdminRole = async (req, res) => {
  try {
    const { roleId } = req.params;
    const updates = req.body;

    const role = await AdminRole.findById(roleId);
    if (!role) {
      return res.status(404).json({ message: "Admin role not found" });
    }

    // If name is being updated, check for uniqueness
    if (updates.name && updates.name !== role.name) {
      const existingRole = await AdminRole.findOne({ name: updates.name });
      if (existingRole) {
        return res.status(409).json({ message: "Role with this name already exists" });
      }
    }

    Object.assign(role, updates);
    await role.save();

    res.json({
      message: "Admin role updated successfully",
      role
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
