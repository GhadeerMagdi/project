import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Col, Container, Row } from 'react-bootstrap'
import { Button } from 'react-bootstrap';
import axios from "axios";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const JobDetailsPage = ({ job, RequirementID, jobid }) => {
    const router = useRouter();
    const { data: session } = useSession();
    const [buttonClicked, setButtonClicked] = useState(false);
    const [showContent, setShowContent] = useState(true);

    useEffect(() => {
        const applyQueryParam = router.query.apply;

        if (session && applyQueryParam == 1) {
            const params = {
                RequirementID: RequirementID,
                contactid: session.user.contactid,
            };
            apply(params);
        }
    })

    const apply = async (params) => {
        const response = await axios.post(`http://localhost:3000/api/applayJob`, { params });
        console.log(response);

        if (response.data.results == "1") {
            setShowContent(false);
            setButtonClicked(true);
        }
    }

    const handleApplyClick = async () => {
        if (session) {
            const params = {
                RequirementID: RequirementID,
                contactid: session.user.contactid,
            };
            await apply(params);
        } else {
            router.push('/login');
        }
    };

    return (
        <>
            <Container>
                {showContent && !buttonClicked ? (
                    <>
                        <Row>
                            <div>
                                <h4 className='p-2 m-2'>Vacancy Details</h4>
                                {job &&
                                    job.map((data) => {
                                        return (
                                            <div className="mt-3 p-3" key={data.jobid}>
                                                <h3>{data?.JobTitle}</h3>
                                                <div className="text-muted">
                                                    <p className="m-0">Consultants Name: {data?.UserName}</p>
                                                    <p className="m-0">Consultants Email: {data?.UserEmail}</p>
                                                    <p className="m-0">Consultants Contact number: {data?.UserPhone}</p>
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </Row>

                        <Row className="mt-3">
                            <Col md={4} lg={4} className="mb-3">
                                <div className="d-flex align-items-center">
                                    <Image src="/images/user.svg" alt="" width="50" height="50" className="me-2" />
                                    {
                                        job && job.map((data, index) => {
                                            return (
                                                <div key={index}>
                                                    <p className="m-0 text-muted">Job Title</p>
                                                    <p className="m-0 d-block"> <strong>{data?.UserName}</strong> </p>
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                            </Col>

                            <Col md={4} lg={4} className="mb-3">
                                <div className="d-flex align-items-center">
                                    <Image src="/images/handshake.svg" alt="" width="50" height="50" className="me-2" />
                                    {
                                        job && job.map((data, index) => {
                                            return (
                                                <div key={index}>
                                                    <p className="m-0 text-muted">Job Title</p>
                                                    <p className="m-0 d-block"> <strong>{data?.Type}</strong> </p>
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                            </Col>

                            <Col md={4} lg={4} className="mb-3">
                                <div className="d-flex align-items-center">
                                    <Image src="/images/salary.svg" alt="" width="50" height="50" className="me-2" />
                                    {
                                        job && job.map((data, index) => {
                                            return (
                                                <div key={index}>
                                                    <p className="m-0 text-muted">Job Title</p>
                                                    <p className="m-0 d-block"> <strong>{data?.Pay2}</strong> </p>
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                            </Col>
                        </Row>

                        {session ? (
                            // If user is authenticated, show Logout button
                            <Row className="mt-4">
                                <Col className="text-center mb-3">
                                    <Button variant='danger' className="buttn-style py-2 px-5" onClick={handleApplyClick}>Apply to this job</Button>
                                </Col>
                            </Row>
                        ) : (
                            // If user is not authenticated, show Login and Register buttons
                            <>
                                <Row className="mt-4">
                                    <Col className="text-end mb-3">
                                        <Button variant='danger' className="buttn-style py-2 px-5" onClick={() => router.push(`/login?apply=1&jobid=${jobid}`)}>Login and Apply to this job</Button>
                                    </Col>
                                    <Col className="mb-3">
                                        <Button variant='danger' className="buttn-style py-2 px-5" onClick={() => router.push(`/register?apply=1&jobid=${jobid}`)}>Register and Apply to this job</Button>
                                    </Col>
                                </Row>
                            </>
                        )}

                        <Row>
                            <div>
                                <p className="fs-3">Description</p>
                                {
                                    job && job.map((data, index) => {
                                        return (
                                            <div key={index}>
                                                <p style={{ whiteSpace: 'pre-line' }}> {data?.Description} </p>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </Row>
                    </>
                ) : (
                    <Row style={{ margin: "5rem auto" }}>
                        <Col>
                            <div className="text-center">
                                <p className="fs-5">
                                    Thank you, we have received your application for this position.
                                    One of our consultants will be in touch shortly.
                                    <Link href={`/jobs`} className="ms-1" style={{ color: "var(--main-color)", textDecoration: "none" }}>
                                        Back to our live vacancies
                                    </Link>
                                </p>
                            </div>
                        </Col>
                    </Row>
                )}
            </Container>

        </>
    )
}

export default JobDetailsPage

export async function getServerSideProps(context) {

    var { query } = context
    var params = {}
    params.jobid = query.jobid;
    const response1 = await axios.get('http://localhost:3000/api/getRequirementid', { params });
    const RequirementID = response1.data.results[0].ID;
    params.RequirementID = RequirementID

    const response = await axios.get(`http://localhost:3000/api/getDetailsdata`, { params });
    const data = response.data
    return {
        props: {
            job: data.results ? (data.results || null) : null,
            RequirementID: response1.data.results[0].ID,
            jobid: query.jobid,
        },
    };

}



