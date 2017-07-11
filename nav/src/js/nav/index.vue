<template>
    <nav>
        <slot></slot>
    </nav>
</template>

<style lang="scss">
@import "./style";

nav {
    width: 200px;
    height: 100%;
    background-color: $navBackgroundColor;
    border-right: 1px solid $navBorderColor;
}  
</style>

<script>
import menu from './menu';
Vue.component('nav-menu', menu);

export default {
    props: {
        defalutActive: {
            default: void 0,
        },
        defaultOpen: {
            default: void 0,
        },
    },
    mounted () {
        this.ChildrenBus();
        this.$emit('nav-active-open', this.defaultOpen);
        this.$emit('nav-active-choose', this.defalutActive);
    },
    methods: {
        ChildrenBus ( ) {
            this.$children.forEach(( item ) => {
            	item.BUS(this);
            });
            this.$on('nav-active-choose', ( index ) => {
                this.$emit('choose', index);
            })
        },
    },
};
</script>