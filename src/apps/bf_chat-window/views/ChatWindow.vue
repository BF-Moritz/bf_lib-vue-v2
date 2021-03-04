<template>
	<div id="chat-window">
		<div class="nav">
			<h1>BF_Chat-Window</h1>
			<div class="btn">Close</div>
		</div>
		<div class="chat-wrapper">
			<bf-chat-card
				v-for="message in messages"
				:key="message._id"
				class="chat"
				:message="message"
				showPin
				showDelete
				bgColor="rgba(11, 16, 19, 0.9)"
				@pin="pinMessage(message)"
			/>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.nav {
	height: 30px;
	background-color: rgba(0, 0, 0, 0.7);
	overflow: hidden;
	-webkit-app-region: drag;
	display: flex;
	top: 0;
	z-index: 10;
	width: 100%;
	* {
		-webkit-app-region: no-drag;
	}

	h1 {
		margin: 4px;
		font-size: 16px;
		font-weight: 300;
		color: white;
	}

	.btn {
		margin: 4px;
		margin-left: auto;
		background-color: rgba(0, 255, 242, 0.5);
		padding: 0 6px;
		color: white;
		align-content: center;
		text-align: center;
		cursor: pointer;
	}

	.btn:hover {
		background-color: rgba(0, 255, 242, 0.7);
	}
}

.chat-wrapper {
	background-color: rgba(0, 0, 0, 0.2);
	overflow-y: scroll;
	height: calc(100vh - 30px);
}

.chat {
	margin: 5px;
	width: calc(100% - 10px);
}

::-webkit-scrollbar {
	display: none;
}
</style>

<script lang="ts">
import Vue from 'vue';
import BfChatCard from '@/components/bf-chat-card.vue';
import { ChatWindowSettingsInterface } from '@/interfaces/settings';
import { MessageDBInterface } from '@/interfaces/message';
import { remote } from 'electron';
import { sleep } from '@/utils/sleep';

const serverPort = 5000;
const serverAdress = '192.168.0.211';

export default Vue.extend({
	components: {
		BfChatCard
	},
	data() {
		return {
			settings: null as null | ChatWindowSettingsInterface,
			messages: [] as MessageDBInterface[],
			ws: null as null | WebSocket,
			popup: null as Window | null
		};
	},
	mounted() {
		this.ws = new WebSocket(`ws://${serverAdress}:${serverPort}/ws`);

		this.ws.onopen = () => {
			this.send({
				method: 'CONNECT',
				params: {
					client: 'bf_chat-window'
				}
			});
		};

		this.ws.onmessage = async (event) => {
			try {
				if (typeof event.data != 'string') {
					return;
				}
				const data = JSON.parse(event.data);
				switch (data.method) {
					case 'CONNECT':
						switch (data.type) {
							case 'CONNECT':
								this.settings = data.params.settings as ChatWindowSettingsInterface;
								break;
						}
						break;
					case 'GET':
						switch (data.type) {
						}
						break;
					case 'POST':
						switch (data.type) {
							case 'messages':
								this.messages.unshift(...data.params.messages);
								break;
						}
						break;
					default:
						console.log(data.method, data);
						break;
				}
			} catch (err) {
				console.error(err);
			}
		};

		this.ws.onclose = async () => {
			this.$router.go(0);
		};
		this.ws.onerror = (err) => {
			console.error('error', err);
			this.$router.go(0);
		};
	},

	methods: {
		send(data: any) {
			this.ws?.send(JSON.stringify(data));
		},

		pinMessage(message: MessageDBInterface) {
			this.popup?.close();

			const url = `${location.origin}/#/popup?message=${encodeURIComponent(JSON.stringify(message))}`;
			this.popup = window.open(
				url,
				'pop-up',
				'width=600,height=100,status=no,scrollbars=no,resizable=off,location=off'
			);

			this.popup?.focus();
		}
	}
});
</script>
