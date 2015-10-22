import SoundCloud                   from 'soundcloud';
import {Controller}                 from 'arva-js/core/Controller.js';
import {MusicView}                  from '../views/MusicView.js';

export class HomeController extends Controller {

    Index(){
        SoundCloud.initialize({
            client_id: '163eff0091a0cf8479d74a55e888b91b',
            redirect_uri: 'http://localhost:63342/nl.bizboard.soundcloud-discovery/www/index.html#/Home/Callback'
        });

        return new Promise(function(resolve){
            return SoundCloud.get('/tracks', {
                q: 'buskers', license: 'cc-by-sa'
            }).then(function(tracks) {
                resolve(new MusicView({url:tracks[0].stream_url}));
            });
        });
    }
}