import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
// Components
import Navbar from "./components/Navbar";
import Sidebar from "./components/SidebarComponents/Sidebar";
import EquipoList from "./components/Equipo/EquipoList/EquipoList";
import TerceroList from "./components/Tercero/TerceroList";
import TerceroDetail from "./components/Tercero/TerceroDetail";
import TerceroCreate from "./components/Tercero/TerceroCreate";
import Breadcrumb from "./components/Breadcrumb";
import OrdenDetail from "./components/Orden/OrdenDetail";
import CrearOrden from "./components/FacturacionModule/CrearOrden";
import EquipoDetail from "./components/Equipo/EquipoDetail/EquipoDetail";
import EquipoCreate from "./components/Equipo/EquipoCreate/EquipoCreate";
import BodegaCreate from "./components/Bodega/BodegaCreate";

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
            <Row>
              <Breadcrumb />
            </Row>
            <Row>
              <Switch>
                <Route path="/" exact />
                <Route
                  path="/inventario/crearEquipo"
                  component={() => (
                    <EquipoCreate
                      fields={{
                        nombreEquipo: "",
                        nombreFamilia: "",
                        nombreGrupo: "",
                        codigo: "",
                      }}
                      formAction="/equipos"
                    />
                  )}
                />
                <Route
                  path="/inventario/equipos/:idEquipo"
                  component={EquipoDetail}
                />
                <Route path="/inventario/equipos" component={EquipoList} />
                <Route
                  path="/terceros/listar_terceros"
                  exact
                  component={TerceroList}
                />
                <Route
                  path="/terceros/crear_tercero"
                  exact
                  component={TerceroCreate}
                />
                <Route
                  path="/terceros/:id/bodegas/create"
                  exact
                  component={BodegaCreate}
                />
                <Route path="/terceros/:id" exact component={TerceroDetail} />
                <Route
                  path="/terceros/:id/bodegas/:idB/ordenes/:idOr"
                  component={OrdenDetail}
                />
                <Route
                  path="/facturacion/crear_orden"
                  component={CrearOrden}
                ></Route>
                <Route path="*">Goooooool de Diegol</Route>
              </Switch>
            </Row>
          </Col>
        </Row>
      </div>
    </Router>
  );
}

export default App;
