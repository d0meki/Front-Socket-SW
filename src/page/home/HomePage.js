import React, { useCallback, useContext, useEffect, useState } from "react";
import { authContext } from "../../context/authContext";
import socketContext from "../../context/socketContext";
import { useLoadSala } from "../../hooks/useLoadSala";
import { CreateSala } from "./CreateSala";
//import List from "./List";
import { useForm } from "../../hooks/useForm";
import { useHistory } from "react-router-dom";
import { apiDiagrama } from "../../api/apiDiagrama";
import styleIndex from "../../assets/css/formreactivo.module.css";

import { RiLogoutCircleRLine } from "react-icons/ri";
import { AiFillDownCircle } from "react-icons/ai";
import { GiPadlockOpen } from "react-icons/gi";
import { IoIosCreate } from "react-icons/io";
import { TbArrowsJoin } from "react-icons/tb";

import ModalGeneric from "../../components/ModalGeneric";
import CardSala from "./CardSala";

const HomePage = () => {
  const history = useHistory();
  const { online, socket } = useContext(socketContext);
  const { auth, logout } = useContext(authContext);
  const { id } = auth;
  const { salas, agregar, eliminar, update } = useLoadSala(id);

  const { value, HandleInputChange } = useForm({
    idSala: "",
  });
  const { idSala } = value;

  const HandleLogout = () => {
    logout();
  };
  
  const SetUserSala = useCallback(
    async (idSala) => {
      const res = await apiDiagrama(`/sala/setUsuario/${idSala}`, "PUT", {
        idUser: id,
      });

      if (!res.ok) {
        console.log("Error al agregar el usuario");
        return;
      }
      history.replace(`/board/${idSala}`);
    },
    [history, id]
  );

  const HandleSolicitudSala = (e) => {
    e.preventDefault();
    socket.emit("solicitud-sala", { idSala, nameUser: auth.name, idUser: id });
  };

  const [usuarios, setUsuarios ] = useState([]);
  useEffect(() => {
    async function obtenerUsuarios(){
      let token = localStorage.getItem("keyID") || null;
      let { id } = JSON.parse(atob(token));
      const response = await apiDiagrama(`/user/getOne/${id}`);
      setUsuarios(response.data);
    }
    obtenerUsuarios();
    socket.on("respuesta-solicitud", (args) => {
      const { active, denegado, idSala } = args;
      if (!active) {
        alert("La sala no esta activa!!!");
        return;
      }
      if (denegado) {
        alert("El anfitrion a denegado la solicitud!!!");
        return;
      }
     
      SetUserSala(idSala);
    });

    return () => {
      socket.removeAllListeners("respuesta-solicitud");
    };
  }, [socket, SetUserSala]);

  return (
    <div className="vh100 bg-content">
      <header className="text-white container-fluid">
        <div className={styleIndex.navbar}>
          <div className="m-3 ">{usuarios.name} - {usuarios.email}</div>
          <div>
            <h1 className="my-1  text-center">Home C4 Diagrama</h1>
          </div>
          <div className="col-md-1 text-center justify-content-center d-flex align-items-center">
            <button onClick={HandleLogout} className="btn btn-info">
              SALIR <RiLogoutCircleRLine></RiLogoutCircleRLine>
            </button>
          </div>
        </div>
      </header>

      {online ? (
        <h4 className="text-center d-block text-primary">
          Conectado{" "}
          <AiFillDownCircle className="text-success"></AiFillDownCircle>
        </h4>
      ) : (
        <h4 className="text-center d-block text-danger">
          Desconectado <AiFillDownCircle></AiFillDownCircle>
        </h4>
      )}

      <section className="container-fluid mt-2">
        <div className="row row-cols-3">
          {/* <List data={salas} eliminar={eliminar} idUser={id} update={update} /> */}

          <CardSala
            data={salas}
            eliminar={eliminar}
            idUser={id}
            update={update}
          />
          <div className="col-md-4 p-1 justify-content-start d-flex flex-column ">
            <button
              type="button"
              className="btn btn-warning mb-2"
              data-bs-toggle="modal"
              data-bs-target="#btn1"
            >
              Unirse a Sala -<GiPadlockOpen></GiPadlockOpen>
            </button>
            <ModalGeneric titulo="Unirse a Sala" llave="btn1">
              <form
                className="container-fluid row  m-0"
                onSubmit={HandleSolicitudSala}
              >
                <div className="col-md-10 mx-auto my-1">
                  <input
                    type="text"
                    name={"idSala"}
                    onChange={HandleInputChange}
                    value={idSala}
                    placeholder="Inserte llave de sala"
                    className="form-control"
                  />
                </div>
                <div className="col-md-10 mx-auto my-2">
                  <button className="btn btn-dark">
                    Unirse - <TbArrowsJoin></TbArrowsJoin>{" "}
                  </button>
                </div>
              </form>
            </ModalGeneric>
            <button
              type="button"
              className="btn btn-warning"
              data-bs-toggle="modal"
              data-bs-target="#btn2"
            >
              Crear Sala -<IoIosCreate></IoIosCreate>
            </button>
            <ModalGeneric titulo="Crear Sala" llave="btn2">
              <CreateSala agregar={agregar} idUser={id} />
            </ModalGeneric>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
