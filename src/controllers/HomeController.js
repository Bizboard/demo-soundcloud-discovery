import SoundCloud                   from 'soundcloud';
import {Controller}                 from 'arva-js/core/Controller.js';
import {HomeView}                   from '../views/HomeView.js';

export class HomeController extends Controller {

    Index(){
        SoundCloud.initialize({
            client_id: '163eff0091a0cf8479d74a55e888b91b',
            redirect_uri: 'http://localhost:63342/ufl/www/index.html#/SC/callback'
        });

        return new Promise(function(resolve){
            return SoundCloud.get('/tracks', {
                q: 'buskers', license: 'cc-by-sa'
            }).then(function(tracks) {
                resolve(new HomeView({url:tracks[0].stream_url}));
            });
        });
    }
}