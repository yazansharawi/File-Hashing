const models = require("../../models");
const User = models.User;

async function getUserById(req, res) {
    const userId = req.params.id;
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      return res.json({ uuid: user.userUuid });
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

module.exports = {
  getUserById,
};
