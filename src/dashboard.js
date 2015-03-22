import {Router} from 'aurelia-router';
import {User}   from 'src/user';

export class Dashboard {
  static inject () { return [Router, User]; }
  constructor (router, user) {
    this.user   = user;
    this.router = router;
    this.router.configure(config => {
      config.title = 'Dashboard';
      config.map([
        { route: ['', 'main'],moduleId: 'main',             nav: false, title: 'Dashboard'},
        { route: 'user',      moduleId: 'user',             nav: true,  title: 'User'     },
        { route: 'company',   moduleId: '/company/company',nav: true,  title: 'Company'  }
      ]);
    });
  }
  activate () {
    if(!this.user.hasEmail()) {
      io.socket.get('/user/email', {}, (body, JWR) => {
        if (body.email && JWR.statusCode == 200) {
          this.user.setEmail(body.email);
          return true;
        }
      });      
    }
  }
}
