<template>
    <transition name="fade">
        <div class="alert-box" v-show="isShow" @click="trigger( $event )">
            <div class="alert-box-content" :class="[ customClass ]">
                <div class="alert-box-content-title">
                    {{ title }}
                    <i @click="trigger( $event )">
                        <img src="./close.svg" inline />
                    </i>
                </div>
                <div class="alert-box-content-message">
                    <template v-if="message">
                        {{ message }}
                    </template>
                    <template v-else>
                        <slot></slot>
                    </template>
                </div>
                <div class="alert-box-content-footer" v-if="buttons.length > 0">
                    <button v-for="( item, $index ) in buttons" :key="$index" @click="clickEvent( $index )">
                        {{ item }}
                    </button>
                </div>
            </div>
        </div>
    </transition>
</template>

<style lang="scss">
.alert-box .alert-box-content-title i {
    svg {
        width: 100%;
        height: 100%;
        display: block;
        path {
            fill: rgba(0, 0, 0, .4);
            transition: fill .2s ease;
        }
    }
    &:hover {
        svg path {
            fill: rgba(0, 0, 0, .7);
        }
    }
    &:active {
        svg path {
            fill: rgba(0, 0, 0, .9);
        }
    }
}
</style>

<style lang="scss" scoped>
.alert-box {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    &::before {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .2);
        content: "";
        z-index: 1;
    }
}   

.fade-enter-active, .fade-leave-active {
    transition: opacity .2s ease;
    opacity: 1;
}
.fade-enter, .fade-leave-to {
    opacity: 0;
} 

.alert-box-content {
    position: relative;
    width: 400px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .1);
    background-color:  #FFF;
    z-index: 2;
}

.alert-box-content-title {
    padding: 0 20px;
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    font-weight: 600;
    i {
        position: absolute;
        top: 20px;
        right: 20px;
        width: 15px;
        height: 15px;
        display: block;
        cursor: pointer;
    }
}

.alert-box-content-message {
    width: 100%;
    padding: 20px;
    font-size: 14px;
    border-top: 1px solid #eee;
}

.alert-box-content-footer {
    padding: 0 10px;
    width: 100%;
    height: 50px;
    line-height: 50px;
    border-top: 1px solid #eee;
    display: flex;
    justify-content: flex-end;
    button {
        margin: 10px 0 0 10px;
        min-width: 60px;
        height: 30px;
        border-radius: 5px;
        border: 1px solid #eee;
        cursor: pointer;
    }
}
</style>

<script>
export default {
    getOriginData () {
        return Object.assign({}, {
            isShow: false,
            title: 'title',
            message: 'message',
            buttons: [],
            customClass: '',
            vnode: void 0,
            callback: void 0,
            active: void 0,
        })
    },
    created () {
        if ( typeof this.message === 'object' ) {
            this.$slots.default = [ this.message ];
            this.message = void 0;
        }
    },
    mounted () {
        this.isShow = true;
        if ( this.buttons.length <= 0 ) {
            setTimeout( () => {
                this.hide();
            }, 3000);
        }
        document.body.addEventListener('keyup', this.trigger);
    },
    beforeDestroy () {
		this.$el.parentNode.removeChild( this.$el );
	},
    methods: {
        hide () {
            this.isShow = false;
            setTimeout( () => {
                this.$destroy();
            }, 200);
            document.body.removeEventListener('keyup', this.trigger);
        },
        clickEvent ( index ) {
            this.active = index;
        },
        trigger ( $event, $index ) {
            if ( this.callback ) {
                this.callback( 
                    typeof this.active !== 'undefined' ? this.active : -1 
                );
            }
            this.hide();
        },
    }
};
</script>
