import { IProducts } from './context';

type AddAction = {
  type: 'ADD_TO_CART';
  payload: IProducts;
};

type RemoveAction = {
  type: 'REMOVE_FROM_CART';
  payload: IProducts;
};

type ChangeQTYAction = {
  type: 'CHANGE_CART_QTY';
  payload: IProducts;
};

type SortAction = {
  type: 'SORT_BY_PRICE';
  payload: string;
};

type DeliveryFilterAction = {
  type: 'FILTER_BY_DELIVERY';
};

type StockFilterAction = {
  type: 'FILTER_BY_STOCK';
};

type RatingFilterAction = {
  type: 'FILTER_BY_RATING';
  payload: number;
};

type SearchFilterAction = {
  type: 'FILTER_BY_SEARCH';
  payload: string;
};

type ClearFilterAction = {
  type: 'CLEAR_FILTERS';
};

export type CartActionType = AddAction | RemoveAction | ChangeQTYAction;

export type ProductActionType =
  | SortAction
  | StockFilterAction
  | DeliveryFilterAction
  | RatingFilterAction
  | SearchFilterAction
  | ClearFilterAction;

export type CartStateType = {
  cart: IProducts[];
  products: IProducts[];
};

export type ProductStateType = {
  byStock: boolean;
  byFastDelivery: boolean;
  byRating: number;
  searchQuery: string;
  sort?: string;
};

export const cartReducer = (
  state: CartStateType,
  action: CartActionType
): CartStateType => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter((c: IProducts) => c.id !== action.payload.id),
      };
    case 'CHANGE_CART_QTY':
      return {
        ...state,
        cart: state.cart.filter((c: IProducts) =>
          c.id === action.payload.id ? (c.qty = action.payload.qty) : c.qty
        ),
      };
    default:
      return state;
  }
};

export const productReducer = (
  state: ProductStateType,
  action: ProductActionType
): ProductStateType => {
  switch (action.type) {
    case 'SORT_BY_PRICE':
      return { ...state, sort: action.payload };
    case 'FILTER_BY_STOCK':
      return { ...state, byStock: !state.byStock };
    case 'FILTER_BY_DELIVERY':
      return { ...state, byFastDelivery: !state.byFastDelivery };
    case 'FILTER_BY_RATING':
      return { ...state, byRating: action.payload };
    case 'FILTER_BY_SEARCH':
      return { ...state, searchQuery: action.payload };
    case 'CLEAR_FILTERS':
      return {
        byStock: false,
        byFastDelivery: false,
        byRating: 0,
        searchQuery: '',
      };
    default:
      return state;
  }
};
