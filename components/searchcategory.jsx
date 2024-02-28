import Link from 'next/link';
import React, { useState } from 'react';
import { Col, Container, Row, Button } from 'react-bootstrap';
const searchcategory = (props) => {
    const [showMoreCategories, setShowMoreCategories] = useState(true);

    const handleButtonClick = () => {
        setShowMoreCategories(!showMoreCategories);
        // Add your logic for showing/hiding categories here
    };

    return (
        <>
            <Container>
                <Row className=" justify-content-center">
                    <Col md={3}>
                        <div>
                            <h2 className="mt-2">Search by Category</h2>
                        </div>
                    </Col>
                    <Col>
                        <Row xs={2} md={3} lg={4}>
                            {props.category.map((data) => {
                                return (
                                    <Col key={data.TagId} className="border-bottom">
                                        <Link href={`/jobs`} style={{ textDecoration: "none" }} className="text-dark">
                                            <h4 className="mb-0 mt-3">{data.Tag}</h4>
                                        </Link>
                                        <p className="text-muted">{data.WebVacCount} Open positions</p>
                                    </Col>
                                )
                            })
                            }
                        </Row>
                    </Col>
                </Row>
                <Col className="mt-3 p-0 butn-category">
                    <Button
                        className="buttn-style py-3 px-5"
                        onClick={handleButtonClick}
                    >
                        {showMoreCategories ? 'More Categories' : 'Less Categories'}
                    </Button>
                </Col>
            </Container>
        </>
    )
}

export default searchcategory