import {Controller}                 from 'arva-js/core/Controller.js';
import {HomeView}                   from '../views/HomeView.js';

export class HomeController extends Controller {
    constructor(router, context){
        super(router, context);
        this.router = router;
        this.context = context;
    }

    Index(){
        //SC.initialize({
        //    client_id: '163eff0091a0cf8479d74a55e888b91b',
        //    redirect_uri: 'http://localhost:63342/ufl/www/index.html#/SC/callback'
        //});
        //
        //return new Promise(function(resolve){
        //    return SC.get('/tracks', {
        //        q: 'buskers', license: 'cc-by-sa'
        //    }).then(function(tracks) {
        //        resolve(new HomeView({url:tracks[0].stream_url}));
        //    });
        //});

    }
}