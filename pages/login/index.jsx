import React from 'react'
import { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import Link from 'next/link'
import { Row, Col, Container, Button, Form } from 'react-bootstrap';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from "next/router";
import axios from 'axios';

const signinPage = () => {
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors }
    } = useForm({ mode: "onTouched" })

    const router = useRouter();
    const { data: session } = useSession();
    const [error, setError] = useState('');


    useEffect(() => {
        const applyQueryParam = router.query.apply;

        if (session && applyQueryParam) {
            const jobid = router.query.jobid;
            router.push(`/jobs/${jobid}?apply=1`);
        }
    }, [session, router.query.apply]);


    const handleLogin = async (data, e) => {
        e.preventDefault();
        const response = await signIn("credentials",
            {
                email: data.email,
                password: data.password,
                callbackUrl: '/',
                redirect: false
            });

        if (response.ok) {
            router.push(response.url);
        } else setError('Wrong email or password!')
    }

    return (
        <>
            <div className="d-flex justify-content-center align-items-center bg-blue py-5 mb-5">
                <div className="text-white">
                    <h1 className="fs-1">Login Form</h1>
                </div>
            </div>


            <Container className="m-auto w-50">
                <Form onSubmit={handleSubmit(handleLogin)}>
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

                        <Col md={12}>
                            <Form.Group className="mb-2" controlId="formGroupPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    style={{ padding: "0.75rem 1rem" }}
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    {...register("password", {
                                        required: "Enter your password",
                                        pattern: {
                                            // value: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,16}/i,
                                            message: "Please enter a valid password",
                                        },
                                    })}
                                />
                                {errors.password && (
                                    <div className="mt-1" style={{ color: "red" }}>
                                        <small>{errors.password.message}</small>
                                    </div>
                                )}
                            </Form.Group>

                            {error && (
                                <div className="my-3" style={{ color: "red" }}>
                                    <small>{error}</small>
                                </div>
                            )}

                            <Col className="mb-3">
                                <div>
                                    <Link href={'/forgetPassword'} className=" d-block text-decoration-none" style={{ color: "var(--main-color)" }}>Forgot password?</Link>
                                    Don't have an account? <Link href={'/register'} className="text-decoration-none" style={{ color: "var(--main-color)" }}>Register here</Link>
                                </div>
                            </Col>

                            <Button variant="danger" type="submit" className="buttn-style my-2 py-2 px-4 mb-5">
                                Login
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </>

    )
}

export default signinPage