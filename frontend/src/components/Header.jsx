import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
// import { logo } on assets folder as img
//because we do not have something like <a> tags to change to <Link>,
//we have Navbar.Brand we have to use a react router bootstrap
/*before
<Navbar.Brand href="/">              
    CoffeeShop
</Navbar.Brand>
after
<LinkContainer to="/">
    <Navbar.Brand>              
        CoffeeShop
    </Navbar.Brand>
</LinkContainer>
                */
import { LinkContainer } from 'react-router-bootstrap'

export default function Header() {
  return (
    <header>
        <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
            <Container>
                <LinkContainer to='/'>
                    <Navbar.Brand >
                        {/* <img src={logo} alt='CofeeShop' /> */}
                        CoffeeShop
                    </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className='ms-auto'>
                        <LinkContainer to="/cart">
                            <Nav.Link><FaShoppingCart/>Cart</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/loggin">
                        <Nav.Link><FaUser/>Sign In</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>

        </Navbar>

    </header>
  )
}
