import '../alert-box/index';

function render ( h ) {
    return (
        <div class="extend">我是一个扩展的内容盒子</div>
    );
}

Vue.prototype.$extendAlert = ( vm, callback ) => {
    const buttons = ['取消', '确定'];
    const title = 'extend alert box';
    Vue.prototype.$alert({
        title,
        buttons,
        message: render( vm.$createElement ),
        callback,
    })
}