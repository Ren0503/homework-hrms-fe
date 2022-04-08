import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Loader, Message, FormContainer } from '../components/shared';
import { login, loginForUser } from '../redux/actions/adminActions';
import GoogleLogin from 'react-google-login';

const LoginPage = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin);
    const { loading, error, userInfo } = userLogin;


    useEffect(() => {
        if (userInfo) {
            navigate('/');
        }
    }, [navigate, userInfo]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(name, password));
    };

    const responseGoogle = (response) => {
        dispatch(loginForUser(response.tokenId))
    }

    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter username'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button type='py-3' variant='primary'>
                    Sign In
                </Button>

                <Row className='py-3'>
                    <Col>
                        New Customer ? {' '}
                        <Link to={'/register'}>
                            Register
                        </Link>
                    </Col>
                </Row>
            </Form>

            <GoogleLogin
                // use your client id here
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                buttonText="Login with google"
                /**
                 * To get access_token and refresh_token in server side,
                 * the data for redirect_uri should be postmessage.
                 * postmessage is magic value for redirect_uri to get credentials without actual redirect uri.
                 */
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
        </FormContainer>
    );
}

export default LoginPage;