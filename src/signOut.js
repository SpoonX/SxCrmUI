import {App}  from 'src/app';
import {User} from 'src/user';

export class SignOut {
  static inject () { return [App, User]; }
  constructor (app, user) {
    this.myRouter = app.router;
    this.user     = user;
  }
  activate () {
    io.socket.get('/user/logout', {}, (body, JWR) => {
      this.user.setIdentity(false);
      this.user.setEmail(null);
      this.myRouter.navigate('signIn');
      return;
    });
  }
}
