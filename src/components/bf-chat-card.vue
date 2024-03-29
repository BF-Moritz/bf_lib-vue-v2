<template>
	<div
		class="chat-card"
		:style="{
			'--font-family': fontFamily,
			'--background-color': message.deleted ? bgColorDeleted : bgColor,
			'--color': color,
			'--border-radius': borderRadius
		}"
	>
		<bf-avatar :imgSrc="message.user.twitch.logo" class="avatar" />
		<div class="left">
			<bf-userinfo
				:name="message.user.twitch.displayName || user.name"
				:badges="message.message.parsedBadges"
				class="header"
				:countryCode="message.user.country ? message.user.country.code : ''"
				:team="message.user.team"
				:showPin="showPin"
				:showDelete="showDelete"
				:showClose="showClose"
				:color="color"
				:time="parsedTime"
				:id="message.user._id"
				@pin="pinMsg"
				@delete="deleteMsg"
				@close="closeMsg"
				:hasBirthday="hasBirthday"
			/>
			<div class="content" ref="message-content" />
		</div>
	</div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import BfAvatar from '@/components/bf-avatar.vue';
import BfUserinfo from '@/components/bf-userinfo.vue';
import { convertTimestampToString } from '@/utils/timeParser';
import { MessageDBInterface } from '@/interfaces/message';
import { emotesInterface } from '@/interfaces/emotes';
import { BTTVStore } from '@/stores/bttv.store';

const imageStyleHeight = '20px';

export default Vue.extend({
	name: 'bf-chat-card',
	props: {
		message: {
			type: Object as PropType<MessageDBInterface>,
			required: true
		},
		showPin: {
			type: Boolean
		},
		showDelete: {
			type: Boolean
		},
		showClose: {
			type: Boolean
		},
		color: {
			type: String,
			default: 'white'
		},
		fontFamily: {
			type: String,
			default: 'Lato'
		},
		bgColor: {
			type: String,
			default: 'rgba(11, 16, 19, 0.8)'
		},
		bgColorDeleted: {
			type: String,
			default: 'rgba(22, 16, 19, 0.8)'
		},
		borderRadius: {
			type: String,
			default: '15px'
		}
	},
	components: {
		BfAvatar,
		BfUserinfo
	},

	mounted() {
		const div = this.$refs['message-content'] as HTMLDivElement;
		this.addMessage(div);
	},
	computed: {
		parsedTime() {
			return convertTimestampToString(this.message.date);
		},
		hasBirthday(): boolean {
			const bd = (this.message as MessageDBInterface).user?.birthday;
			const today = new Date();
			return !!bd && bd.month === today.getMonth() + 1 && bd.day === today.getDate();
		}
	},
	methods: {
		addMessage(div: HTMLDivElement) {
			const message = document.createElement('span');
			message.style.display = 'flex';
			const emotesArr: emotesInterface[] = [];
			for (const key in this.message.message.emotes) {
				if (Object.prototype.hasOwnProperty.call(this.message.message.emotes, key)) {
					const element = this.message.message.emotes[key];
					element.forEach((e) => {
						const [start, end] = e.split('-').map((v) => +v);
						emotesArr.push({
							id: key,
							start,
							end
						});
					});
				}
			}

			emotesArr.sort((a, b) => a.start - b.start);
			let offset = 0;
			const bttvEmotes = BTTVStore.getEmotes();
			console.log([...bttvEmotes]);

			emotesArr.forEach((emote) => {
				if (emote.start - offset > 0) {
					const text = this.message.message.message.substring(offset, emote.start);
					let string = '';
					text.split(' ').map((word) => {
						if (bttvEmotes.has(word)) {
							const el = document.createElement('span');
							el.innerText = string + ' ';
							message.append(el);
							const image = document.createElement('img');
							image.src = `https://cdn.betterttv.net/emote/${bttvEmotes.get(word)?.id}/3x`;
							image.style.height = imageStyleHeight;
							message.append(image);
							string = '';
						} else {
							string += ' ' + word;
						}
					});
					const el = document.createElement('span');
					el.innerText = string + '';
					message.append(el);
				}
				const image = document.createElement('img');
				image.src = `https://static-cdn.jtvnw.net/emoticons/v2/${emote.id}/default/dark/3.0`;
				image.style.height = imageStyleHeight;
				message.append(image);
				offset = emote.end + 1;
			});
			if (emotesArr.length <= 0) {
				// hier
				const text = this.message.message.message;
				let string = '';
				text.split(' ').map((word, i) => {
					if (bttvEmotes.has(word)) {
						const el = document.createElement('span');
						el.innerText = string + ' ';
						message.append(el);
						console.log(bttvEmotes.get(word));

						const image = document.createElement('img');
						image.src = `https://cdn.betterttv.net/emote/${bttvEmotes.get(word)?.id}/3x`;
						image.style.height = imageStyleHeight;
						message.append(image);
						string = '';
					} else {
						string += i > 0 ? ' ' + word : word;
					}
				});
				const el = document.createElement('span');
				el.innerText = string;
				message.append(el);
			}

			div.appendChild(message);
		},

		pinMsg(msg: any) {
			this.$emit('pin', { message: this.$props.message });
		},
		deleteMsg(msg: any) {
			this.$emit('del', { message: this.$props.message });
		},
		closeMsg(msg: any) {
			this.$emit('close', { message: this.$props.message });
		}
	}
});
</script>

