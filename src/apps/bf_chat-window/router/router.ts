import Vue from 'vue';
import VueRouter from 'vue-router';
import ChatWindow from '../views/ChatWindow.vue';
import Popup from '../views/Popup.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'home',
		component: ChatWindow
	},
	{
		path: '/popup',
		name: 'popup',
		component: Popup
	}
	// {
	// 	path: '*',
	// 	component: () => import('pages/Error404.vue')
	// }
];

const router = new VueRouter({
	routes
});

export default router;
