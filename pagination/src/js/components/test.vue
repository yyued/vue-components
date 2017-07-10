<template>
    <div>
        <h1>Pagination</h1>
        <pagination :total="total" :current="current" @choose="chooseEvent"></pagination>
    </div>
</template>

<style lang="scss" scoped>
h1 {
    margin-bottom: 20px;
    width: 100%;
    color: red;
    text-align: center;
}
</style>

<script>
import pagination from '../pagination/index';

export default {
    components: {
        pagination,
    },
    data () {
        return {
            total: 10,
            current: 1,
        };
    },
    methods: {
        chooseEvent ( index ) {
            console.log('page to ', index);
            this.current = index;
        }
    }
};
</script>
