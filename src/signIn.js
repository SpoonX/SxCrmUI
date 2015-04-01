import {App}    from 'src/app'; // not usefull I think here
import {User}   from 'src/user';

export class SignIn {
  static inject () { return [App, User]; }
  constructor (app, user) {
    this.password     = null;
    this.email        = null;
    this.isAuthFailed = false;

    this.myRouter = app.router;
    this.user     = user;
  }

  canActivate () {
    this.user.authTest((hasIdentity) => {
      if (hasIdentity) {
        return this.myRouter.navigate('dashboard');
      }
      return true;      
    });
  }

  signIn () {
    io.socket.post('/user/authenticate', {email: this.email, password: this.password}, (body, JWR) => {
      if (JWR.statusCode == 200 && body.auth) {
        this.user.setIdentity(true);
        this.user.isAuthFailed  = false;
        this.user.email         = this.email;
        return this.myRouter.navigate('dashboard');
      }
      this.user.setIdentity(false);
      this.user.isAuthFailed = true;
      return;
    });
  }
}
