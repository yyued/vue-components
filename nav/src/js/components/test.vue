<template>
    <div id="page">
        <nav-component defalutActive="1-1" default-open="1" @choose="chooseEvent">
            <nav-menu title="a" index="1">
                <nav-menu-item index="1-1">1-1</nav-menu-item>
                <nav-menu-item index="1-2">1-2</nav-menu-item>
                <nav-menu-item index="1-3">1-3</nav-menu-item>
            </nav-menu>
            <nav-menu title="b" index="2">
                <nav-menu-item index="2-1">2-1</nav-menu-item>
                <nav-menu-item index="2-2">2-2</nav-menu-item>
                <nav-menu-item index="2-3">2-3</nav-menu-item>
            </nav-menu>
        </nav-component>
    </div>
</template>

<style lang="scss">
html, body, #app, #page {
    width: 100%;
    height: 100%;
}
</style>

<script>
import navComponent from '../nav';

export default {
    components: {
        'nav-component': navComponent,
    },
    methods: {
        chooseEvent ( index ) {
            console.log('choose index : ', index);
        }
    }
};
</script>
