import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import { Link } from "react-router-dom";

export default function NavBar({ curUser, setUser }) {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>Parcial 2</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        {returnOpciones(curUser, setUser)}
      </Navbar.Collapse>
    </Navbar>
  );
}

function returnOpciones(curUser, setUser) {
  let opciones = opcionesLogged(setUser);
  return opciones;
}

function opcionesLogged(setUser) {
  return (
    <Nav className="mr-auto">
      <Link to="/Table" className="nav-link ">
        Table
      </Link>
    </Nav>
  );
}
