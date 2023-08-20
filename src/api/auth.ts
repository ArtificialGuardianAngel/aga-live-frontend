import { IUser } from '@/types/user';
import client from './client';

const authApi = {
  connect: (metadata: any) => client.post('user/connect', { metadata }),
  authorize: (email: string) => client.post('user/authorize', { email }),
  verify: (code: string, email: string) =>
    client.post('user/verify', { email, code }),
  me: () => client.get<IUser>('user/me'),
};

export default authApi;
