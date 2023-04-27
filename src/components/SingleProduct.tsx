import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { CartState, IProducts } from '../context/context';
import Rating from './Rating';

interface ISingleProductProps {
  prod: IProducts;
}

const SingleProduct = ({ prod }: ISingleProductProps) => {
  const {
    state: { cart },
    dispatch,
  } = CartState();

  return (
    <div className="products">
      <Card>
        <Card.Img variant="top" src={prod.image} alt={prod.name} />
        <Card.Body>
          <Card.Title>{prod.name}</Card.Title>
          <Card.Subtitle style={{ paddingBottom: 10 }}>
            <span>₹ {prod.price.split('.')[0]}</span>
            {prod.fastDelivery ? (
              <div>Fast delivery</div>
            ) : (
              <div>4 days delivery</div>
            )}
            <Rating rating={prod.ratings} style={{}} onClick={() => {}} />
          </Card.Subtitle>
          {cart.some((p: any) => p.id === prod.id) ? (
            <Button
              onClick={() =>
                dispatch({
                  type: 'REMOVE_FROM_CART',
                  payload: prod,
                })
              }
              variant="danger"
            >
              Remove from Cart
            </Button>
          ) : (
            <Button
              onClick={() =>
                dispatch({
                  type: 'ADD_TO_CART',
                  payload: prod,
                })
              }
              disabled={!prod.inStock}
            >
              {!prod.inStock ? 'Out of Stock' : 'Add to Cart'}
            </Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default SingleProduct;
