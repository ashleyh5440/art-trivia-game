import { useState } from 'react';
import './style.css';
import 'animate.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


function LogIn() {
    return (
        <Container>
        <Row>
          <Col className='left'>
            <div>
                <h2>Log in to play!</h2>
            </div>
            <div>
                <Form>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="2">Email</Form.Label>
                        <Col sm="10">
                        <Form.Control type="email" placeholder="name@email.com" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label column sm="2">Password</Form.Label>
                        <Col sm="10">
                            <Form.Control type="password" placeholder="password" />
                        </Col>
                    </Form.Group>
                    <Button variant="primary">Log in</Button>
                </Form>
            </div>
          </Col>
          <Col className='right'>
            <div>
                <h2>New here? Sign up!</h2>
            </div>
            <div>
                <Form>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="2">Username</Form.Label>
                        <Col sm="10">
                        <Form.Control type="user" placeholder="name" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="2">Email</Form.Label>
                        <Col sm="10">
                        <Form.Control type="email" placeholder="name@email.com" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label column sm="2">Password</Form.Label>
                        <Col sm="10">
                            <Form.Control type="password" placeholder="password" />
                        </Col>
                    </Form.Group>
                    <Button variant="primary">Sign up</Button>
                </Form>
            </div>
          </Col>
        </Row>
      </Container>
    );
};

export default LogIn;