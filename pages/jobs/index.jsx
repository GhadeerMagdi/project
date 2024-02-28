import React from 'react'
import { Col, Container, Row, Card, Button } from 'react-bootstrap'
import Link from 'next/link';
import Searchjobs from '@/components/searchjobs';
import Paginationjob from '@/components/Paginationjob';
import axios from 'axios';

const jobsList = ({ jobs, totalCount, dataSalary , dataLocation , dataCategory }) => {

    return (
        <>
            <Searchjobs salary={dataSalary} locations={dataLocation} category={dataCategory} />

            <Container>
                <Row>
                    <div>
                        <p className="m-0">Showing {totalCount} results</p>
                    </div>

                    {jobs &&
                        jobs.map((data) => {
                            return (
                                <Col md={6} key={data.RequirementID} className="">
                                    <Card className="mt-4">
                                        <Card.Body>
                                            <div>
                                                <p className="m-0 fs-4">{data.JobTitle}</p>
                                                <p className="m-0">{data.Type}</p>
                                                <p className="text-muted">{data.TagSalary}</p>
                                            </div>
                                            <div>
                                                <Link href={`jobs/${data.ReqUID}`} key={data.RequirementID}>
                                                    <Button className="buttn-style">Open job</Button>
                                                </Link>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )
                        })
                    }

                </Row>
            </Container>

            <Paginationjob totalResults={totalCount} />
        </>
    )
}

export default jobsList

export async function getServerSideProps(context) {
    const { query } = context;
    const keyword = query?.keyword || '';
    const location = query?.location || '';
    const category = query?.category || '';
    const types = query?.types || '';
    const salary = query?.salary || '';
    const page = query?.page || 1;

    const params = {
        pageno: page,
        keyword,
        location,
        category,
        types,
        salary,
        t1Salary: "Web Salary",
        t1: "Web Location",
        t1Category: "Web Expertise",
    };

    const data = await axios.get(`http://localhost:3000/api/getData`, { params });
    const response1 = await axios.get(`http://localhost:3000/api/getSalary`, { params });
    const response2 = await axios.get(`http://localhost:3000/api/getLocation`, { params });
    const response3 = await axios.get(`http://localhost:3000/api/getCategories`, { params });

    const dataSalary = response1.data.results;
    const dataLocation = response2.data.results;
    const dataCategory = response3.data.results;
    
    let totalCount = 0;
    if (data.data.results.length > 0) {
        totalCount = data.data.results[0].TotalCount;
    }

    return {
        props: {
            jobs: data.data.results,
            totalCount,
            dataSalary,
            dataLocation,
            dataCategory,
        },
    };
}
