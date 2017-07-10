<template>
    <div>
        <h1>Alert Box</h1>
        <button @click="clickEvent1">Click Me</button>
        <h1>Extend Alert Box</h1>
        <button @click="clickEvent2">Click Me</button>
    </div>
</template>

<style lang="scss" scoped>
h1 {
    width: 100%;
    color: red;
    text-align: center;
}

button {
    margin: 20px auto;
    width: 100px;
    height: 50px;
    border: 1px solid #ccc;
    border-radius: 10px;
    display: block;
    cursor: pointer;
}
</style>

<script>
// import '../alert-box/index';
import './extend-alert-box';

export default {
    data () {
        return {
            msg: 'foo',
        }
    },
    methods: {
        clickEvent1 () {
            this.$alert({
                title: 'foo',
                message: 'bar',
                buttons: ['test'],
                callback: ( index ) => {
                    console.log('alert box : ', index);
                }
            })
        },
        clickEvent2 () {
            this.$extendAlert(this, ( index ) => {
                console.log('extend alert box : ', index);
            })
        },
    }
};
</script>
