import React, { useState } from "react";
//import { Link } from 'react-router-dom';
import imPerson from "../assets/image/person.png";
import imContainer from "../assets/image/container.png";
import imDB from "../assets/image/DB.png";
import imFlecha from "../assets/image/flecha.png";
import imsystExtern from "../assets/image/swext.png";
import imComponent from "../assets/image/component.png";

const Sidebar = (props) => {
  const { show, HandleTypeModal, HandleTypeDiagram } = props;
  const [nivel, setnivel] = useState("Container");

  const HandleChange = (e) => {
    HandleTypeDiagram(e.target.value);
    setnivel(e.target.value);
  };

  return (
    <div
      className="p-3 bg-secondary"
      style={show ? { left: "0" } : { left: "0" }}
    >
      {/* <Link to={"/"} className='d-block text-center text-decoration-none fs-4 text-white pointer'>C4 Diagramas</Link> */}

      {/* <hr className="border border-white" /> */}

      <div class="alert alert-info" role="alert">
        Componentes C4
      </div>
      
        <ul className="sidebardos">
          <li className="my-1 text-center">
            <small className="text-white">Persona</small>
            <p
              onClick={() => HandleTypeModal("person")}
              className="text-decoration-none d-block  text-center text-white pointer"
              data-bs-toggle="modal"
              data-bs-target="#modal-create"
            >
              <img src={imPerson} height={48} alt={"person"} />
            </p>
          </li>

          <li className="my-1 text-center">
            <small className="text-white">Contenedor</small>
            <p
              onClick={() => HandleTypeModal("container")}
              className="text-decoration-none d-block  text-center text-white pointer"
              data-bs-toggle="modal"
              data-bs-target="#modal-create"
            >
              <img src={imContainer} height={48} alt={"container"} />
            </p>
          </li>

          <li className="my-1 text-center">
            <small className="text-white">Sistemas</small>
            <p
              onClick={() => HandleTypeModal("system_extern")}
              className="text-decoration-none d-block  text-center text-white pointer"
              data-bs-toggle="modal"
              data-bs-target="#modal-create"
            >
              <img src={imsystExtern} height={48} alt={"system_extern"} />
            </p>
          </li>

          <li className="my-1 text-center">
            <small className="text-white">Base de Datos</small>
            <p
              onClick={() => HandleTypeModal("containerDB")}
              className="text-decoration-none d-block  text-center text-white pointer"
              data-bs-toggle="modal"
              data-bs-target="#modal-create"
            >
              <img src={imDB} height={48} alt={"containerDB"} />
            </p>
          </li>

          <li className="my-1 text-center">
            <small className="text-white">Relacion</small>
            <p
              onClick={() => HandleTypeModal("Relation")}
              className="text-decoration-none d-block p-2 text-center text-white pointer"
              data-bs-toggle="modal"
              data-bs-target="#modal-create"
            >
              <img src={imFlecha} height={20} alt={"Relation"} />
            </p>
          </li>

          {/* <li className="my-1 text-center">
            <p
              onClick={() => HandleTypeModal("SystemBoundary")}
              className="text-decoration-none d-block p-2 text-center text-white pointer"
              data-bs-toggle="modal"
              data-bs-target="#modal-create"
            >
              <small className="text-white">DrawSystemBoundary</small>
            </p>
          </li> */}

          <li className="my-1 text-center">
            <p
              onClick={() => HandleTypeModal("Eliminar")}
              className="text-decoration-none d-block p-2 text-center text-white pointer"
              data-bs-toggle="modal"
              data-bs-target="#modal-create"
            >
              <small className="text-white">Eliminar</small>
            </p>
          </li>
        </ul>
    </div>
  );
};

export default Sidebar;
