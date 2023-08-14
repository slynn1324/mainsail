<template>
    <div style="position: relative" class="d-flex justify-center">
        <iframe v-observe-visibility="visibilityChanged" class="webcamIframe" :src="url"></iframe>
    </div>
</template>

<script lang="ts">
import { Component, Mixins, Prop } from 'vue-property-decorator'
import BaseMixin from '@/components/mixins/base'

@Component
export default class IframeWebcam extends Mixins(BaseMixin) {

    private isVisible = true

    @Prop({ required: true }) 
    camSettings: any

    get url() {
        if (!this.isVisible) return ''

        return this.camSettings.urlStream || ''
    }

    visibilityChanged(isVisible: boolean) {
        this.isVisible = isVisible
    }

}
</script>

<style scoped>
.webcamIframe {
    width: 100%;
    aspect-ratio: 16/9;
    border: none;
}

</style>
