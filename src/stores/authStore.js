import { defineStore } from 'pinia'
import AuthService from '../services/auth.service';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export const useAuthStore = defineStore('auth', {
  state: function () {
    return initialState
  },
  actions: {
    login(user){
      return AuthService.login(user).then(
        user => {
          this.status.loggedIn = true;
          this.user = user;
          return Promise.resolve(user);
        },
        error => {
          this.status.loggedIn = false;
          this.user = null;
          return Promise.reject(error);
        }
      );
    },
    logout(){
      AuthService.logout();
      this.status.loggedIn = false;
      this.user = null;
    },
    register(user) {
      return AuthService.register(user).then(
        response => {
          this.status.loggedIn = false;
          return Promise.resolve(response.data);
        },
        error => {
          this.status.loggedIn = false;
          return Promise.reject(error);
        }
      );
    }
  }
})
