import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
// Components
import Navbar from "./components/Navbar";
import Sidebar from "./components/SidebarComponents/Sidebar";
import Equipo from "./components/Equipo/Equipo";
import Terceros from "./components/TercerosComponents/Terceros";
import Tercero from "./components/Tercero/Tercero";
import TerceroDetail from "./components/Tercero/TerceroDetail";
import Breadcrumb from "./components/Breadcrumb";
import OrdenDetail from "./components/Orden/OrdenDetail";

// Bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

//Routing
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div id="contenido">
        <Navbar></Navbar>
        <Row id="rowWrapper">
          <Col md={3} xl={2} id="sidebar-column" className="d-none d-md-block">
            <Sidebar />
          </Col>
          <Col id="content-column">
            <Switch>
              <Route path="/" exact />
              <Route path="/inventario/equipos" component={() => <Equipo />} />
              <Route path="/inventario/terceros" component={Terceros} />
              <Route
                path="/terceros/listar_terceros"
                exact
                component={Tercero}
              />
              <Route
                path="/terceros/listar_terceros/:id"
                component={TerceroDetail}
              />
            </Switch>
          </Col>
        </Row>
      </div>
    </Router>
  );
}

export default App;
