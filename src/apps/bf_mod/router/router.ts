import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/home/Home.vue';
import Dashboard from '../views/dashboard/Dashboard.vue';
import Popup from '../views/popup/Popup.vue';
import Auth from '../views/auth/Auth.vue';
import Overlays from '../views/overlays/Overlays.vue';
import API from '../views/api/API.vue';
import Start from '../views/overlays/views/Start.vue';
import Coding from '../views/overlays/views/Coding.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'home',
		component: Home
	},
	{
		path: '/dashboard',
		name: 'dashboard',
		component: Dashboard
	},
	{
		path: '/popup',
		name: 'popup',
		component: Popup
	},
	{
		path: '/auth',
		name: 'auth',
		component: Auth
	},
	{
		path: '/overlays',
		name: 'Overlays',
		component: Overlays
	},
	{
		path: '/overlays/start',
		name: 'Overlays.Start',
		component: Start
	},
	{
		path: '/overlays/coding',
		name: 'Overlays.Coding',
		component: Coding
	},
	{
		path: '/api*',
		name: 'API',
		component: API
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
