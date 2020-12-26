import Http from "../http";

export const me = () => Http.get('/me');
export const refresh = () => Http.get('/auth/refresh');
export const update = (user) => Http.put('/me', user);
export const changePassword = (password) => Http.put('/me/password', password);