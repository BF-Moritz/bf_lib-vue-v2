<template>
	<div id="popup">
		<bf-chat-card
			v-if="message"
			class="chat"
			:message="message"
			bgColor="rgba(11, 16, 19, 0.9)"
			:showClose="true"
			@close="closeWindow"
		/>
	</div>
</template>

<style lang="scss" scoped>
* {
	font-family: 'Lato';
	-webkit-app-region: drag;
}

::-webkit-scrollbar {
	display: none;
}
</style>

<script lang="ts">
import Vue from 'vue';
import BfChatCard from '@/components/bf-chat-card.vue';
import { MessageDBInterface } from '@/interfaces/message';
import { remote } from 'electron';

export default Vue.extend({
	components: {
		BfChatCard
	},
	data() {
		return {
			message: null as null | MessageDBInterface
		};
	},
	mounted() {
		if (this.$route.query.message) {
			this.message = JSON.parse(this.$route.query.message as string);
		}
	},

	methods: {
		closeWindow() {
			const window = remote.getCurrentWindow();
			window.destroy();
		}
	}
});
</script>
