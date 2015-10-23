import _                            from 'lodash';
import {Controller}                 from 'arva-js/core/Controller.js';
import {MusicView}                  from '../views/MusicView.js';
import {SoundCloudFinder}           from '../utils/SoundCloudFinder.js';
import {SoundCloudClientID}         from '../Settings.js';

export class HomeController extends Controller {

    Index() {

        return new Promise(async function (resolve) {
            let tracks = await (new SoundCloudFinder()).getRandomSongs();
            let track = _.sample(tracks); //_.filter(tracks, (metaInfo) => metaInfo.license !== 'all-rights-reserved'));

            resolve(new MusicView({
                url: `${track.stream_url}?client_id=${SoundCloudClientID}`,
                author: track.user.username,
                title: track.title
            }));
        });
    }
}