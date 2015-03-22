export class User {
  static inject () { return []; }
  constructor (app) {
    this.isIdentified = false;
    this.email        = null;
  }
  hasIdentity () {
    return this.isIdentified;
  }
  setIdentity (state) {
    return this.isIdentified = !!state; //making sure it's a boolean in the end
  }
  hasEmail () {
    return this.email ? true : false;
  }
  setEmail (email) {
    return this.email = email; 
  }
  authTest (cb) {
    io.socket.get('/user/authState', (body, JWR) => {
      this.isIdentified = (JWR.statusCode == 200 && body.auth);
      return cb(this.isIdentified);
    });
  }
}
