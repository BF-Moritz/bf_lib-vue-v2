<template>
	<div id="playing-wrapper">
		<div class="bg-image" :style="{ backgroundImage: `url(${image.url})` }" />
		<div class="album-cover">
			<img class="image" v-if="info !== null" :src="image.url" alt="album cover" />
			<div class="image-missing" v-else>404</div>
		</div>
		<div class="info-wrapper">
			<span class="name">{{ name || 'nix' }}</span>
			<div class="line" />
			<span class="artists">{{ artists || 'niemandem' }}</span>
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
	padding: 5px;
	border-radius: 15px;
	overflow: hidden;

	.bg-image {
		width: calc(100% + 20px);
		height: calc(100% + 20px);
		position: absolute;
		background-color: black;
		z-index: -1;
		left: -10px;
		top: -10px;
		filter: blur(5px) saturate(0.5) brightness(0.4);
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
		opacity: 0.8;
	}

	.album-cover {
		background-color: rgba($color: #000000, $alpha: 0.8);
		// border: solid 1px rgb(220, 220, 220);
		width: 70px;
		height: 70px;
		box-shadow: 0 0 2px black;
		box-sizing: border-box;
		border-radius: 10px;
		overflow: hidden;

		.image,
		.image-missing {
			width: 100%;
			height: 100%;
			border-radius: 5px;
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
		padding: 0px 15px 0 10px;
		box-sizing: border-box;
		color: rgb(220, 220, 220);

		.line {
			background-color: rgb(220, 220, 220);
			height: 1px;
			margin: 5px 0;
		}

		.name,
		.artists {
			width: fit-content;
			display: block;
			margin: 0;
			padding-right: 15px;
			align-items: center;
			font-weight: 700;
			font-size: 18px;
		}
	}
}
</style>
