import Http from '../http';

export const get = () => Http.get('/links');
export const store = (link) => Http.post('/links', link);
export const getById = (id) => Http.get(`/links/${id}`);
export const update = (link) => Http.put(`/links/${link.id}`, link);
export const destroy = (id) => Http.delete(`/links/${id}`);
