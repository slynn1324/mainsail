<!-- <style scoped>
.webcamImage {
    width: 100%;
    height: calc(width / 1.5);
}
</style>

<template>
    <video ref="stream" v-observe-visibility="visibilityChanged" :src="url" :style="webcamStyle" class="webcamImage" />
</template>

<script lang="ts">
import { Component, Mixins, Prop, Ref } from 'vue-property-decorator'
import BaseMixin from '@/components/mixins/base'

@Component
export default class Ipstreamer extends Mixins(BaseMixin) {
    private isVisible = true

    @Prop({ required: true })
    camSettings: any

    @Prop()
    printerUrl: string | undefined

    @Ref() declare poster: HTMLImageElement

    @Ref() declare stream: HTMLVideoElement

    // TODO: port the player logic into Vue instead of native class in index.html
    private webRtcVideoHandle : any = null;

    isWebRtcUrl() : boolean {
        return ( this.camSettings.urlStream.startsWith("ws://") );
    }

    isAutoplayWebRtcVideo() : boolean {
        return localStorage.getItem("autoplayWebRtcVideo") == "Y";
    }

    get url() {
        if ( this.isWebRtcUrl() ) return '';
            
        if (!this.isVisible) return ''

        return this.camSettings.urlStream || ''
    }

    get posterUrl() {
        return this.camSettings.urlSnapshot;
    }

    get webRtcSrc() {
        if ( this.isWebRtcUrl() ) {
            return this.camSettings.urlStream || '';
        } else {
            return '';
        }
    }

    get webcamStyle() {
        let transforms = ''
        if ('flipX' in this.camSettings && this.camSettings.flipX) transforms += ' scaleX(-1)'
        if ('flipX' in this.camSettings && this.camSettings.flipY) transforms += ' scaleY(-1)'
        if (transforms.trimLeft().length) return { transform: transforms.trimLeft() }

        return ''
    }

    visibilityChanged(isVisible: boolean) {
        this.isVisible = isVisible;

        if ( this.isWebRtcUrl() ){
            // if webrtc, shut down the sockets and destroy the instance handle
            console.log("visibility changed isVisble=" + isVisible);

            if ( !this.isVisible ){
                this.stream.pause();
                if ( this.webRtcVideoHandle ){
                    console.log("closing webrtc video socket");
                    this.webRtcVideoHandle.terminate();
                    this.webRtcVideoHandle = null;
                }
            } else {
                console.log("visible - starting webrtc video");
                this.webRtcVideoHandle = (window as any).startWebRTCVideo(this.stream);
               
                
                if ( this.isAutoplayWebRtcVideo() ){
                    console.log("autoplay enabled");
                    setTimeout(() => {
                        this.stream.play();
                    }, 500);
                } else {
                    console.log("autoplay disabled");
                }
            }

        }

    }
}
</script> -->
