export interface UserInterface {
	_id?: string;
	twitch?: UserTwitchInterface;
	discord?: UserDiscordInterface;
	country?: UserCountryInterface;
	team?: string;
	name?: string;
	birthday?: UserBirthdayInterface;
}

export interface UserTwitchInterface {
	name: string;
	displayName: string;
	id: string;
	broadcaster: boolean;
	mod: boolean;
	vip: boolean;
	sub: boolean;
	subCount: number;
	subTier: number;
	color?: string;
	createdAt: string;
	logo?: string;
	banned: boolean;
	timeouted: boolean;
	timeoutTime: number;
}

export interface UserDiscordInterface {}

export interface UserCountryInterface {}

export interface UserBirthdayInterface {
	day: number;
	month: number;
	year?: number;
}
