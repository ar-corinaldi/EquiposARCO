import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Button from "react-bootstrap/Button";

function Select(props) {
  return (
    <div>
      <form
        className="form-inline md-form mr-auto mb-4"
        method="GET"
        onSubmit={props.submit}
      >
        <Autocomplete
          id="combo-box-demo"
          options={props.opciones}
          getOptionLabel={(option) => option}
          style={{ width: 300 }}
          value={props.filter}
          onChange={(event, newText) => props.setInput(newText || "")}
          inputValue={props.input}
          onInputChange={(event, newInput) => props.setInput(newInput || "")}
          renderInput={(params) => (
            <TextField {...params} label="..." variant="outlined" />
          )}
        />
        <Button
          aria-label="search button"
          className="btn-elegant btn-rounded btn-sm my-0"
          role="presentation"
          type="submit"
        >
          Buscar
        </Button>
      </form>
    </div>
  );
}

export default Select;
