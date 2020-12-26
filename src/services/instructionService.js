import Http from '../http';

export const get = () => Http.get('/instructions');
export const store = (instruction) => Http.post('/instructions', instruction);
export const getById = (id) => Http.get(`/instructions/${id}`);
export const update = (instruction) => Http.put(`/instructions/${instruction.id}`, instruction);
export const destroy = (id) => Http.delete(`/instructions/${id}`);

