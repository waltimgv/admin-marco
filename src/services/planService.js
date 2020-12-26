import Http from '../http';

export const get = () => Http.get('/plans');
export const store = (plan) => Http.post('/plans', plan);
export const getById = (id) => Http.get(`/plans/${id}`);
export const update = (plan) => Http.put(`/plans/${plan.id}`, plan);
export const destroy = (id) => Http.delete(`/plans/${id}`);

