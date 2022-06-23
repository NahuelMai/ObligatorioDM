import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";

const data = [
  { SerialMotor: 235325, Matricula: "LAB 3252", Marca: "Fiat", Color:"Blanco" }, 

];

class App extends React.Component {
  state = {
    data: data,
    modalActualizar: false,
    modalInsertar: false,
    form: {
      Tratamiento: "",
      Auto: "",
      FechaIni: "",
      FechaFin: "",
      Costo: "",
      Insumos: "",
      Repuestos: "",

    },
  };

  mostrarModalActualizar = (dato) => {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  editar = (dato) => {
    var contador = 0;
    var arreglo = this.state.data;
    arreglo.map((registro) => {
      if (dato.Tratamiento == registro.Tratamiento) {
        arreglo[contador].Auto = dato.Auto;
        arreglo[contador].FechaIni = dato.FechaIni;
        arreglo[contador].FechaFin = dato.FechaFin;
        arreglo[contador].Costo = dato.Costo;
        arreglo[contador].Insumos = dato.Insumos;
        arreglo[contador].Repuestos = dato.Repuestos;
      }
      contador++;
    });
    this.setState({ data: arreglo, modalActualizar: false });
  };

  eliminar = (dato) => {
    var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento "+dato.Tratamiento);
    if (opcion == true) {
      var contador = 0;
      var arreglo = this.state.data;
      arreglo.map((registro) => {
        if (dato.Tratamiento == registro.Tratamiento) {
          arreglo.splice(contador, 1);
        }
        contador++;
      });
      this.setState({ data: arreglo, modalActualizar: false });
    }
  };

  insertar= ()=>{
    var valorNuevo= {...this.state.form};
    valorNuevo.Tratamiento=this.state.data.length+1;
    var lista= this.state.data;
    lista.push(valorNuevo);
    this.setState({ modalInsertar: false, data: lista });
  }

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
    
    return (
      <>
        <Container>
        <br />
          <Button color="success" onClick={()=>this.mostrarModalInsertar()}>Crear</Button>
          <br />
          <br />
          <Table>
            <thead>
              <tr>
                <th>Tratamiento</th>
                <th>Auto</th>
                <th>FechaIni</th>
                <th>FechaFin</th>
                <th>Costo</th>
                <th>Insumos</th>
                <th>Repuestos</th>
                <th>Acción</th>
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.Tratamiento}>
                  <td>{dato.Tratamiento}</td>
                  <td>{dato.Auto}</td>
                  <td>{dato.FechaIni}</td>
                  <td>{dato.FechaFin}</td>
                  <td>{dato.Costo}</td>
                  <td>{dato.Insumos}</td>
                  <td>{dato.Repuestos}</td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => this.mostrarModalActualizar(dato)}
                    >
                      Editar
                    </Button>{" "}
                    <Button color="danger" onClick={()=> this.eliminar(dato)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
           <div><h3>Editar Registro</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
              Tratamiento:
              </label>
            
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.Tratamiento}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
              Auto: 
              </label>
              <input
                className="form-control"
                name="Auto"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.Auto}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
              Fecha Inicio: 
              </label>
              <input
                className="form-control"
                name="FechaIni"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.FechaIni}
              />
            </FormGroup>

            <FormGroup>
              <label>
              Fecha Fin: 
              </label>
              <input
                className="form-control"
                name="FechaFin"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.FechaFin}
              />
            </FormGroup>

            <FormGroup>
              <label>
              Costo: 
              </label>
              <input
                className="form-control"
                name="Costo"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.Costo}
              />
            </FormGroup>

            <FormGroup>
              <label>
              Insumos: 
              </label>
              <input
                className="form-control"
                name="Insumos"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.Insumos}
              />
            </FormGroup>

            <FormGroup>
              <label>
              Repuestos: 
              </label>
              <input
                className="form-control"
                name="Repuestos"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.Repuestos}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.editar(this.state.form)}
            >
              Editar
            </Button>
            <Button
              color="danger"
              onClick={() => this.cerrarModalActualizar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>



        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
           <div><h3>Insertar</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
              Tratamiento: 
              </label>
              
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.data.length+1}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
              Auto: 
              </label>
              <input
                className="form-control"
                name="Auto"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
              Fecha Inicio: 
              </label>
              <input
                className="form-control"
                name="FechaIni"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
              Fecha Fin: 
              </label>
              <input
                className="form-control"
                name="FechaFin"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
              Costo: 
              </label>
              <input
                className="form-control"
                name="Costo"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
              Insumos: 
              </label>
              <input
                className="form-control"
                name="Insumos"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
              Repuestos: 
              </label>
              <input
                className="form-control"
                name="Repuestos"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.insertar()}
            >
              Insertar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.cerrarModalInsertar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
export default Tratamiento;
