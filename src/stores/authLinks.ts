import { authLinkStoreInterface } from '@/interfaces/authLinksStore';
import axios from 'axios';

export class AuthLinks {
	static async getAuthLinks(): Promise<authLinkStoreInterface[]> {
		const res = await axios.get('http://192.168.0.211:5000/api/v1/auth');
		return res.data as authLinkStoreInterface[];
	}
}
