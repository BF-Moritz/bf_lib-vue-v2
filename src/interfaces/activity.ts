export type ActivityType = 'newViewer' | 'cheer' | 'subscription' | 'donation' | 'host' | 'raid' | 'follow';

export interface ActivityInterface {
	_id: string;
	type: ActivityType;
}
