export function loggedIn(authToken){
  return {
    type: "LOGGED_IN",
    authToken
  };
};
export function loggedOut(){
  return {
    type: "LOGGED_OUT"
  };
};
