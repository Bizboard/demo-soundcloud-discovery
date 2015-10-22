import _                            from 'lodash';
import SoundCloud                   from 'soundcloud';
import {Controller}                 from 'arva-js/core/Controller.js';
import {MusicView}                  from '../views/MusicView.js';

export class HomeController extends Controller {

    Index() {
        let soundCloudClientID = '9adf30ed7e6f44f081e689d1f54dc7c6';

        SoundCloud.initialize({
            client_id: soundCloudClientID
        });

        return new Promise(async function (resolve) {
            let tracks = await SoundCloud.get('/tracks'/*, {license: 'cc-by-sa' }*/);

            resolve(new MusicView({url: `${_.sample(tracks).stream_url}?client_id=${soundCloudClientID}`}));
        });
    }
}