<template>
    <li 
        :class="{ 'active': active == index }"
        @click="clickEvent( index )"
    ><slot></slot></li>
</template>

<style lang="scss" scoped>
@import "./style";

li {
    position: relative;
    padding: 0 40px;
    width: 100%;
    font-size: 12px;
    cursor: pointer;
    transition: background-color .2s ease;
    &:hover {
        background-color: $itemHoverColor;
    }
}
.active {
    background-color: $activeBackgroundColor;
}
</style>

<script>
export default {
    props: [ 'index' ],
    data () {
        return {
            active: void 0,
        };
    },
    methods: {
        BUS ( vm ) {
            vm.$on('nav-active-choose', ( index ) => {
                this.active = index;
            })
            this.clickEvent = ( index ) => {
                vm.$emit('nav-active-item-choose', index);
            }
        },
    }
};
</script>