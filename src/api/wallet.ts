import client from './client';

const walletApi = {
    get: () => client.get('wallet')
};
export default walletApi;
