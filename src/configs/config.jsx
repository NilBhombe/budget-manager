const config = {};

config.baseUrl = import.meta.env.VITE_APP_BASE_URL;
config.deviceId = "12345678";
config.getToken = () => {
  return {
    "x-access-token": localStorage.getItem("token"),
  };
};
export default config;
