import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import Badge from 'react-bootstrap/Badge';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { CartState, IProducts } from '../context/context';
import { AiFillDelete } from 'react-icons/ai';
import Button from 'react-bootstrap/Button';

const Header = () => {
  const {
    state: { cart },
    dispatch,
    productDispatch,
  } = CartState();

  return (
    <div>
      <Navbar bg="dark" variant="dark" style={{ height: 80 }}>
        <Container>
          <Navbar.Brand>
            <Link to="/"> Shopping Cart</Link>
          </Navbar.Brand>
          <Navbar.Text className="search">
            <Form.Control
              placeholder="Search a product"
              style={{ width: 500 }}
              onChange={(e) =>
                productDispatch({
                  type: 'FILTER_BY_SEARCH',
                  payload: e.target.value,
                })
              }
            />
          </Navbar.Text>

          <Nav>
            <Dropdown align="end">
              <Dropdown.Toggle variant="success">
                <FaShoppingCart color="white" fontSize="25px" />
                <Badge bg="success">{cart.length}</Badge>
              </Dropdown.Toggle>
              <Dropdown.Menu style={{ minWidth: 370 }}>
                {cart.map((prod: IProducts) => (
                  <span className="cartitem" key={prod.id}>
                    <img
                      src={prod.image}
                      className="cartItemImg"
                      alt={prod.name}
                    />
                    <div className="cartItemDetail">
                      <span>{prod.name}</span>
                      <span>₹ {prod.price.split('.')[0]}</span>
                    </div>
                    <AiFillDelete
                      fontSize="20px"
                      style={{ cursor: 'pointer' }}
                      onClick={() =>
                        dispatch({
                          type: 'REMOVE_FROM_CART',
                          payload: prod,
                        })
                      }
                    />
                  </span>
                ))}
                <Link to="/cart">
                  <Button style={{ width: '95%', margin: '0 10px' }}>
                    Go to Cart
                  </Button>
                </Link>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
