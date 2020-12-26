import Http from '../http';

export const get = () => Http.get('/menus');
export const store = (menu) => Http.post('/menus', menu);
export const getById = (id) => Http.get(`/menus/${id}`);
export const update = (menu) => Http.put(`/menus/${menu.id}`, menu);
export const destroy = (id) => Http.delete(`/menus/${id}`);
