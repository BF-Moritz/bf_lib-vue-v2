<template>
	<div class="activity">
		<div v-if="type === 'newViewer'"></div>
		<div v-else-if="type === 'cheer'"></div>
		<div v-else-if="type === 'subscription'"></div>
		<div v-else-if="type === 'donation'"></div>
		<div v-else-if="type === 'host'"></div>
		<div v-else-if="type === 'raid'"></div>
		<div v-else-if="type === 'follow'"></div>
	</div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { ActivityType } from '@/interfaces/activity';

export default Vue.extend({
	name: 'bf-activity',
	props: {
		type: {
			type: String as PropType<ActivityType>,
			required: true
		}
	},
	components: {},
	computed: {},
	methods: {}
});
</script>

<style lang="scss" scoped></style>

<docs>
## Expamle

```jsx
<bf-activity type="test" />
```
</docs>
