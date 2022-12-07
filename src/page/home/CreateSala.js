import React from "react";
import { apiDiagrama } from "../../api/apiDiagrama";
import { useForm } from "../../hooks/useForm";

import { MdCreate } from "react-icons/md";


export const CreateSala = (props) => {
  const { agregar, idUser: anfitrion } = props;

  const { value, HandleInputChange, reset } = useForm({
    name: "",
  });

  const { name } = value;

  const HandleCreateSubmit = async (e) => {
    e.preventDefault();

    let res = await apiDiagrama("/sala/create", "POST", { anfitrion, name });
    if (!res.ok) {
      console.log(`Error al crear la sala:${res.message}`);
      return;
    }
    agregar(res.data);
    reset();
  };

  return (
    <form className="container-fluid row  m-0" onSubmit={HandleCreateSubmit}>
      <div className="col-md-10 mx-auto my-1">
        <input
          name="name"
          value={name}
          onChange={HandleInputChange}
          type="text"
          placeholder="Nombre de la sala"
          className="form-control"
        />
      </div>
      <div className="col-md-10 mx-auto my-2">
        <button className="btn btn-dark">Crear - <MdCreate></MdCreate> </button>
      </div>
    </form>
  );
};
