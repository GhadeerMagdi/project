import React from 'react'
import Button from 'react-bootstrap/Button';
import { Container, Col } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useSession, signIn, signOut } from "next-auth/react"
const navbar = () => {

  const { data: session } = useSession();

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary py-1">
        <Container>
          <Navbar.Brand href="/" style={{ width: "20%" }}>
            <img src="/images/logo.png" className="size-image" alt="logo" style={{ width: "100%", height: "auto", objectFit: "contain" }} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="ms-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="/" className="link-style my-2">
                Home
              </Nav.Link>
              <Nav.Link href="/jobs" className="link-style my-2">
                Find Jobs
              </Nav.Link>


              {session ? (
                // If user is authenticated, show Logout button
                <>
                  <Nav.Link href="/contact" className="link-style my-2">
                    Contact
                  </Nav.Link>
                  <Nav.Link
                    href="/"
                    className="buttn-style my-2 mx-3 py-1 px-3"
                    onClick={() => signOut()}
                  >
                    Logout
                  </Nav.Link>
                </>
              ) : (
                // If user is not authenticated, show Login and Register buttons
                <>
                  <Nav.Link
                    className="border border-black bg-light link-style mx-3 my-2 rounded-5 py-2 px-4"
                    onClick={() => signIn()}
                    style={{ width: "fit-content", height: "fit-content" }}
                  >
                    Login
                  </Nav.Link>
                  <Nav.Link
                    href="/register"
                    className="buttn-style my-2 py-2 px-4"
                    style={{ width: "fit-content", height: "fit-content" }}
                  >
                    Register
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default navbar