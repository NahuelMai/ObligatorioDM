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
      SerialMotor: "",
      Matricula: "",
      Marca: "",
      Color: "",
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
      if (dato.SerialMotor == registro.SerialMotor) {
        arreglo[contador].Matricula = dato.Matricula;
        arreglo[contador].Marca = dato.Marca;
        arreglo[contador].Color = dato.Color;
      }
      contador++;
    });
    this.setState({ data: arreglo, modalActualizar: false });
  };

  eliminar = (dato) => {
    var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento "+dato.SerialMotor);
    if (opcion == true) {
      var contador = 0;
      var arreglo = this.state.data;
      arreglo.map((registro) => {
        if (dato.SerialMotor == registro.SerialMotor) {
          arreglo.splice(contador, 1);
        }
        contador++;
      });
      this.setState({ data: arreglo, modalActualizar: false });
    }
  };

  insertar= ()=>{
    var valorNuevo= {...this.state.form};
    valorNuevo.SerialMotor=this.state.data.length+1;
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
                <th>Serie del motor</th>
                <th>Matricula</th>
                <th>Marca</th>
                <th>Color</th>
                <th>Acción</th>
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.SerialMotor}>
                  <td>{dato.SerialMotor}</td>
                  <td>{dato.Matricula}</td>
                  <td>{dato.Marca}</td>
                  <td>{dato.Color}</td>
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
              Serie del motor:
              </label>
            
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.SerialMotor}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
              Matricula: 
              </label>
              <input
                className="form-control"
                name="Matricula"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.Matricula}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
              Marca: 
              </label>
              <input
                className="form-control"
                name="Marca"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.Marca}
              />
            </FormGroup>

            <FormGroup>
              <label>
              Color: 
              </label>
              <input
                className="form-control"
                name="Color"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.Color}
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
           <div><h3>Insertar Auto</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
              Serie del motor: 
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
              Matricula: 
              </label>
              <input
                className="form-control"
                name="Matricula"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
              Marca: 
              </label>
              <input
                className="form-control"
                name="Marca"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
              Color: 
              </label>
              <input
                className="form-control"
                name="Color"
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
export default Auto;
