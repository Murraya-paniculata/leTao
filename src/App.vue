<template>
    <div id="app">
        <nav-header></nav-header>
        <router-view></router-view>
        <nav-footer></nav-footer>
    </div>
</template>

<script>
    import navHeader from './components/header.vue'
    import navFooter from './components/footer.vue'

    export default {
        name: 'app',
        data() {
            return {}
        },
        components: {
            navHeader,
            navFooter
        }
    }
</script>

<style>
    .left {
        width: 20%;
        border: 1px solid gray;
        float: left;
    }
</style>
