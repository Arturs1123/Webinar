// plugins/persistedstate.js

import createPersistedState from 'vuex-persistedstate';

export default ({ store }) => {
  createPersistedState({
    // Here you can set options, like using sessionStorage instead of localStorage
    // storage: window.sessionStorage,
  })(store);
};