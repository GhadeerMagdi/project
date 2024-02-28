import React from 'react'
import { Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
const emailform = () => {
    return (
        <>
            <div className="box">
                <Col className="inputemail" md={6}>
                    <InputGroup className="mb-3">
                        <Form.Control
                            className="forminput bg-transparent rounded-5"
                            placeholder="Email Address"
                            aria-label="Email Address"
                            aria-describedby="basic-addon2"
                        />
                        <Button variant="warning" id="button-addon2" className="formsubmit text-white rounded-5">
                            Button
                        </Button>
                    </InputGroup>
                    
                </Col>
            </div>
        </>
    )
}

export default emailform