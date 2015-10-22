import Surface              from 'famous/core/Surface.js';

export class AudioSurface extends Surface {

    get elementType() {
        return 'audio';
    }

    get elementClass() {
        return 'famous-surface';
    }

    constructor(options = {}) {
        super();
        var self = this;
        this.streamUrl = options.url || '';
        this._value = '';
        this._name = options.name || '';

        this.on('click', this.focus.bind(this));
    }


    focus() {
        if (this._currentTarget)
            this._currentTarget.focus();
        return this;
    }

    blur() {
        if (this._currentTarget)
            this._currentTarget.blur();
        return this;
    }


    setName() {
        this._name = str;
        this._contentDirty = true;
        return this;
    }

    getName() {
        return this._name;
    }

    deploy(target) {

        // public properties and methods
        this.volume = 0;
        this.streamData = new Uint8Array(this.bufferlength); // This just means we will have 128 "bins" (always half the analyzer.fftsize value), each containing a number between 0 and 255.

        var analyser;
        var audioCtx = new (window.AudioContext || window.webkitAudioContext); // this is because it's not been standardised accross browsers yet.

        analyser = audioCtx.createAnalyser();
        analyser.fftSize = 256; // see - there is that 'fft' thing.
        analyser.smoothingTimeConstant = 0.8;
        var source = audioCtx.createMediaElementSource(target); // this is where we hook up the <audio> element
        source.connect(analyser);
        analyser.connect(audioCtx.destination);

        var bufferlength = analyser.frequencyBinCount;
        this.bufferlength = bufferlength;

        var sampleAudioStream = () => {
            // This closure is where the magic happens. Because it gets called with setInterval below, it continuously samples the audio data
            // and updates the streamData and volume properties. This the SoundCouldAudioSource function can be passed to a visualization routine and
            // continue to give real-time data on the audio stream.
            analyser.getByteFrequencyData(this.streamData);
            // calculate an overall volume value
            var total = 0;
            for (var i = 0; i < 2000; i++) { // get the volume from the first 80 bins, else it gets too loud with treble
                total += this.streamData[i];
            }
            this.volume = total;
        };

        setInterval(sampleAudioStream, 32); //

        target.setAttribute('src', this.streamUrl);
        target.play();
    }
}
