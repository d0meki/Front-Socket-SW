import React from 'react'
import {AiFillCloseCircle} from "react-icons/ai";


const ModalGeneric = ( {titulo,llave,children} ) => {
  return (
    <div>
    <div className="modal fade" id={llave} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">{titulo}</h1>
            <button type="button" className="btn-close" data-bs-dismiss= "modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {children}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close - <AiFillCloseCircle></AiFillCloseCircle> </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default ModalGeneric