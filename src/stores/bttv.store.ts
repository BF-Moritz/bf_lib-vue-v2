import { BTTVGlobalEmotesInterface, BTTVUserEmotesInterface } from '@/interfaces/bttv';

export class BTTVStore {
	map: Map<String, BTTVGlobalEmotesInterface> = new Map();

	static setEmotes(g: BTTVGlobalEmotesInterface[], u: BTTVUserEmotesInterface) {
		store.map.clear();

		console.log(g, u);

		g.forEach((e) => {
			store.map.set(e.code, e);
		});
		u.channelEmotes.forEach((e) => {
			store.map.set(e.code, e);
		});
		u.sharedEmotes.forEach((e) => {
			store.map.set(e.code, e);
		});
	}

	static getEmotes() {
		return store.map;
	}
}

const store = new BTTVStore();
