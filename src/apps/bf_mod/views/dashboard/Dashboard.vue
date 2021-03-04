<template>
	<div class="container">
		<div id="main" :class="{ 'show-right': showRight }" ref="main">
			<bf-chat id="chat-window" />
			<div class="activity-wrapper">
				<bf-activity v-for="activity in activities" :key="activity._id" :type="activity.type" />
			</div>
		</div>
		<sidebar :isHidden="showRight" />
	</div>
</template>

<script lang="ts">
import sidebar from './components/Sidebar.vue';
import BfChat from '@/components/bf-chat.vue';
import BfActivity from '@/components/bf-activity.vue';

import Vue from 'vue';
import { ActivityInterface } from '@/interfaces/activity';

export default Vue.extend({
	data() {
		return {
			hideSidebar: false,
			ws: null as WebSocket | null,
			activities: [] as ActivityInterface[]
		};
	},

	mounted() {
		this.$store.commit('setRight', true);
		const serverPort = 5000;
		this.ws = new WebSocket(`ws://${location.hostname}:${serverPort}/ws`);

		this.ws.onopen = () => {
			this.send({
				method: 'CONNECT',
				params: {
					client: 'bf_mod'
				}
			});
		};

		this.ws.onmessage = async (event) => {
			try {
				if (typeof event.data !== 'string') return;
				const data = JSON.parse(event.data);

				if (!data.method) return;

				switch (data.method) {
					case 'CONNECT':
						break;

					case 'POST':
						switch (data.type) {
							case 'activity':
								console.log(data.params);

								break;

							default:
								break;
						}
						break;
				}
			} catch (err) {
				console.error(err);
			}
		};
	},

	components: {
		sidebar,
		BfChat,
		BfActivity
	},

	computed: {
		showRight() {
			return this.$store.state.showRight;
		}
	},

	methods: {
		send(data: any) {
			this.ws?.send(JSON.stringify(data));
		}
	}
});
</script>

<style lang="scss" scoped>
.container {
	height: 100%;
}

#main {
	display: grid;
	grid-template-rows: auto 150px;
	grid-template-columns: 1fr;
	grid-template-areas: 'chat' 'activity';
	height: 100%;
	transition: 0.3s;
	transition-timing-function: cubic-bezier(0.25, 0, 0.75, 1);
	width: calc(100% - 2px);
}

#main.show-right {
	width: calc(100vw - 300px);
}

#chat-window {
	grid-area: chat;
	height: 100%;
	overflow: hidden;
}
</style>
