<template>
    <!-- 复用 cell -->
    <div ref="list" class="list">
        <div class="content" :style="{ height: list.length * itemViewHeight + 'px' }">
            <ul :style="{ transform: `translate3d(0,${ itemViewHeight * startIndex }px,0)` }">
                <li v-for="(item, $index) in startLength" key="$index">
                    <img src="https://legox.org/img/30/30/57ad68/fff/">
                    {{ list[ startIndex + $index ] }}
                </li>
            </ul>
        </div>
    </div>

    <!-- 测试不复用 cell -->
    <!-- < div ref="list" class="list">
        <ul>
            <li v-for="(item, $index) in list" key="$index">
                <img src="https://legox.org/img/30/30/57ad68/fff/" alt="">
                {{ item }}
            </li>
        </ul>
    </div> -->
</template>

<style lang="scss">
html, body {
    width: 100%;
    height: 100%;
    overflow: hidden;
}
</style>

<style lang="scss" scoped>
.list {
    width: 100%;
    height: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
}
ul {
    li {
        width: 100%;
        height: 50px;
        line-height: 50px;
        font-size: 20px;
        text-align: center;
        border-bottom: solid 1px #ccc;
    }
}
</style>

<script>
const list = [];
for ( let i = 0, max = 1000; i < max; ++i ) {
    list.push( i );
}

export default {
    data () {
        return {
            list,
            startIndex: 0,
            startLength: 0,
            pageNum: 2,
            everyPageIndexNum: 0,
            listViewHeight: window.innerHeight,
            itemViewHeight: 50,
        }
    },
    created () {
        this.everyPageIndexNum = parseInt( (this.listViewHeight / this.itemViewHeight) );
        if ( this.startIndex + this.everyPageIndexNum * this.pageNum < this.list.length ) {
            this.startLength = this.everyPageIndexNum * this.pageNum;
        } else {
            this.startLength = this.list.length;
        }
    },
    mounted () {
        const list = this.$refs.list;
        const FLAG = 4;
        const AFTER_START_INDEX = this.everyPageIndexNum / FLAG;
        const LAST_START_INDEX = this.list.length - this.startLength;
        let nowIndex = 0;
        let lastTop = 0;
        list.addEventListener('scroll', ( e ) => {
            const top = list.scrollTop;
            const _nowIndex = ( top / this.itemViewHeight ).toFixed( 0 );
            if ( _nowIndex == nowIndex ) {
                return 0;
            }
            nowIndex = parseInt( _nowIndex );

            if ( top > lastTop ) {
                // console.log( 'down' );
                if ( nowIndex > AFTER_START_INDEX ) {
                    this.startIndex = parseInt( nowIndex - AFTER_START_INDEX );
                }
                if ( this.startIndex >= LAST_START_INDEX ) {
                    this.startIndex = LAST_START_INDEX;
                }
            }
            else {
                // console.log( 'up' );
                if ( this.startIndex > 0 ) {
                    this.startIndex = parseInt( nowIndex - AFTER_START_INDEX );
                }
            }
            lastTop = top;
            // console.log( this.startIndex );
        });
    },
};
</script>
