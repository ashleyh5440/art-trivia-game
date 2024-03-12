import { useState } from 'react';
import './style.css';
import 'animate.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';

import Auth from '../../utils/auth';
import{useMutation} from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';

function LogIn(props) {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error, data }] = useMutation(LOGIN_USER);
  
    // update state based on form input changes
    const handleChange = (event) => {
      const { name, value } = event.target;
  
      setFormState({
        ...formState,
        [name]: value,
      });
    };
  
    // submit form
    const handleFormSubmit = async (event) => {
      event.preventDefault();
      console.log(formState);
      try {
        const { data } = await login({
          variables: { ...formState },
        });
  
        Auth.login(data.login.token);
      } catch (e) {
        console.error(e);
      }
  
      // clear form values
      setFormState({
        email: '',
        password: '',
      });
    }; 
    return (
        <Container className="container">
          <div className="column">
            <div>
                <h2>Log in to play!</h2>
            </div>
            {data ? (
              <p> Login Successful! You may now head {' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : ( <>
            <div className='form'>
                <Form onSubmit = {handleFormSubmit}>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="2">Email</Form.Label>
                        <Col sm="10">
                        <Form.Control name = "email" type="email" placeholder="emailname@emailaddress.com" value = {formState.email}
                        onChange={handleChange}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label column sm="2">Password</Form.Label>
                        <Col sm="10">
                            <Form.Control name = "password" type="password" placeholder="****************" value = {formState.password}
                        onChange={handleChange}/>
                        </Col>
                    </Form.Group>
                    <Button variant="primary" className="button"><NavLink to="/">Log in</NavLink></Button>
                </Form>
                 </div> </>)}
            
            <div className="sign-up-container">
                <h3>New here? Sign up!</h3>
                <Button variant="primary" className="button"><NavLink to="/signup">Sign up</NavLink></Button>
            </div>
          </div>
      </Container>
      
    );
};

export default LogIn;