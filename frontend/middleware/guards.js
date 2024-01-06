import store from '../src/store';

export function isAuthenticated() {
  return !!store.state.token;
}
