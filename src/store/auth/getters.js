export default {
  userState(state) {
    if (state.user === null) {
      return false;
    } else {
      return true;
    }
  },
};
