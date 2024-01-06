const postActions = require("./post.actions");

module.exports = {
  "/register-by-user-uuid/:uuid": {
    post: {
      action: postActions.createNewMediaRecord,
    },
  },   
};
