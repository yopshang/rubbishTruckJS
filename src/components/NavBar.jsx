import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import axios from 'axios';

import { useState} from "react"

function mainNavbar() {
  const [city, setCity] = useState("城市")

  const handleSelect = (eventKey) => {
    console.log('選中的值：', eventKey);
    setCity(eventKey)
    getRubbishTruckPositions()
  }
  const getRubbishTruckPositions = async() =>{
    const url =` https://data.ntpc.gov.tw/api/datasets/${import.meta.env.VITE_RUBBISH_TRUCK_TOKEN}/json`
    const responseData = await axios.get(url)
    console.log(responseData)
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">大台灣垃圾車</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title={city} id="basic-nav-dropdown"
              onSelect={handleSelect}>
              <NavDropdown.Item eventKey="台北">台北</NavDropdown.Item>
              <NavDropdown.Item eventKey="新北">
                新北
              </NavDropdown.Item>
              <NavDropdown.Item eventKey="桃園">桃園</NavDropdown.Item>

            </NavDropdown>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default mainNavbar;