import Link from 'next/link'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Emailform from './emailform'
const footer = () => {
    return (
        <>
            <section className="bg-blue">
                <Container className="py-5">
                    <Row className="">
                        <Col>
                            <div className="mb-4">
                                <p className="text-white mb-1">Email: <span className="text-white">perrys@octanerecruitment.co.uk</span></p>
                                <p className="text-white">Call: <span className="text-white">0161 300 5430</span></p>
                            </div>
                            <div className="fotter-icon">
                                <Link href={'/'}><i className="bi bi-facebook link-warning"></i></Link>
                                <Link href={'/'}><i className="bi bi-twitter link-warning"></i></Link>
                                <Link href={'/'}><i className="bi bi-linkedin link-warning"></i></Link>
                            </div>
                        </Col>

                        <Col className="text-start text-md-center mt-4 mt-md-auto">
                            <h4 className="text-white">Newsletter</h4>
                            <div>
                                <p className="text-center text-md-end text-white">Subscribe to our newsletter and never miss latest job alert and news</p>
                            </div>
                            <div>
                                <Emailform/>
                            </div>
                        </Col>
                        <hr className="my-5" />
                    </Row>
                    <Row>
                        <Col md={6}>
                            <div className="text-white">
                                <p className="m-0">Powered by Chameleoni Recruitment software</p>
                                <p>© Copyright 2023 . All rights reserved.</p>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="text-start text-md-start text-white">
                                <p>Perrys Motor Sales are working with Octane Recruitment to cover all their recruitment needs. Should your CV match the requirements, then Octane Recruitment will be in touch to discuss the role with you. Octane Recruitment holds your data when you apply to the role, please see our privacy notice if you have any queries -https://www.octanerecruitment.co.uk/privacy/.</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

        </>
    )
}

export default footer