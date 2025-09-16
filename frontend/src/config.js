//const app_config = { api_url: 'http://192.168.18.15:5000', ip: '192.168.18.15' };


let IS_PROD = true;
const app_config = {
  api_url: IS_PROD
    ? "https://poll-creator.onrender.com"
    : "http://localhost:5000"
};
export default app_config;