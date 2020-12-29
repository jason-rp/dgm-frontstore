import { Order } from "@app/@core/core/models/order";

export class UserActions {
  static GET_USER_ORDERS = 'GET_USER_ORDERS';
  static GET_USER_ORDERS_SUCCESS = 'GET_USER_ORDERS_SUCCESS';

  getUserOrders() {
    return { type: UserActions.GET_USER_ORDERS };
  }

  getUserOrdersSuccess(orders: Order[]) {
    return { type: UserActions.GET_USER_ORDERS_SUCCESS, payload: orders };
  }
}
