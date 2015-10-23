/**
 * Created by manuel on 27-08-15.
 */

import _                     from 'lodash';
import Surface               from 'famous/core/Surface.js';
import Utility               from 'famous/utilities/Utility.js';
import {EqualizerSurface}    from '../components/EqualizerSurface.js';
import {AudioSurface}        from '../components/AudioSurface.js';

import {View}                from 'arva-js/core/View.js';

export class MusicView extends View {

    constructor(options = {}) {
        super(options);

        this.renderables.audio = new AudioSurface({
            url: options.url
        });

        this.renderables.equalizer = new EqualizerSurface({
            audioSource: this.renderables.audio
        });


        this.layouts.push((context) => {

            context.set('audio', {
                size: context.size,
                origin: [0, 0],
                align: [0, 0]
            });

            context.set('equalizer', {
                size: [400,150],
                origin: [1, 0],
                align: [1, 0]
            });
        });
    }
}
