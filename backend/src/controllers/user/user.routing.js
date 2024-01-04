const postActions = require("./post.actions");
const getActions = require("./get.actions")

module.exports = {
  "/": {
    post: {
      action: postActions.createUser,
    },
  },
};
