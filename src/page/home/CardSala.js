import React from "react";
import { useHistory } from "react-router-dom";
import { apiDiagrama } from "../../api/apiDiagrama";

const CardSala = (props) => {
  const { data, eliminar, idUser: anfitrion, update } = props;
  const history = useHistory();
  const HandleClickEliminar = async (idSala) => {
    const res = await apiDiagrama(`/sala/delete/${idSala}`, "DELETE", {
      anfitrion,
    });
    if (!res.ok) {
      console.warn("Error al eliminar la sala:" + res.message);
      return;
    }
    eliminar(idSala);
  };

  const HandleActiveSala = async (idSala) => {
    await apiDiagrama(`/sala/active/${idSala}`, "PUT", {
      anfitrion,
      active: true,
    });
    update(idSala, { active: true });
  };
  return (
    <div className="col-md-8">
      <div className="row row-cols-3">
        {data.map((sala) => (
          <div
            key={sala._id}
            className="card col-md-4 m-3"
            style={{ width: "18rem" }}
          >
            <div className="card-body">
              <h5 className="card-title">{sala.name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">{sala._id}</h6>

              {sala.active ? (
                <button
                  onClick={(e) => history.push(`/board/${sala._id}`)}
                  className="btn btn-success mr-2"
                >
                  ir a sala
                </button>
              ) : (
                <button
                  onClick={(e) => HandleActiveSala(sala._id)}
                  className="btn btn-primary mr-2"
                >
                  activate
                </button>
              )}
              <button
                onClick={(e) => HandleClickEliminar(sala._id)}
                className="btn btn-danger ml-2"
              >
                eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardSala;
