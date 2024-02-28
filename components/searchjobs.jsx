import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Button, Form } from 'react-bootstrap'
import { useRouter } from 'next/router';

const searchjobs = ({ salary, locations, category }) => {

    const router = useRouter();

    const [selectedkeyword, setSelectedkeyword] = useState('');
    const [selectedlocation, setSelectedlocation] = useState('');
    const [selectedcategory, setSelectedcategory] = useState('');
    const [selectedtypes, setSelectedtypes] = useState('');
    const [selectedsalary, setSelectedsalary] = useState('');
  
    useEffect(() => {
      const { keyword, location, category, types, salary } = router.query;
  
      setSelectedkeyword(keyword || '');
      setSelectedlocation(location || '');
      setSelectedcategory(category || '');
      setSelectedtypes(types || '');
      setSelectedsalary(salary || '');
    }, [router.query]);
  
    const onkeywordChange = (e) => setSelectedkeyword(e.target.value);
    const onLocationChange = (e) => setSelectedlocation(e.target.value);
    const onCategoryChange = (e) => setSelectedcategory(e.target.value);
    const onTypeChange = (e) => setSelectedtypes(e.target.value);
    const onSalaryChange = (e) => setSelectedsalary(e.target.value);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('keyword:', selectedkeyword);
      console.log('Location:', selectedlocation);
      console.log('Category:', selectedcategory);
      console.log('Type:', selectedtypes);
      console.log('Salary:', selectedsalary);
  
      router.push(
        `/jobs?keyword=${selectedkeyword}&location=${selectedlocation}&category=${selectedcategory}&types=${selectedtypes}&salary=${selectedsalary}`
      );
    };

    return (
        <>
            <Container className="my-5">
                <Row className="p-3">
                    <Form className="search-form" onSubmit={handleSubmit}>
                        <Row className="">
                            <Col md className="mb-4 mb-md-0">
                                <Form.Group controlId="formGridCity">
                                    <Form.Control type="text" placeholder="keyword Search" onChange={onkeywordChange} value={selectedkeyword} />
                                </Form.Group>
                            </Col>

                            <Col md className="mb-4 mb-md-0">
                                <Form.Group controlId="formGridState">
                                    <Form.Select defaultValue="Select Location" onChange={onLocationChange} value={selectedlocation}>
                                        <option value="">Location</option>
                                        {locations.map((data) => {
                                            return (
                                                <option key={data.TagId} value={data.TagId}>{data.Tag}</option>
                                            )
                                        })
                                        }
                                    </Form.Select>
                                </Form.Group>
                            </Col>

                            <Col md className="mb-4 mb-md-0">
                                <Form.Group controlId="formGridState">
                                    <Form.Select defaultValue="Select Category" name='category' onChange={onCategoryChange} value={selectedcategory}>
                                        <option value="">Job Category</option>
                                        {category.map((data) => {
                                            return (
                                                <option key={data.TagId} value={data.TagId}>{data.Tag}</option>
                                            )
                                        })}
                                    </Form.Select>
                                </Form.Group>
                            </Col>

                            <Col md className="mb-4 mb-md-0">
                                <Form.Group controlId="formGridState">
                                    <Form.Select defaultValue="Select Type" name='types' onChange={onTypeChange} value={selectedtypes}>
                                        <option value="">Job Type</option>
                                        <option value="Permanent">Permanent</option>
                                        <option value="Contract">Contract</option>
                                        <option value="Temporary" >Temporary</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>

                            <Col md className="mb-4 mb-md-0">
                                <Form.Group controlId="formGridState">
                                    <Form.Select defaultValue="Select Salary" name='salary' onChange={onSalaryChange} value={selectedsalary}>
                                        <option value="">Salary</option>
                                        {salary &&
                                            salary.map((data) => {
                                                return (
                                                    <option key={data.TagId} value={data.TagId}>{data.Tag}</option>
                                                )
                                            })
                                        }
                                    </Form.Select>
                                </Form.Group>
                            </Col>

                            <Col className="text-center" >
                                <Button type="submit" className="buttn-style py-1 px-5">
                                    Submit
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Row>
            </Container>
        </>
    )
}

export default searchjobs