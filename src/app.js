import {Router} from 'aurelia-router';
import {User}   from 'src/user';

export class App {
  static inject () { return [Router]; }
  constructor (router) {
    this.router = router;
    this.router.configure(config => {
      config.title = 'SxCrmUI';
      config.addPipelineStep('authorize', AuthorizeStep)
      config.map([
        { route: 'dashboard',   moduleId: 'dashboard',nav: true,  title: 'Dashboard', auth: true },
        { route: ['', 'signIn'],moduleId: 'signIn',   nav: true,  title: 'SignIn'                },
        { route: 'signOut',     moduleId: 'signOut',  nav: false, title: 'SignOut'               }
      ]);
    });
  }

}

class AuthorizeStep {
  static inject () { return [User]; }
  constructor (user) {
    this.user = user;
  }

  run (routingContext, next) {
    if (routingContext.nextInstructions.some(i => i.config.auth)) {
      if (!!this.user.hasIdentity()) {
        return next();
      }
      return next.cancel(new Redirect('signIn'));
    }

    return next();
  }
}
