import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import '../styles/Home.css';

const categories = [
  {
    title: 'Fruits',
    description: 'Fresh and organic fruits directly from the farm to your table.',
    image: 'path_to_fruits_image', // Replace with actual image path
  },
  {
    title: 'Vegetables',
    description: 'Healthy and nutritious vegetables grown with care.',
    image: 'path_to_vegetables_image', // Replace with actual image path
  },
  {
    title: 'Dairy Products',
    description: 'Natural and high-quality dairy products from our local farms.',
    image: 'path_to_dairy_products_image', // Replace with actual image path
  },
];

const Home = () => {
  return (
    <Container className="home-page">
      <h1 className="text-center my-5">Welcome to Our Online Marketplace</h1>
      <p className="text-center mb-5">
        Our platform aims to help farmers sell their products online, reaching a wider audience and providing fresh produce directly to consumers. Join us in supporting local agriculture and enjoying high-quality, farm-fresh products.
      </p>
      <Row>
        {categories.map((category, index) => (
          <Col key={index} md={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src={category.image} />
              <Card.Body>
                <Card.Title>{category.title}</Card.Title>
                <Card.Text>{category.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
