import React from 'react';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import Link from 'next/link';
import { Row, Col, Container, Button, Form, FloatingLabel } from 'react-bootstrap';
import { signIn, useSession } from 'next-auth/react';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";
import { toXML } from 'jstoxml';
import axios from 'axios';
var path = require('path');
require('dotenv').config();

const contactPage = ({ datauser }) => {

  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm({ mode: "onTouched" })

  const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,16}$");

  function getBase64(file) {
    console.log('ENter getBase64');
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        let encoded = reader.result.toString().replace(/^data:(.*,)?/, "");
        if (encoded.length % 4 > 0) {
          encoded += "=".repeat(4 - (encoded.length % 4));
        }
        resolve(encoded);
      };
      reader.onerror = (error) => reject(error);
    });
  }

  const saveCV = async (cid, cvFile) => {
    console.log('Enter saveCV');
    console.log(cvFile[0]);
    let ext = path.extname(cvFile[0].name);
    console.log(`Ext: ${ext}`);
    let Newcvfileref = process.env.NEXT_PUBLIC_AgencyID + '\\' + cid.toString() + ext;
    console.log(`newfileref: ${Newcvfileref}`);
    let OldCVfileRef = await getOldCVFileRef(cid);
    console.log(`OldCVfileRef: ${OldCVfileRef}`);
    let base64 = await getBase64(cvFile[0]);
    console.log(`base64: ${base64}`);
    if (OldCVfileRef != '') {
      await saveOldCV(cid, OldCVfileRef);
    }

    await saveCVFromByteArray(Newcvfileref, base64);
    var params = {};
    params.contactid = cid;
    params.Newcvfileref = Newcvfileref
    
    await axios.post("http://localhost:3000/api/updateContactcv", { params });
    await axios.post("http://localhost:3000/api/AttachcvToEmail", { params });
  }

  const getOldCVFileRef = async (cid) => {
    console.log('ENter getOldCVFileRef');
    var params = {};
    params.contactid = cid;
    const response = await axios.get("http://localhost:3000/api/getFilecv", { params })
    return response.data.results;
  }

  const saveOldCV = async (cid, oldfileRef) => {
    console.log('ENter saveOldCV');
    var params = {};
    params.contactid = cid;
    params.fileref = oldfileRef
    const response = await axios.post("http://localhost:3000/api/fileservice_SaveOldCVByCVFileRf", { params })
  }

  const saveCVFromByteArray = async (Newcvfileref, base64) => {
    console.log('ENter saveCVFromByteArray');
    var params = {};
    params.fileRef = Newcvfileref;
    params.base64 = base64
    const response = await axios.post("http://localhost:3000/api/fileservice_SaveCVFromByteArray", { params })
  }


  const handleRegistration = async (data, e) => {

    e.preventDefault();

    // saveCV('27702870', data.file);

    var contact = {
      data: {
        e_christian: data.forename,
        e_surname: data.surname,
        e_email: data.email,
        a_telno: data.homeTelNo,
        e_mobiletelno: data.mobileTel,
        d_countryid: data.id,
        a_postcode: data.postcode,
        f_requiredannualsalary: data.salary,
        d_noticeperiod: data.noticePeriod,
        f_relocate: data.willRelocate,
        f_webpassword: data.password,
        f_chkuk: data.agreeToTerms
      }
    };

    let xml = toXML(contact);

    console.log(xml);

    var params = {};
    params.xml = xml;
    params.contactid = session.user.contactid;

    console.log(params);

    try {
      const response = await axios.post("http://localhost:3000/api/updateContact", {params})
      
      console.log(response);
      if (response.data.results) {
        if (data.file.length > 0) {
            saveCV(response.data.results, data.file);
        }
      }

    } catch (error) {
      console.error('Error during registration:', error.message);
    }
    
  };



  return (
    <>
      <div className="d-flex justify-content-center align-items-center bg-danger py-5 mb-5">
        <div className="text-white">
          <h1 className="fs-1">Register with us</h1>
        </div>
      </div>

      <Container className="m-auto w-75">
        <Row>
          <p>To register please complete the form below and upload your latest CV.</p>
        </Row>

        <Form onSubmit={handleSubmit(handleRegistration)}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group as={Row} className="mb-3" controlId="formGridForename">
                <Form.Label column sm={4}>Forename(s) <span style={{ color: "#DC3545" }}>*</span></Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="text"
                    name="forename"
                    defaultValue={datauser.Christian}
                    {...register('forename', { required: "Please enter a Forename." })}
                  />
                  {errors.forename && (
                    <div className="mt-1" style={{ color: "red" }}>
                      <small>{errors.forename.message}</small>
                    </div>
                  )}

                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formGridSurname">
                <Form.Label column sm={4}>Surname <span style={{ color: "#DC3545" }}>*</span></Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="text"
                    name="surname"
                    defaultValue={datauser.Surname}
                    {...register('surname', { required: "Please enter a Surname." })}
                  />
                  {errors.surname && (
                    <div className="mt-1" style={{ color: "red" }}>
                      <small>{errors.surname.message}</small>
                    </div>
                  )}
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formGridEmail">
                <Form.Label column sm={4}>Email <span style={{ color: "#DC3545" }}>*</span></Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="email"
                    name="email"
                    defaultValue={datauser.Email}
                    {...register('email', { required: "Please enter a Email." })}
                  />
                  {errors.email && (
                    <div className="mt-1" style={{ color: "red" }}>
                      <small>{errors.email.message}</small>
                    </div>
                  )}
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formGridHomeTelNo">
                <Form.Label column sm={4}>Home tel no</Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="text"
                    name="homeTelNo"
                    defaultValue={datauser.HomeTelNo}
                    {...register('homeTelNo')}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formGridMobileTe">
                <Form.Label column sm={4}>Mobile tel <span style={{ color: "#DC3545" }}>*</span></Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="text"
                    name="mobileTel"
                    defaultValue={datauser.MobileTelNo}
                    {...register('mobileTel', { required: "Please enter a Mobile tel." })}
                  />
                  {errors.mobileTel && (
                    <div className="mt-1" style={{ color: "red" }}>
                      <small>{errors.mobileTel.message}</small>
                    </div>
                  )}
                </Col>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group as={Row} className="mb-3" controlId="formGridAddress">
                <Form.Label column sm={4}>Address</Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type='text'
                    name="address"
                    {...register('address')}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formGridCity">
                <Form.Label column sm={4}>City</Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type='text'
                    name="city"
                    {...register('city')}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formGridCounty">
                <Form.Label column sm={4}>county</Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type='text'
                    name="county"
                    {...register('county')}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formGridCountry">
                <Form.Label column sm={4}>country</Form.Label>
                <Col sm={8}>
                  <Form.Select
                    name="country"
                    {...register('country')}
                  >
                    <option id="egypt">egypt</option>
                    <option id="cairo">cairo</option>
                    <option id="sweden">sweden</option>
                  </Form.Select>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formGridPostcode">
                <Form.Label column sm={4}>Postcode <span style={{ color: "#DC3545" }}>*</span></Form.Label>
                <Col sm={8}>
                  <Form.Control
                    name="postcode"
                    {...register('postcode', { required: "Please enter a postcode." })}
                  />
                  {errors.postcode && (
                    <div className="mt-1" style={{ color: "red" }}>
                      <small>{errors.postcode.message}</small>
                    </div>
                  )}
                </Col>
              </Form.Group>
            </Col>
          </Row>

          <p>Current Employment Details</p>
          <Row>
            <Col md={6}>
              <Form.Group as={Row} className="mb-3" controlId="formGridCurrentJobTitle">
                <Form.Label column sm={4}>Current Job Title</Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="text"
                    name="currentJobTitle"
                    {...register('currentJobTitle')}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formGridCurrentEmployer">
                <Form.Label column sm={4}>Current Employer</Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="text"
                    name="currentEmployer"
                    {...register('currentEmployer')}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formGridSalary">
                <Form.Label column sm={4}>Salary.</Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="text"
                    name="salary"
                    defaultValue="0.00"
                    {...register('salary')}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formGridNoticePeriod">
                <Form.Label column sm={4}>Notice Period Week(s)</Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="text"
                    name="noticePeriod"
                    {...register('noticePeriod')}
                  />
                </Col>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group as={Row} className="mb-3" controlId="floatingTextarea">
                <Form.Label>Additional Detail</Form.Label>
                <Col sm={12}>
                  <FloatingLabel controlId="floatingTextarea2" label="Comments" >
                    <Form.Control
                      style={{ height: '80px' }}
                      as="textarea"
                      name="additionalDetail"
                      {...register('additionalDetail')}

                    />
                  </FloatingLabel>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formGridfile">
                <Form.Label column sm={3}>Your CV <span style={{ color: "#DC3545" }}>*</span></Form.Label>
                <Col sm={9}>
                  <Form.Control
                    name='file'
                    type="file"
                    // value={}
                    {...register('file')}
                  />
                  {errors.file && (
                    <div className="mt-1" style={{ color: "red" }}>
                      <small>{errors.file.message}</small>
                    </div>
                  )}
                </Col>
              </Form.Group>
              <p>By submitting your CV and personal details above, you confirm that the information given is true and correct.</p>
            </Col>
          </Row>

          <Row>
            <p>Your next Opportunity</p>
            <Col md={6}>
              <Form.Group as={Row} className="mb-3" controlId="formGridPreferredJob">
                <Form.Label column sm={4}>Preferred Job Title</Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="text"
                    name="preferredJobTitle"
                    {...register('preferredJobTitle')}
                  />
                </Col>
              </Form.Group>

              {['radio'].map((type) => (
                <div key={`inline-${type}`} className="mb-3">
                  <Form.Label column sm={4}>Will relocate</Form.Label>
                  <Form.Check
                    inline
                    label="Yes"
                    name="willRelocate"
                    type={type}
                    id={`inline-${type}-1`}
                    {...register('willRelocate')}

                  />
                  <Form.Check
                    inline
                    label="No"
                    name="willRelocate"
                    type={type}
                    id={`inline-${type}-2`}
                    {...register('willRelocate')}
                  />
                </div>
              ))}
            </Col>

            <Col md={6}>
              <Form.Group as={Row} className="mb-3" controlId="formGridPassword">
                <Form.Label column sm={3}>Password <span style={{ color: "#DC3545" }}>*</span></Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="password"
                    name="password"
                    {...register("password", {
                     
                      pattern: {
                        value: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,16}/i,
                        message: "Please enter a valid password",
                      },
                    })}
                  />
                  {errors.password && (
                    <div className="mt-1" style={{ color: "red" }}>
                      <small>{errors.password.message}</small>
                    </div>
                  )}
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formGridRe-type">
                <Form.Label column sm={3}>Re-type <span style={{ color: "#DC3545" }}>*</span></Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="password"
                    name="retypePassword"
                    {...register("retypePassword", {
                   
                      pattern: {
                        value: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,16}/i,
                        message: "Please enter a valid retypePassword",
                      },
                    })}
                  />
                  {errors.retypePassword && (
                    <div className="mt-1" style={{ color: "red" }}>
                      <small>{errors.retypePassword.message}</small>
                    </div>
                  )}
                </Col>
              </Form.Group>

              {['checkbox'].map((type) => (
                <div key={`inline-${type}`}>
                  <Form.Label>
                    I have read and agree to the
                    <Link href={'/'} className="ms-2 me-1">terms and conditions</Link>
                    <span style={{ color: "#DC3545" }}>*</span>
                  </Form.Label>
                  <Form.Check
                    inline
                    className="ms-2"
                    name="agreeToTerms"
                    type={type}
                    id={`inline-${type}-1`}
                    {...register('agreeToTerms', { required: "Please check a agreeToTerms." })}
                  />
                  {errors.agreeToTerms && (
                    <div className="mb-3" style={{ color: "red" }}>
                      <small>{errors.agreeToTerms.message}</small>
                    </div>
                  )}
                </div>
              ))}
              <Button variant="danger" type="submit" className="mb-4 py-1 px-5">
                Update my account
              </Button>
            </Col>
          </Row>
        </Form>

      </Container>
    </>

  )
}

export default contactPage


export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    context.res.writeHead(302, { Location: '/register' });
    context.res.end();
    return { props: {} };
  }

  let params = {}
  params.contactid = session.user.contactid



  try {
    const response = await axios.get(`http://localhost:3000/api/getContactDetails`, { params });
    const datauser = response.data.results

    return {
      props: {
        datauser: datauser,
        session
      },
    };
  } catch (e) {
    console.log(e);
    return {
      props: {},
    };
  }
}