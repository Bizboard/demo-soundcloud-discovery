import CanvasSurface              from 'famous/surfaces/CanvasSurface.js';

export class EqualizerSurface extends CanvasSurface {


    constructor(options = {}) {
        super(options);
        this._audioSource = options.audioSource;
        this._positionLeft = options.positionLeft;
    }


    commit(context) {

        let size = context.size;
        let canvasSize = [size[0]*2,size[1]*2];

        let canvasCtx = this.getContext('2d');
        this.setSize(size, canvasSize);

        let width = canvasSize[0];
        let height = canvasSize[1];

        canvasCtx.fillStyle = 'rgb(0, 0, 0)';
        canvasCtx.clearRect(0, 0, width, height);

        let barWidth = (width / this._audioSource.bufferLength);
        let barHeight;

        if(this._positionLeft){
            var x = width;
        } else {
            var x = 0;
        }

        for(var i = 0; i < this._audioSource.bufferLength; i++) {
            barHeight = this._audioSource.streamData[i];

            canvasCtx.shadowOffsetX = 5;
            canvasCtx.shadowOffsetY = 5;
            canvasCtx.shadowBlur = 10;

            //let color = this._audioSource.volume/56;
            //if(color < 20 || color > 255){color = 20} else { color = this._audioSource.volume/40}

            canvasCtx.fillStyle = 'rgba(0,'+(barHeight+40) +',100,0.5)';
            canvasCtx.fillRect(x,height/2-barHeight,barWidth,barHeight);
            canvasCtx.fillStyle = 'rgba(0,'+(barHeight+60) +',100,0.5)';
            canvasCtx.fillRect(x,height/2-barHeight/2,barWidth,barHeight/2);
            canvasCtx.fillStyle = 'rgba(0,'+(barHeight+40) +',100, 0.25)';
            canvasCtx.fillRect(x,height/2-barHeight*1.5,barWidth,barHeight*1.5);

            canvasCtx.fillStyle = 'rgba(0,'+(barHeight+40) +',100,0.5)';
            canvasCtx.fillRect(x,height/2+barHeight,barWidth,-barHeight);
            canvasCtx.fillStyle = 'rgba(0,'+(barHeight+60) +',100,0.5)';
            canvasCtx.fillRect(x,height/2+barHeight/2,barWidth,-barHeight/2);
            canvasCtx.fillStyle = 'rgba(0,'+(barHeight+40) +',100, 0.25)';
            canvasCtx.fillRect(x,height/2+barHeight*1.5,barWidth,-barHeight*1.5);

            if(this._positionLeft){
                x -= barWidth + 1;
            } else {
                x += barWidth + 1;
            }

        }
        super.commit(context);
    }
}
