import axios from 'axios';


async function getAccessToken() {
  try {
    const response = await axios.get("https://dosomethingbackend-anish-stack.vercel.app/getToken");
    const token = response;
    console.log('Token:', token);
    return token;
  } catch (error) {
    console.error('Error fetching token:', error);
    return null;
  }
}

export default getAccessToken;
