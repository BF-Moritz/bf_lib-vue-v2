<template>
	<div>
		<bf-spotify-current-playing class="spotify" />
		<bf-activity-rotator class="activity" />
	</div>
</template>

<script lang="ts">
import bfSpotifyCurrentPlaying from '@/components/bf-spotify-current-playing.vue';
import bfActivityRotator from '@/components/bf-activity-rotator.vue';
import Vue from 'vue';
export default Vue.extend({
	name: 'coding',
	components: {
		bfSpotifyCurrentPlaying,
		bfActivityRotator
	}
});
</script>

<style lang="scss" scoped>
.spotify {
	position: fixed;
	bottom: 45px;
	left: 10px;
}

.activity {
	position: fixed;
	bottom: 10px;
	right: 300px;
	text-align: right;
}
</style>
