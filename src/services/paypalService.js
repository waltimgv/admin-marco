import Http from "../http";

export const addPlanToUser = (transaction, plan, user) => Http.post('/paypal/purchase', {transaction, plan, user});
export const listPlans = () => Http.get('/plans');