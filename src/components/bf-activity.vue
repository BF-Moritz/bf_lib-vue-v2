<template>
	<div class="activity"></div>
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
