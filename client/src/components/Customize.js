import React from 'react';
import '../App.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const Customize = () => {
  return <>
    <h1>Customize Your Keezer</h1>

    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="/images/freezer-sm.jpg" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the bulk of
          the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>





  </>
}

export default Customize;