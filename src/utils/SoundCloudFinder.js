/**
 * Created by tom on 22/10/15.
 */

import _                            from 'lodash';
import SoundCloud                   from 'soundcloud';
import {SoundCloudClientID}         from '../Settings.js';

export class SoundCloudFinder {
    constructor(options = {}){
        this.soundCloud = SoundCloud;
        this.soundCloud.initialize(_.merge(options, {
            client_id: SoundCloudClientID
        }));
    }

    async getRandomSongs(options){
        return new Promise((resolve, reject) => {
            this.soundCloud.get('/tracks', options).then((tracks) => {
                resolve(tracks);
            });
        });
    }
}