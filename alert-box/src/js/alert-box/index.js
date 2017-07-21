import component from './index.vue';

Vue.prototype.$alert = ( args ) => {
    // 重构默认数据结构
    const originData = component.methods.getOriginData();

    component.data = () => {
        return Object.assign(originData, args);
    }

    component.el = document.createElement('div');

    const componentConstructor = new Vue( component );
	document.body.appendChild( componentConstructor.$el );

	return componentConstructor;
}
