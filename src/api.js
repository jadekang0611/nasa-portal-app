import axios from 'axios';

export default axios.create({
  baseURL: `https://api.nasa.gov/mars-photos/api/v1/rovers/`,
});
