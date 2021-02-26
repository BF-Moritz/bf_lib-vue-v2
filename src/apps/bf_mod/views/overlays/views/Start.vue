<template>
	<bf-spotify-current-playing></bf-spotify-current-playing>
</template>

<script lang="ts">
import Vue from 'vue';
import BfSpotifyCurrentPlaying from '@/components/bf-spotify-current-playing.vue';

export default Vue.extend({
	components: {
		BfSpotifyCurrentPlaying
	}
});
</script>

<style lang="scss" scoped></style>
