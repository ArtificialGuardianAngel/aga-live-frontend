import axios from 'axios';
export const getLocalInfo = async () => {
  try {
    const res = await axios.get('https://www.cloudflare.com/cdn-cgi/trace', {
      responseType: 'text',
    });
    const data: Record<string, string> = {};
    for (const item of res.data.split('\n')) {
      if (!item) continue;
      const [key, value] = item.split('=');
      data[key] = value;
    }
    return data;
  } catch (error) {
    return {};
  }
};