<style lang="scss" scoped>
.chat-card {
	--font-family: Lato;
	--background-color: rgba(11, 16, 19, 0.8);
	--color: white;
	--border-radius: 15px;

	font-family: var(--font-family);
	background-color: var(--background-color);
	color: var(--color);
	display: grid;
	// width: 100%;
	border-radius: var(--border-radius);
	min-height: 10px;
	grid-template-columns: 70px 1fr;
	min-width: 410px;
	overflow: hidden;

	.avatar {
		margin: 10px;
	}

	.header {
		margin: 6px 10px 5px 5px;
	}

	.content {
		margin: 0 10px 5px 5px;
	}
}
</style>

<docs>

## Examples

```jsx
<bf-chat-card
    :message="{
        channel: '#bf_moritz',
        date: '2020-12-28T20:59:23.695Z',
        deleted: false,
        index: 52,
        message: {
            badgeInfo: {subscriber: '40'},
            badges: {broadcaster: '1', subscriber: '3012'},
            clientNonce: '7e9c284c24a0d767b8ae2a5c414b8f64',
            emotes: null,
            flags: null,
            id: '96039687-33fc-47d2-b77f-45eb2be94088',
            message: 'test',
            parsedBadges: [
                {name: 'broadcaster', version: '1'},
                {name: 'subscriber', version: '3012'}
            ],
            reply: null,
            roomID: '118863395',
            timestampTMI: '1609189163230',
            twitchID: '118863395',
            type: 'chat'
        },
        type: 'chat',
        user: {
            twitch: {
                banned: false,
                broadcaster: true,
                color: '#5FA2D1',
                createdAt: '2016-03-16T06:08:47.879781Z',
                displayName: 'BF_Moritz',
                id: '118863395',
                logo: 'https://static-cdn.jtvnw.net/jtv_user_pictures/dbac0a38-dc12-4004-aa16-437b65797e83-profile_image-300x300.png',
                mod: false,
                name: 'bf_moritz',
                sub: true,
                subCount: '40',
                subTier: 3,
                timeoutTime: 1609189163642,
                timeouted: false,
                vip: false
            },
            country: {
                name: 'Deutschland',
                code: 'de'
            },
            team: 'node-js',
        _id: '5fb5775361a94f2cc2169d9a'
        },
        _id: '5fea472b604e835a20bfe534'
    }"
    showPin
	showDelete
/>
```

</docs>
