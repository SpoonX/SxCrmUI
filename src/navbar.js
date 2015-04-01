import {Behavior} from 'aurelia-framework';
import {User}     from 'src/user';

export class Navbar {
  static inject () { return [User]; }
  static metadata () {
    return Behavior.withProperty('router');
  }
  constructor (user) {
    this.user = user;
  }
}
