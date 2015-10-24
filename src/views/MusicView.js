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

        this.renderables.equalizerRight = new EqualizerSurface({
            properties: {
                'background-color':'black'
            },
            audioSource: this.renderables.audio
        });

        this.renderables.equalizerLeft = new EqualizerSurface({
            properties: {
                'background-color':'black'
            },
            positionLeft: 'true',
            audioSource: this.renderables.audio
        });

        this.layouts.push((context) => {

            context.set('audio', {
                size: context.size,
                origin: [0, 0],
                align: [0, 0]
            });

            context.set('equalizerRight', {
                size: [context.size[0]/2,context.size[1]],
                origin: [1, 0.5],
                align: [1, 0.5]
            });
            context.set('equalizerLeft', {
                size: [context.size[0]/2,context.size[1]],
                origin: [0, 0.5],
                align: [0, 0.5]
            });

        });
    }
}
