<template>
	<div id="playing-wrapper">
		<div class="album-cover">
			<img class="image" v-if="info !== null" :src="image.url" alt="album cover" />
			<div class="image-missing" v-else>404</div>
		</div>
		<div class="info-wrapper">
			<div class="name">{{ name }}</div>
			<div class="artists">{{ artists }}</div>
		</div>
	</div>
</template>

<script lang="ts">
import { CurrentlyPlayingInterface } from '@/interfaces/spotify';
import Vue, { PropType } from 'vue';

export default Vue.extend({
	name: 'bf-overlay-base',
	data() {
		return {
			ws: null as WebSocket | null,
			info: null as null | CurrentlyPlayingInterface
		};
	},

	props: {},
	computed: {
		image() {
			if (this.info !== null) {
				const thisInfo = this.info as CurrentlyPlayingInterface;
				return thisInfo.item.album.images.sort((a, b) => b.height - a.height)[0];
			} else {
				return '';
			}
		},

		name() {
			if (this.info !== null) {
				const thisInfo = this.info as CurrentlyPlayingInterface;
				return thisInfo.item.name;
			} else {
				return '';
			}
		},

		artists() {
			if (this.info !== null) {
				const thisInfo = this.info as CurrentlyPlayingInterface;
				return thisInfo.item.artists.map((a) => a.name).join(', ');
			} else {
				return '';
			}
		}
	},
	methods: {
		send(data: any) {
			this.ws?.send(JSON.stringify(data));
		}
	},
	mounted() {
		const serverPort = 5000;
		this.ws = new WebSocket(`ws://${location.hostname}:${serverPort}/ws`);
		this.ws.onopen = () => {
			this.send({
				method: 'CONNECT',
				params: {
					client: 'bf-overlay'
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
							case 'spotify':
								this.info = data.params.info;
								console.log(this.info);

								break;
						}
						break;

					default:
						console.log(data.method);

						break;
				}
			} catch (err) {
				console.error(err);
			}
		};

		this.ws.onclose = () => {
			location.reload();
		};
	}
});
</script>

<style lang="scss" scoped>
#playing-wrapper {
	display: flex;
	height: 80px;
	width: fit-content;
	box-sizing: border-box;

	.album-cover {
		background-color: rgba($color: #000000, $alpha: 0.8);
		border: solid 1px rgb(220, 220, 220);
		width: 80px;
		height: 80px;
		padding: 5px;
		box-sizing: border-box;

		.image,
		.image-missing {
			width: 100%;
			height: 100%;
		}

		.image-missing {
			color: rgb(232, 61, 49);
			font-size: 40px;
			font-weight: 600;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}

	.info-wrapper {
		padding: 5px;
		box-sizing: border-box;

		.name,
		.artists {
			background-color: rgba($color: #000000, $alpha: 0.8);
			border: solid 1px rgb(220, 220, 220);
			width: fit-content;
			margin: 0;
			padding: 0 5px;
			display: flex;
			height: 30px;
			align-items: center;
			color: rgb(220, 220, 220);
			font-weight: 700;
		}

		.artists {
			margin-top: 5px;
			font-weight: 400;
		}
	}
}
</style>
