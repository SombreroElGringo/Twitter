import { auth } from './firebase';

// Sign Up
export const doCreateUserWithEmailAndPassword = (email, password) =>
  	auth.createUserWithEmailAndPassword(email, password);

// Sign In
export const doSignInWithEmailAndPassword = (email, password) =>
  	auth.signInWithEmailAndPassword(email, password);

// Sign out
export const doSignOut = () =>
  	auth.signOut();

// Get Current User 
export const getCurrentUser = () =>
	  auth.currentUser;

// Get Current User 
export const getCurrentUserToken = () => {
	return auth.currentUser.getIdToken().then(token => {
		return token;
	}).catch(error => {
		console.log(error);
	});
}