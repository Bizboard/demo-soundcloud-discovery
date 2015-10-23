import CanvasSurface              from 'famous/surfaces/CanvasSurface.js';

export class EqualizerSurface extends CanvasSurface {


    constructor(options = {}) {
        super(options);
        this._audioSource = options.audioSource;
    }


    commit(context) {
        super.commit(context);

        let CANVAS_WIDTH = this._currentTarget.width;
        let CANVAS_HEIGHT = this._currentTarget.height;

        let canvasCtx = this.getContext('2d');

        canvasCtx.fillStyle = 'rgb(0, 0, 0)';
        canvasCtx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        let barWidth = (CANVAS_WIDTH / this._audioSource.bufferlength);
        let barHeight;
        var x = 0;

        for(var i = 0; i < this._audioSource.bufferlength; i++) {
            barHeight = this._audioSource.streamData[i];

            canvasCtx.fillStyle = 'rgba(0,'+(barHeight+40) +',100,0.5)';
            canvasCtx.fillRect(x,CANVAS_HEIGHT/2-barHeight,barWidth,barHeight);
            canvasCtx.fillStyle = 'rgba(0,'+(barHeight+60) +',100,0.5)';
            canvasCtx.fillRect(x,CANVAS_HEIGHT/2-barHeight/2,barWidth,barHeight/2);
            canvasCtx.fillStyle = 'rgba(0,'+(barHeight+40) +',100, 0.25)';
            canvasCtx.fillRect(x,CANVAS_HEIGHT/2-barHeight*1.5,barWidth,barHeight*1.5);

            canvasCtx.fillStyle = 'rgba(0,'+(barHeight+40) +',100,0.5)';
            canvasCtx.fillRect(x,CANVAS_HEIGHT/2+barHeight,barWidth,-barHeight);
            canvasCtx.fillStyle = 'rgba(0,'+(barHeight+60) +',100,0.5)';
            canvasCtx.fillRect(x,CANVAS_HEIGHT/2+barHeight/2,barWidth,-barHeight/2);
            canvasCtx.fillStyle = 'rgba(0,'+(barHeight+40) +',100, 0.25)';
            canvasCtx.fillRect(x,CANVAS_HEIGHT/2+barHeight*1.5,barWidth,-barHeight*1.5);

            x += barWidth + 1;
        }
    }
}
