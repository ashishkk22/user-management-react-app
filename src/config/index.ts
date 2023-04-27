const environment = import.meta.env;
export const urlEndpoint = environment.VITE_APP_URL_ENDPOINT;
export const publicKey = environment.VITE_APP_PUBLICKEY;
export const authenticationEndpoint =
  environment.VITE_APP_AUTHENTICATION_ENDPOINT;
