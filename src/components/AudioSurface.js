import Surface              from 'famous/core/Surface.js';

export class AudioSurface extends Surface {

    get elementType() {
        return 'audio';
    }

    get elementClass() {
        return 'famous-surface';
    }

    get bufferLength() {
        return this._bufferLength;
    }

    get streamData() {
        return this._streamData;
    }

    constructor(options = {}) {
        super();
        var self = this;
        this.streamUrl = options.url || '';
        this._value = '';
        this._name = options.name || '';
        this._bufferLength = 0;

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

    deploy() {

        // public properties and methods
        this.volume = 0;
        this._streamData = null;

        var analyser;
        var audioContext = new (window.AudioContext || window.webkitAudioContext); // this is because it's not been standardised accross browsers yet.

        analyser = audioContext.createAnalyser();
        analyser.fftSize = 256; // see - there is that 'fft' thing.
        analyser.smoothingTimeConstant = 0.8;

        var source = audioContext.createMediaElementSource(this._element); // this is where we hook up the <audio> element
        source.connect(analyser);
        analyser.connect(audioContext.destination);

        this._bufferLength = analyser.frequencyBinCount;
        this._streamData = new Uint8Array(this._bufferLength); // This just means we will have 128 "bins" (always half the analyzer.fftsize value), each containing a number between 0 and 255.

        var sampleAudioStream = function() {
            // This closure is where the magic happens. Because it gets called with setInterval below, it continuously samples the audio data
            // and updates the streamData and volume properties. This the SoundCouldAudioSource function can be passed to a visualization routine and
            // continue to give real-time data on the audio stream.
            analyser.getByteFrequencyData(this._streamData);
            // calculate an overall volume value
            var total = 0;
            for (var i = 0; i < 80; i++) { // get the volume from the first 80 bins, else it gets too loud with treble
                total += this._streamData[i];
            }
            this.volume = total;
        }.bind(this);

        setInterval(sampleAudioStream, 32); //

        this._element.setAttribute('src', this.streamUrl);
        this._element.play();
    }
}
