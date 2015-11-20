window.CurrentUserActions = {
  receiveUser: function (user) {
    AppDispatcher.dispatch({
      actionType: CurrentUserConstants.USER_FETCHED,
      user: user
    });
  },

  resetUser: function () {
    AppDispatcher.dispatch({
      actionType: UserConstants.USER_SIGN_OUT,
    });
  }
};
