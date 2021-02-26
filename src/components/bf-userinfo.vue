<template>
	<div
		class="userinfo"
		:style="{
			'--color': color,
			'--font': font,
			'--delete-hover-color:': deleteHoverColor,
			'--pin-hover-color': pinHoverColor
		}"
	>
		<link
			rel="stylesheet"
			href="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/css/flag-icon.min.css"
			integrity="sha512-Cv93isQdFwaKBV+Z4X8kaVBYWHST58Xb/jVOcV9aRsGSArZsgAnFIhMpDoMDcFNoUtday1hdjn0nGp3+KZyyFw=="
			crossorigin="anonymous"
		/>
		<link
			rel="stylesheet"
			href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/fontawesome.min.css"
			integrity="sha512-kJ30H6g4NGhWopgdseRb8wTsyllFUYIx3hiUwmGAkgA9B/JbzUBDQVr2VVlWGde6sdBVOG7oU8AL35ORDuMm8g=="
			crossorigin="anonymous"
		/>
		<link
			rel="stylesheet"
			href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/brands.min.css"
			integrity="sha512-D0B6cFS+efdzUE/4wh5XF5599DtW7Q1bZOjAYGBfC0Lg9WjcrqPXZto020btDyrlDUrfYKsmzFvgf/9AB8J0Jw=="
			crossorigin="anonymous"
		/>
		<link href="https://cdn.materialdesignicons.com/5.3.45/css/materialdesignicons.min.css" rel="stylesheet" />
		<img v-for="badge in resolvedBadges" :key="badge.name" class="badge" :alt="badge.name" :src="badge.url" />
		<span :class="['name', `id-${id}`]" wfd-id="72">
			{{ name }}
		</span>
		<span v-if="countryCode" :class="`country flag-icon flag-icon-${countryCode.toLowerCase()}`" />
		<span v-if="team" class="team">
			<i :class="['team-badge', 'fab', `fa-${team}`]" />
		</span>
		<span v-if="hasBirthday" class="mdi mdi-cake" :style="birthdayColor" />
		<span class="time" wfd-id="71">
			{{ time }}
		</span>
		<span @click="pinMsg" v-if="showPin" class="mdi mdi-pin-outline pin" />
		<span @click="deleteMsg" v-if="showDelete" class="mdi mdi-delete-circle-outline delete" />
		<span @click="closeMsg" v-if="showClose" class="mdi mdi-close-circle-outline close" />
	</div>
</template>

<script lang="ts">
import resolveBadges from '@/utils/resolveBadges';
import * as mdiIcons from '@mdi/js';

import Vue from 'vue';
import { ParsedBadgeInterface } from '@/interfaces/badges';

export default Vue.extend({
	name: 'bf-userinfo',
	props: {
		name: {
			type: String,
			required: true
		},
		badges: {
			type: Array
		},
		showPin: {
			type: Boolean,
			default: false
		},
		showDelete: {
			type: Boolean,
			default: false
		},
		showClose: {
			type: Boolean,
			default: false
		},
		time: {
			type: String,
			default: ''
		},
		font: {
			type: String,
			default: 'Lato'
		},
		color: {
			type: String,
			default: 'inherit'
		},
		pinHoverColor: {
			type: String,
			default: 'green'
		},
		deleteHoverColor: {
			type: String,
			default: 'red'
		},
		countryCode: {
			type: String
		},
		team: {
			type: String
		},
		id: {
			type: String
		},
		hasBirthday: {
			type: Boolean,
			default: false
		},
		birthdayColor: {
			type: String,
			default: 'color: rgb(51, 196, 61)'
		}
	},
	data: () => {
		return {
			resolvedBadges: [] as ParsedBadgeInterface[]
		};
	},
	async created() {
		this.resolvedBadges = await resolveBadges(this.$props.badges, '118863395');
	},
	computed: {
		deleteIcon() {
			return mdiIcons['mdiDeleteCircleOutline'];
		},
		pinIcon() {
			return mdiIcons['mdiPinOutline'];
		}
	},
	methods: {
		pinMsg(event: any) {
			this.$emit('pin');
		},

		deleteMsg() {
			this.$emit('delete');
		},

		closeMsg() {
			this.$emit('close');
		}
	}
});
</script>

<style lang="scss" scoped>
.userinfo {
	--color: inherit;
	--delete-hover-color: red;
	--pin-hover-color: green;
	--font: Lato;
	display: flex;
	font-size: 24px;
	font-family: var(--font);

	.badge {
		width: auto;
		height: 24px;
		border-radius: 2px;
		margin-right: 5px;
		margin-top: 3px;
	}

	.name {
		margin-right: 5px;
		cursor: pointer;
		color: var(--color);
		-webkit-app-region: no-drag;
	}

	.time {
		color: var(--color);
		margin: 3px 0 0 auto;
		font-size: 14px;
	}

	.pin,
	.delete,
	.close {
		margin-left: 5px;
		margin-bottom: 3px;
		width: auto;
		height: 18px;
		border-radius: 50%;
		font-size: 18px;
		color: var(--color);
		cursor: pointer;
		-webkit-app-region: no-drag;
	}

	.pin {
		transform: rotateZ(45deg);
	}

	.pin:hover {
		color: var(--pin-hover-color);
	}

	.delete:hover {
		color: var(--delete-hover-color);
	}

	.country {
		width: 32px;
		height: 24px;
		border-radius: 2px;
		margin-right: 5px;
		margin-top: 3px;
	}

	.team {
		color: var(--color);
		width: 32px;
		height: 24px;
		margin-right: 5px;
	}
}
</style>

<docs>
## Expamle

das ist 1 example

```jsx
<bf-userinfo
	name="BF_Mod" 
	:badges="[{name: 'moderator', version: '1'}]" 
	time="06.12.2020 - 18:32:09"
	showPin
	showDelete
	countryCode="de"
	team="vuejs"
	color="grey"
	id="12345678"
/>
```

https://fontawesome.com/cheatsheet/free/brands

</docs>
