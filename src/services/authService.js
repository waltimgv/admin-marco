import Http from '../http';

export const login = ({email, password}) => Http.post('/auth/login', {email, password});
export const logout = () => Http.post('/auth/logout');
export const refresh = () => Http.post('/auth/refresh');
