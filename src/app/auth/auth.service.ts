import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Injectable } from '@angular/core';

/**
 * Auth service for the app - uses firebase authentication
 *
 * @export
 * @class AuthService
 */
@Injectable()
export class AuthService {
  token: string;

  constructor(private router: Router) {}

/**
 * Given the user's email and password, create a user account
 *
 * @param {string} email
 * @param {string} password
 * @memberof AuthService
 */
  signupUser(email: string, password: string) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(error => console.log(error));
  }

  /**
   * given the user's email and password, authenticate and get auth token
   *
   * @param {string} email
   * @param {string} password
   * @memberof AuthService
   */
  signinUser(email: string, password: string) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        console.log(response);
        this.router.navigate(['/']);
        firebase
          .auth()
          .currentUser.getToken()
          .then((token: string) => (this.token = token));
      })
      .catch(error => console.log(error));
  }

  /**
   * Sign the user out of firebase
   *
   * @memberof AuthService
   */
  signOut() {
    firebase.auth().signOut();
    this.token = null;
  }

  /**
   * Retrieve the auth token
   *
   * @returns
   * @memberof AuthService
   */
  getToken() {
    firebase
      .auth()
      .currentUser.getToken()
      .then((token: string) => (this.token = token));
    return this.token;
  }

  /**
   * Return a true or false value based on whether the user is authenticated
   *
   * @returns
   * @memberof AuthService
   */
  isAuthenticated() {
    return this.token != null;
  }
}
