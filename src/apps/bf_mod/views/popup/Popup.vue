<template>
	<bf-chat-card v-if="message" :message="message" />
</template>

<script lang="ts">
import Vue from 'vue';
import BfChatCard from '@/components/bf-chat-card.vue';

export default Vue.extend({
	data() {
		return {
			message: null
		};
	},

	mounted() {
		this.$store.commit('setRight', false);
		if (this.$route.query.message) {
			this.message = JSON.parse(this.$route.query.message as string);
		}
	},

	components: {
		BfChatCard
	}
});
</script>

<style></style>
