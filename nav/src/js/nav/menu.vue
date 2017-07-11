<template>
    <div 
        :class="{ 'active-menu': isShowItem, 'active': active == index }" 
        class="menu"
    >
        <title @click="clickEvent( index )">
            {{ title }}
            <i v-once v-html="icon$arrow"></i>
        </title>
        <ul>
            <slot></slot>
        </ul>
    </div>
</template>

<style lang="scss">
.menu title i svg {
    width: 100%;
    height: 100%;
    display: block;
}
</style>

<style lang="scss" scoped>
@import "./style";

.menu {
    position: relative;
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    transition: all .2s ease;
    overflow: hidden;
    & > title {
        position: relative;
        padding: 0 20px;
        width: 100%;
        height: 50px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        transition: background-color .2s ease;
        cursor: pointer;
        display: block;
        -webkit-touch-callout: none;
        user-select: none;
        &:hover {
            background-color: $itemHoverColor;
        }
        i {
            position: absolute;
            top: 20px;
            right: 10px;
            width: 12px;
            height: 12px;
            transition: transform .2s ease;
            transform: rotateZ( -90deg );
        }
    }
    & > ul {
        border-top: 1px solid $navBorderColor;
        border-bottom: 1px solid $navBorderColor;
        height: auto;
        background-color:  $menuBackgroundColor;
        overflow: hidden;
    }
}

.active-menu {
    & > title {
        i {
            transform: rotateZ( 0 ) !important;
        }
    }
}   

.active {
    & > title {
        background-color: $activeBackgroundColor;
    }
}  
</style>

<script>
import item from './item';
Vue.component('nav-menu-item', item);

export default {
    props: [ 'title', 'index' ],
    data () {
        return {
            active: void 0,
            activeMenu: void 0,
            icon$arrow: require('./arrow.raw.svg'),
            isShowItem: false,
            // 打开 是否互斥
            mutex: false,
        };
    },
    methods: {
        BUS ( vm ) {
            vm.$on('nav-active-open', ( index ) => {
                this.activeMenu = index;
            })
            vm.$on('nav-active-choose', ( index ) => {
                this.active = index;
                this.$emit('nav-active-choose', index);
            })
            this.clickEvent = ( index ) => {
                if ( this.index == index ) {
                    this.isShowItem = !this.isShowItem;    
                }
                this.activeMenu = index;
                this.active = index;
                if ( this.mutex ) {
                    vm.$emit('nav-active-open', index);
                }
                vm.$emit('nav-active-choose', index);
            }
            this.$children.forEach(( item ) => {
            	item.BUS( this );
            });
            this.$on('nav-active-item-choose', ( index ) => {
                this.active = index;
                vm.$emit('nav-active-choose', index);
            })
        },
        transition$afterEnter ( ) {
            const lis = this.$el.querySelectorAll('li').length;
            this.$el.style.height = `${ ( lis + 1 ) * 50 }px`;
        },
        transition$leave () {
            this.$el.style.height = '';
        },
    },
    watch: {
        isShowItem ( v ) {
            if ( v ) {
                this.transition$afterEnter()
            } else {
                this.transition$leave()
            }
        },
        activeMenu ( v ) {
            if ( v === this.index ) {
                this.isShowItem = true;
            } else {
                this.isShowItem = false;
            }
        }
    },
};
</script>