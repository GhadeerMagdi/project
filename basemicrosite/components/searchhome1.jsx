import React, { useEffect } from 'react'
import { Col, Container, Row, Button, Form } from 'react-bootstrap'
import { useRouter } from 'next/router'
import { useState } from 'react';

export default function searchhome1(props) {
    const [selectedkeyword, setSelectedkeyword] = useState('');
    const [selectedlocation, setSelectedlocation] = useState('');
    const router = useRouter();

    useEffect(() => {
        const { keyword, location } = router.query;
    
        setSelectedkeyword(keyword || '');
        setSelectedlocation(location || '');

      }, [router.query]);
    
      const onkeywordChange = (e) => setSelectedkeyword(e.target.value);
      const onLocationChange = (e) => setSelectedlocation(e.target.value);
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log('keyword:', selectedkeyword);
        console.log('Location:', selectedlocation);
        
        router.push(`/jobs/?keyword=${selectedkeyword}&location=${selectedlocation}`);
    };

    return (
        <>
            <Container className="mb-5 border-top" fluid>
                <Row className="justify-content-center align-items-center bg-form">
                    <Col className="p-0 m-4">
                        <Form className="" action="/" method="get" onSubmit={handleSubmit}>
                            <Row className="">
                                <Col md className="mb-4 mb-md-0">
                                    <Form.Group controlId="formGridCity">
                                        <Form.Control type="text" placeholder="keyword Search" onChange={onkeywordChange} className="py-3 px-3 border border-dark" style={{ borderRadius: "50px" }}/>
                                    </Form.Group>
                                </Col>

                                <Col md className="mb-4 mb-md-0">
                                    <Form.Group controlId="formGridState">
                                        <Form.Select defaultValue="Select Location" onChange={onLocationChange} className="py-3 px-3 border border-dark" style={{ borderRadius: "50px" }}>
                                            <option>Location</option>
                                            {props.locations.map((data) => {
                                                return (
                                                    <option key={data.TagId} value={data.TagId}>{data.Tag}</option>
                                                )
                                            })
                                            }
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Col className="text-center mt-3" >
                                <Button type="submit" className="buttn-style py-2 px-5">
                                    Search
                                </Button>
                            </Col>
                        </Form>

                    </Col>

                    <Col className="p-0">
                        <img src="/images/perrys_home2.webp" className="size-image w-100 h-auto" alt="logo" />
                    </Col>
                </Row>
            </Container>
        </>
    )
}