<style lang="less" scoped type="text/less">

</style>

<template>
    <div>
        <div class="md-modal modal-meg md-modal-transition" :class="{'md-show': mdShow}">
            <div class="md-modal-inner">
                <div class="md-top">
                    <div class="md-title">
                        <slot name="title"></slot>
                    </div>
                    <button class="md-close" @click="closeModal">Close</button>
                </div>
                <div class="md-content">
                    <div class="confirm-tips">
                        <slot name="message"></slot>
                        <div class="btn-wrap">
                            <slot name="btn-Group"></slot>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="mdShow" class="md-overlay" @click="closeModal"></div>
    </div>
</template>

<script>
    export default {
        props: ['mdShow'],
        data() {
            return {}
        },
        components: {},
        computed: {},
        methods: {
            closeModal(){
                this.$emit('close')
            }
        },
        mounted() {

        }
    }
</script>
