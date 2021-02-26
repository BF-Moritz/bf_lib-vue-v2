<template>
	<div class="activity">
		<div v-if="type === 'cheer'">
			<span class="data">Latest Cheer: {{ cheerData.name }} ({{ cheerData.amount }} Bits)</span>
		</div>
		<div v-else-if="type === 'subscription'">
			<span class="data">Latest Sub: {{ subData.name }}{{ compSubNumber }} </span>
		</div>
		<div v-else-if="type === 'donation'">
			<span class="data">Latest Donation: {{ donationData.name }}: {{ donationData.amount }}€ </span>
		</div>
		<div v-else-if="type === 'follow'">
			<span class="data">Latest Follow: {{ followData.name }}</span>
		</div>
	</div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { ActivityType } from '@/interfaces/activity';

export default Vue.extend({
	name: 'bf-activity',
	props: {
		interval: {
			type: Number,
			default: 5000
		}
	},
	data() {
		return {
			type: ('cheer' as any) as PropType<ActivityType>,
			types: [] as PropType<ActivityType[]>,
			cheerData: ({ name: 'testName', amount: 20 } as any) as PropType<any>,
			subData: ({ name: 'testName', amount: 1 } as any) as PropType<any>,
			donationData: ({ name: 'testName', amount: 3 } as any) as PropType<any>,
			followData: ({ name: 'testName' } as any) as PropType<any>
		};
	},
	mounted() {
		['cheer', 'subscription', 'donation', 'follow'].forEach((v) => {
			const value = (v as any) as PropType<ActivityType>;
			this.$data.types.push(value);
		});
		let index = 0;
		setInterval(() => {
			this.$data.type = this.$data.types[index % this.types.length];
			index++;
		}, this.$props.interval);
	},
	components: {},
	computed: {
		compSubNumber() {
			let result = '';
			if (this.$data.subData.amount > 1) {
				result = ` (${this.$data.subData.amount} Monate)`;
			}
			return result;
		}
	},
	methods: {}
});
</script>

<style lang="scss" scoped>
.activity {
	color: rgb(220, 220, 220);
	font-family: 'Lato';
	font-size: 24px;
}
</style>

<docs>
## Expamle

```jsx
<bf-activity type="test" />
```
</docs>
