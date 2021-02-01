<template> </template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
	mounted() {
		this.$store.commit('setRight', false);
	}
});
</script>

<style></style>
