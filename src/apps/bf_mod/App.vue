<template>
	<div id="app" :style="{ '--body-bg-color': showBG ? '#0193de' : 'transparent' }">
		<div id="nav" v-if="showNav">
			<router-link :to="{ name: 'home' }">
				<div class="header-btns">Home</div>
			</router-link>
			<div class="seperator" />
			<router-link :to="{ name: 'dashboard' }">
				<div class="header-btns">Dashboard</div>
			</router-link>
			<div class="seperator" />
			<span
				id="open-close-btn"
				:class="{ mdi: true, 'mdi-chevron-double-left': true, 'show-right-btn': showRight }"
				v-if="hasRight"
				@click="toggleRight"
			/>
			<span class="mdi mdi-cog-outline" id="settings-btn" />
		</div>
		<div id="content" :class="{ 'full-height': !showNav, 'part-height': showNav }">
			<router-view />
		</div>
	</div>
</template>

<style lang="scss">
* {
	font-family: 'Lato';
}

body {
	margin: 0;
	padding: 0;
	width: 100vw;
	height: 100vh;
	overflow: hidden;
}
#app {
	--body-bg-color: #0193de;
	width: 100%;
	height: 100%;
	overflow: hidden;
	background-color: var(--body-bg-color);

	#nav {
		height: 32px;
		background-color: rgb(11, 16, 19);
		color: rgb(220, 220, 220);

		a {
			color: inherit;
			text-decoration: none;
		}

		span {
			cursor: pointer;
		}

		.seperator {
			width: 1px;
			background-color: rgb(220, 220, 220);
			height: 30px;
			margin: 1px;
			float: left;
		}

		.header-btns {
			float: left;
			margin: 2px;
			padding: 0 15px;
			height: 28px;
			text-align: center;
			font-size: 20px;
			cursor: pointer;
		}

		.header-btns:hover {
			color: #5bc6f4;
			background-color: rgba(91, 198, 244, 0.1);
		}

		#open-close-btn {
			font-size: 32px;
			margin-right: 0;
			float: right;
			transition: margin-right 0.3s, transform 0.3s;
			transition-timing-function: cubic-bezier(0.25, 0, 0.75, 1);
			line-height: 32px;
		}

		#open-close-btn:hover {
			color: #5bc6f4;
		}

		#open-close-btn.show-right-btn {
			margin-right: 240px;
			transition: margin-right 0.3s, transform 0.3s;
			transition-timing-function: cubic-bezier(0.25, 0, 0.75, 1);
			transform: rotate(180deg);
		}

		#settings-btn {
			font-size: 22px;
			padding: 5px;
			float: right;
			line-height: 22px;
		}

		#settings-btn:hover {
			color: #5bc6f4;
		}
	}

	#content {
		overflow: hidden;
		width: 100%;
	}

	.part-height {
		height: calc(100% - 32px);
	}

	.full-height {
		height: 100%;
	}
}

::-webkit-scrollbar {
	width: 4px;
}

::-webkit-scrollbar-track {
	background: none;
}

::-webkit-scrollbar-thumb {
	background: #888;
}

::-webkit-scrollbar-thumb:hover {
	background: #555;
}
</style>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
	data() {
		return {
			hideNavArr: ['popup', 'Overlays.Coding'] as string[],
			hideBGArr: ['Overlays.Coding'] as string[]
		};
	},

	methods: {
		toggleRight() {
			this.$store.commit('toggleRight');
		}
	},

	computed: {
		hasRight() {
			return this.$store.state.hasRight;
		},

		showRight() {
			return this.$store.state.showRight;
		},

		showNav() {
			return !this.$data.hideNavArr.includes(this.$route.name);
		},

		showBG() {
			return !this.$data.hideBGArr.includes(this.$route.name);
		}
	}
});
</script>
