import client from '@/utils/client';

export default function send(data: any) {
	client.send(JSON.stringify(data));
}
