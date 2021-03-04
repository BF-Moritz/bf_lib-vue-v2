<template>
	<div>
		Activity
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

<style lang="scss" scoped></style>
