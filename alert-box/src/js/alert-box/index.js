import component from './index.vue';

Vue.prototype.$alert = ( args ) => {
    const originData = component.data();

    component.data = () => {
        return Object.assign(originData, args);
    }

    component.el = document.createElement('div');

    const componentConstructor = new Vue(component);
	document.body.appendChild(componentConstructor.$el);

	return componentConstructor;
}