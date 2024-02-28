import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import Link from 'next/link'
import { Row, Col, Container, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { signIn } from 'next-auth/react';

const forgetPassword = () => {
    const [buttonClicked, setButtonClicked] = useState(false);
    const [showContent, setShowContent] = useState(true);
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors }
    } = useForm({ mode: "onTouched" })

    const handleForgetPassword = async (data, e) => {
        e.preventDefault();

        try {
            const email = data.email;
            const params = {
                email: email,
            };
            const response = await axios.post('http://localhost:3000/api/forgetPassword', params);
            const Dataemail = response.data.results || [];
            setShowContent(false);
            setButtonClicked(true);

        } catch (error) {
            console.error('Error fetching email data:', error);
        }
    };

    return (
        <>
            <div className="d-flex justify-content-center align-items-center bg-blue py-5 mb-5">
                <div className="text-white">
                    <h1 className="fs-1">Login Form</h1>
                </div>
            </div>

            <div>
                <Container className="m-auto w-50">
                    {showContent && !buttonClicked ? (<>
                        <Form onSubmit={handleSubmit(handleForgetPassword)}>
                            <Row>
                                <Col md={12}>
                                    <Form.Group className="mb-3" controlId="formGroupEmail">
                                        <Form.Label>Email Address</Form.Label>
                                        <Form.Control
                                            style={{ padding: "0.75rem 1rem" }}
                                            type="email"
                                            placeholder="you@company.com"
                                            name="email"
                                            {...register('email', { required: "Please enter a email." })}
                                        />
                                        {errors.email && (
                                            <div className="mt-1" style={{ color: "red" }}>
                                                <small>{errors.email.message}</small>
                                            </div>
                                        )}
                                    </Form.Group>
                                </Col>

                                <Button variant="danger" type="submit" className="buttn-style my-2 py-3 px-4 mb-5">
                                    Send Reminder
                                </Button>

                            </Row>
                        </Form>
                    </>
                    ) : (
                        <>
                            <Row style={{ margin: "5rem auto" }}>
                                <Col>
                                    <div className="text-center">
                                        <p className="fs-5">
                                            Thank you. l@w.com
                                        </p>
                                    </div>
                                </Col>
                            </Row>
                        </>
                    )}

                </Container>
            </div>
        </>

    )
}

export default forgetPassword
