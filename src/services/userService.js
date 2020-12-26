import Http from '../http';

export const get = () => Http.get('/users');
export const store = (user) => Http.post('/users', user);
export const getById = (id) => Http.get(`/users/${id}`);
export const update = (user) => Http.put(`/users/${user.id}`, user);
export const destroy = (id) => Http.delete(`/users/${id}`);
export const changePassword = (id, password) => Http.put(`/users/${id}/password`, password);
export const addPlan = (userId, { id }) => Http.post(`/users/${userId}/plans`, { plan: id });
export const block = (id) => Http.put(`/users/${id}/block`);
