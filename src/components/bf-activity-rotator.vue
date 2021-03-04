<template>
	<div class="activity">
		<div :class="{ data: true, show: type === 'cheer' }">
			<span>Latest Cheer: {{ cheerData.name }} ({{ cheerData.amount }} Bits)</span>
		</div>
		<div :class="{ data: true, show: type === 'subscription' }">
			<span>Latest Sub: {{ subData.name }}{{ compSubNumber }} </span>
		</div>
		<div :class="{ data: true, show: type === 'donation' }">
			<span>Latest Donation: {{ donationData.name }}: {{ donationData.amount }}€ </span>
		</div>
		<div :class="{ data: true, show: type === 'follow' }">
			<span>Latest Follow: {{ followData.name }}</span>
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
	.data {
		position: absolute;
		display: block;
		bottom: 0;
		right: 0;
		transition: all 0.5s;
		transform: translateY(100px);
		width: 500px;
		opacity: 0;
	}

	.show {
		transform: translateX(0);
		opacity: 1;
	}
}
</style>

<docs>
## Expamle

```jsx
<bf-activity type="test" />
```
</docs>
