const postActions = require("./post.actions");

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
  }    
};
