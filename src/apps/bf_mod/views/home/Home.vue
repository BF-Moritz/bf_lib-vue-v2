<template>
	<div id="container">
		<div id="links">
			<router-link v-for="(link, i) in links" :key="i" :to="link.destination">
				<div class="link-box">
					<span :class="['link-icon', 'mdi', link.icon]" />
					<span class="link-name">{{ link.name }}</span>
				</div>
			</router-link>
		</div>
		<div id="content"></div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
	mounted() {
		this.$store.commit('setRight', false);
	},

	data() {
		return {
			links: [
				{
					destination: 'auth',
					name: 'Authorization',
					icon: 'mdi-ticket-confirmation-outline'
				},
				{
					destination: 'overlays',
					name: 'Overlays',
					icon: 'mdi-picture-in-picture-bottom-right-outline'
				}
			]
		};
	}
});
</script>

<style lang="scss" scoped>
#container {
	display: grid;
	padding: 10px;
	grid-template-columns: 250px 1fr;
	gap: 10px;
	height: 100%;
	box-sizing: border-box;
}

#links {
	overflow: auto;
	background-color: rgba($color: #000000, $alpha: 0.1);
	direction: rtl;
	padding: 2px;
	border: solid 1px rgb(220, 220, 220);

	a {
		text-decoration: none;
	}

	.link-box {
		padding: 10px;
		text-align: center;
		background-color: rgba($color: #000000, $alpha: 0.3);
		color: rgb(220, 220, 220);
		margin-bottom: 5px;
		border: solid 1px rgb(220, 220, 220);
	}

	.link-box:hover {
		background-color: rgba($color: #000000, $alpha: 0.4);
	}
}

#content {
	overflow-x: hidden;
	overflow-y: auto;
}
</style>
