import { ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, ALL_PRODUCT_FAIL,CLEAR_ERROR } from "../constants/productConstants";

export const productReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case ALL_PRODUCT_REQUEST:
      return {
        loading: true,
        products: 25, // Corrected 'product' to 'products'
      };
    case ALL_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload.products, // Corrected 'product' to 'products'
        productCounts: action.payload.productCounts, // Corrected 'prdouctCounts' to 'productCounts'
      };
    case ALL_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
      case CLEAR_ERROR:
        return {
          ...state,
          error:null
         
        };
    default:
      return state;
  }
};
