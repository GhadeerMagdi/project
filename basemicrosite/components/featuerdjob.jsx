import React from 'react'
import { Col, Container, Row, Button, Card } from 'react-bootstrap';
import Link from 'next/link';
const featuerdjob = (props) => {

// return(<>{JSON.stringify(props.allData)}</>)

    return (
        <>
            <Container>
                <Row>
                    <div className="text-center text-white">
                        <h2>Featured Job Listing</h2>
                    </div>
                </Row>
                <Row className="mt-4">
                    {props.allData.map((data) => {
                        return(
                            <Col className="mb-4">
                            <Card.Link href={`jobs/${data.ReqUID}`} key={data.RequirementID} className="text-decoration-none">
                                <Card className="featuerdcard">
                                    <Card.Body className="p-5">
                                        <Card.Title>{data.JobTitle}</Card.Title>
                                        <Card.Text>
                                            {data.CompanyName} <br />
                                            {data.Salary} <br />
                                            {data.Type}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Card.Link>
                        </Col>
                        )
                       }) 
                    }
                    <Row>
                        <Col className="text-center mt-3">
                            <Link href={`/jobs`}>
                            <Button className="py-3 px-5 buttn-style" style={{boxShadow: "5px 10px 50px rgba(0, 0, 0, 0.3)"}}>Browse Jobs</Button>
                            </Link>
                        </Col>
                    </Row>
                </Row>
            </Container>
        </>
    )
}

export default featuerdjob