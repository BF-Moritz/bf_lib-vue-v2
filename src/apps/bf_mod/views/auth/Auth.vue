<template>
	<div class="authWrapper">
		<div class="authCard" v-for="link in links" :key="link.name">
			<h1>{{ link.name.toUpperCase() }}</h1>
			<a :href="link.url" target="_blank">
				Authenticate
			</a>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';

import { AuthLinks } from '@/stores/authLinks.store';
import { authLinkStoreInterface } from '@/interfaces/authLinksStore';

export default Vue.extend({
	data() {
		return {
			links: [] as authLinkStoreInterface[]
		};
	},

	async mounted() {
		this.links = await AuthLinks.getAuthLinks();
	}
});
</script>

<style lang="scss" scoped>
.authWrapper {
	display: grid;
	grid-gap: 10px;
	margin: 10px;
	grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
	box-sizing: border-box;

	.authCard {
		padding: 5px 5px 10px;
		background-color: rgba($color: #000000, $alpha: 0.3);
		text-align: center;
		border: solid 1px rgb(220, 220, 220);

		h1 {
			color: rgb(220, 220, 220);
			margin: 5px 0 10px;
		}

		a {
			padding: 5px;
			margin-bottom: 10px;
			text-decoration: none;
			color: rgb(220, 220, 220);
			font-size: 20px;
			background-color: rgba(81, 196, 24, 0.4);
			border-radius: 5px;
		}

		a:hover {
			background-color: rgba(81, 196, 24, 0.6);
			color: rgb(240, 240, 240);
		}
	}

	.authCard:hover {
		background-color: rgba($color: #000000, $alpha: 0.4);
	}
}
</style>
