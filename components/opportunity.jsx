import React, { useEffect } from 'react'
import { Col, Container, Row, Button, Form } from 'react-bootstrap';
import { useRouter } from 'next/router'
import { useState } from 'react'
const opportunity = (props) => {
    const router = useRouter();

    const [selectedlocation, setSelectedlocation] = useState('');
    const [selectedcategory, setSelectedcategory] = useState('');

    useEffect(() => {
        const { location, category } = router.query;

        setSelectedlocation(location || '');
        setSelectedcategory(category || '');
    }, [router.query]);

    const onLocationChange = (e) => setSelectedlocation(e.target.value);
    const onCategoryChange = (e) => setSelectedcategory(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Location:', selectedlocation);
        console.log('Category:', selectedcategory);

        router.push(
            `/jobs?location=${selectedlocation}&category=${selectedcategory}`
        );
    };

    return (
        <>
            <Container>
                <Row>
                    <Col className="text-start m-auto">
                        <div>
                            <h1>Find the right <br /> opportunity near you.</h1>
                            <p className="text-muted fs-5 mt-4 mb-5">Find the suitable and best job in your own location</p>
                        </div>
                        <Row className="justify-content-center">
                            <Col className="p-0">
                                <Form className="" action="/" method="get" onSubmit={handleSubmit}>
                                    <Row className="">
                                        <Col md className="mb-4 mb-md-0 px-0 px-md-2">
                                            <Form.Group controlId="formGridCity">
                                                <Form.Select defaultValue="City" onChange={onLocationChange} className="py-3 px-3 border border-dark" style={{ borderRadius: "50px" }}>
                                                    <option>City</option>
                                                    {props.locations.map((data) => {
                                                        return (
                                                            <option key={data.TagId} value={data.TagId}>{data.Tag}</option>
                                                        )
                                                    })
                                                    }
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>

                                        <Col md className="mb-4 mb-md-0 px-0 px-md-2">
                                            <Form.Group controlId="formGridState">
                                                <Form.Select defaultValue="Job Categories" onChange={onCategoryChange} className="py-3 px-3 border border-dark" style={{ borderRadius: "50px" }}>
                                                    <option>Job Categories</option>
                                                    {props.category.map((data) => {
                                                        return (
                                                            <option key={data.TagId} value={data.TagId}>{data.Tag}</option>
                                                        )
                                                    })
                                                    }
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                        <Col md className="text-center text-md-start px-0 px-md-2">
                                            <Button type="submit" className="buttn-style py-3 px-3py-2 px-5">
                                                Search
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Col>
                        </Row>
                    </Col>
                    <Col className="text-center text-md-end">
                        <svg width="348" height="370" viewBox="0 0 348 370" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="135.681" cy="353.878" rx="55.1326" ry="16.0676" fill="#E7D54C"></ellipse><ellipse cx="266.67" cy="328.013" rx="28.1528" ry="8.22972" fill="#F1E371"></ellipse><path d="M210.8 256.29L210.789 256.276L210.778 256.263C200.115 243.877 193.349 228.607 191.331 212.375C189.314 196.144 192.135 179.679 199.439 165.052C205.238 153.606 213.814 143.804 224.379 136.545C234.946 129.286 247.163 124.804 259.909 123.511C265.689 122.93 271.512 122.93 277.292 123.511C290.038 124.803 302.256 129.285 312.822 136.545C323.387 143.805 331.962 153.608 337.758 165.056C345.062 179.682 347.883 196.147 345.866 212.377C343.849 228.608 337.082 243.878 326.42 256.263L326.408 256.276L326.397 256.29L273.459 320.773L273.459 320.774C272.869 321.493 272.126 322.073 271.286 322.471C270.446 322.869 269.528 323.075 268.599 323.075C267.669 323.075 266.752 322.869 265.911 322.471C265.071 322.073 264.329 321.493 263.738 320.774L263.738 320.773L210.8 256.29ZM268.599 232.378H268.6C277.263 232.368 285.567 228.916 291.692 222.78C297.816 216.644 301.261 208.325 301.271 199.649V199.647C301.271 193.174 299.355 186.846 295.765 181.463C292.176 176.081 287.073 171.885 281.103 169.407C275.132 166.93 268.562 166.281 262.224 167.545C255.886 168.808 250.064 171.926 245.495 176.503C240.926 181.081 237.815 186.913 236.554 193.262C235.294 199.611 235.941 206.191 238.413 212.172C240.886 218.152 245.073 223.264 250.446 226.861C255.819 230.458 262.136 232.378 268.599 232.378Z" fill="#79D5AE" stroke="black" strokeWidth="3"></path><path d="M36.206 231.62L36.1948 231.606L36.1834 231.593C17.7663 210.2 6.07942 183.825 2.59503 155.789C-0.889172 127.755 3.98417 99.3154 16.6011 74.0512C26.6219 54.2682 41.444 37.3258 59.7053 24.7803C77.9676 12.2341 99.0838 4.48765 121.114 2.25234C131.093 1.24923 141.147 1.24922 151.126 2.25232C173.157 4.48613 194.274 12.2328 212.535 24.7805C230.796 37.3275 245.616 54.2724 255.633 74.0578C268.249 99.3209 273.123 127.76 269.638 155.793C266.154 183.827 254.467 210.201 236.05 231.593L236.039 231.606L236.028 231.62L145.278 342.163L145.277 342.163C144.165 343.52 142.766 344.612 141.182 345.361C139.598 346.111 137.868 346.5 136.117 346.5C134.365 346.5 132.635 346.111 131.052 345.361C129.468 344.612 128.069 343.52 126.956 342.163L126.956 342.163L36.206 231.62ZM136.117 188.877H136.119C150.684 188.86 164.648 183.056 174.947 172.737C185.245 162.419 191.038 148.43 191.055 133.84V133.838C191.055 122.953 187.833 112.312 181.797 103.261C175.761 94.2095 167.181 87.1545 157.142 82.9883C147.103 78.8222 136.056 77.732 125.398 79.856C114.741 81.9799 104.952 87.2224 97.2687 94.92C89.5857 102.618 84.3538 112.425 82.2342 123.101C80.1146 133.777 81.2025 144.843 85.3602 154.9C89.518 164.957 96.5592 173.553 105.594 179.601C114.628 185.649 125.251 188.877 136.117 188.877Z" fill="white" stroke="black" strokeWidth="3"></path></svg>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default opportunity