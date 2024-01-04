const models = require("../../models");
const User = models.User;

async function getUser(req, res) {
  console.log("hi get");
}

module.exports = {
    getUser,
};
