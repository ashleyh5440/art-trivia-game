import { useState } from 'react';
import './style.css';
import 'animate.css';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Auth from '../../utils/auth';
import{useMutation} from '@apollo/client';

import { ADD_USER } from '../../utils/mutations';

const Signup = () => {
    const [formState, SetFormState] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [addUser, {error, data}] = useMutation(ADD_USER);

    const handleChange = (event) => {
        const {name, value} = event.target;

        SetFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async(event) => {
        event.preventDefault();
        console.log(formState);

        try {
            const {data} = await addUser({
                variables: {...formState},
            });
            Auth.login(data.addUser.token);
        } catch(error) {
            console.error(e);
        }
    };
}

function SignUp() {
    return (
        <Container className="container">
            <div>
                <h2>Sign up!</h2>
            </div>
            <div className="column">
                <Form>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextUser">
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
                    <Button variant="primary" className="button"><NavLink to="/">Sign up</NavLink></Button>
                </Form>
            </div>
        </Container>
    );
};

export default SignUp;