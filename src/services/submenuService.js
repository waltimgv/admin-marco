import Http from '../http';

export const get = () => Http.get('/submenus');
export const store = (submenu) => Http.post('/submenus', submenu);
export const getById = (id) => Http.get(`/submenus/${id}`);
export const update = (submenu) => Http.put(`/submenus/${submenu.id}`, submenu);
export const destroy = (id) => Http.delete(`/submenus/${id}`);
