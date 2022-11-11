<template>
	<pre>{{ 'test' }}</pre>
</template>

<style lang="scss" scoped></style>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
	mounted() {
		console.log('hi', this.$route);
	}
});
</script>
