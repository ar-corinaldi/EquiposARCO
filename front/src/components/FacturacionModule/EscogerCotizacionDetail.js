import React, { useState, useEffect } from 'react';
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Autocomplete, {
    createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import InputBase from "@material-ui/core/InputBase";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import './EscogerCotizacionDetail.css';

function EscogerCotizacionDetail(props) {
    let [bodegaSeleccionada, setBodegaSeleccionada] = props.bodegaSeleccionada;
    const [cotizaciones, setCotizaciones] = useState([]);
    const [cotizacionSeleccionada, setCotizacionSeleccionada] = props.cotizacionSeleccionada;
    const [pendingValue, setPendingValue] = React.useState({});
    const [open, setOpen] = useState(false);

    useEffect(() => {
        async function fetchCotizaciones() {
            const cotizacionesBack = await (await fetch("/cotizaciones/all")).json();
            console.log(cotizacionesBack);
            setCotizaciones(cotizacionesBack);
        }
        fetchCotizaciones();
    }, []);

    const handleClose = (event, reason) => {
        if (reason === "toggleInput") {
            return;
        }
        setCotizacionSeleccionada(pendingValue);
        setPendingValue({});
        setOpen(false);
    };

    const filterOptions = createFilterOptions({
        matchFrom: "any",
        stringify: (option) =>
            option.numeroContrato +
            option.direccionBodega +
            option.municipio +
            option.pais +
            option.telefono +
            option.departamento,
    });

    return (
        <>
            <div className='rootBodega' >
                <h4>Escoja la cotización base para la orden</h4>
                <div className="completeCotizacionWrapper">
                    <Autocomplete
                        openOnFocus
                        autoHighlight
                        disableCloseOnSelect
                        disablePortal
                        open={open}
                        value={pendingValue}
                        noOptionsText="No hay cotizaciones"
                        classes={{
                            paper: "paper",
                            option: "optionBodega",
                            popper: "popper popperCotizacion",
                            popperDisablePortal: "popperCotizacion margin-bottom"
                        }}
                        onClose={handleClose}
                        onOpen={() => { setPendingValue(cotizacionSeleccionada); }}
                        onFocus={() => {
                            setOpen(true);
                        }}
                        onBlur={() => {
                            setOpen(false);
                        }}
                        onInputChange={(e, value) => {
                            if (!open && value) {
                                setOpen(true);
                            }
                        }}
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                open ? handleClose() : (() => { })();
                                setOpen(!open);
                            }
                        }}
                        onChange={(event, newValue) => {
                            setPendingValue(newValue);
                        }}
                        getOptionLabel={(option) => {
                            if (option && option.numeroContrato) {
                                return option._id;
                            }
                            else {
                                return "";
                            }
                        }
                        }
                        options={cotizaciones}
                        renderOption={(option, { selected }) => (
                            <React.Fragment>
                                <Accordion defaultActiveKey="0" className="full-width">
                                    <Card className="full-width border-0 bg-transparent" >
                                        <Card.Header className="option-cotizacion-header bg-transparent" >
                                            <DoneIcon
                                                className="iconSelected float-left icon-margin-left"
                                                style={{ visibility: selected ? "visible" : "hidden" }}
                                                onClick={() => {
                                                    handleClose();
                                                    setOpen(false);
                                                }}
                                            />
                                            <CloseIcon
                                                onClick={() => {
                                                    setPendingValue(null);
                                                }}
                                                className="iconSelected float-left icon-margin-right"
                                                style={{ visibility: selected ? "visible" : "hidden" }}
                                            />
                                            <span>{"Cotización con número de contrato: " + option.numeroContrato}</span>
                                            <Accordion.Toggle as={Button} variant="link" eventKey="1" className="float-right" >
                                                <ExpandMoreIcon  >
                                                </ExpandMoreIcon>
                                            </Accordion.Toggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey="1" >
                                            <Card.Body className="bg-white ">
                                                <ul>
                                                    {option.tarifasCotizadas.map((item, index) => {
                                                        return (
                                                            <li key={index}>
                                                                {"Tarifa detail colapsable de tarifa con id: " + item._id}
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                </Accordion>
                            </React.Fragment>
                        )}
                        renderInput={(params) => (
                            <InputBase
                                ref={params.InputProps.ref}
                                inputProps={params.inputProps}
                                autoFocus
                                className="inputBodega"
                                placeholder="Buscar cotizaciones"
                            />
                        )}
                    >
                    </Autocomplete>

                </div>

            </div>
        </>
    );
}

export default EscogerCotizacionDetail;