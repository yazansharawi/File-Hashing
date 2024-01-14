const postActions = require("./post.actions");
const getActions = require("./get.actions")
module.exports = {
  "/": {
    post: {
      action: postActions.createUser,
    },
  },
  "/login": {
    post: {
      action: postActions.loginUser,
    },
  },
  "/forgetPass": {
    post: {
      action: postActions.changePass,
    },
  },
  "/verifyEmail": {
    post: {
      action: postActions.checkEmail,
    },
  },
  "/user-by-id/:id": {
    get: {
      action: getActions.getUserById,
    },
  }     
};
