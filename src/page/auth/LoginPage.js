import React, { useContext, useState } from "react";
//import { Link } from "react-router-dom";
//import imagenLogin from "../../assets/image/login.svg";
import { authContext } from "../../context/authContext";
import { useForm } from "../../hooks/useForm";
import styleLogin from "../../assets/css/formreactivo.module.css";

const LoginPage = () => {
  const { login } = useContext(authContext);

  const { value, HandleInputChange } = useForm({ email: "", password: "" });
  const [error, seterror] = useState("");
  const { email, password } = value;

  const HandleLoginSubmit = async (e) => {
    e.preventDefault();
    await login(email, password, (err) => {
      seterror(err ? "Error en la validacion !!!" : "");
    });
  };

  return (
    // <div className='bg-custom container-fluid vh100 d-flex justify-content-center align-items-center'>
    <div className={styleLogin.login}>
      <h2 className={styleLogin.active}> sign in </h2>
      <h2 className={styleLogin.nonactive}> sign up </h2>

      <form className={styleLogin.formLogin} onSubmit={HandleLoginSubmit}>
        <input
          className={styleLogin.text}
          name="email"
          value={email}
          onChange={HandleInputChange}
          type="email"
          required
        />
        <br></br>
        
        <span className={styleLogin.isSpan}>Email</span>
        <input
          className={styleLogin.text}
          name="password"
          value={password}
          onChange={HandleInputChange}
          type="password"
          required
        />
         <br></br>
        <span className={styleLogin.isSpan}>Password</span>
        <br></br>

        {error.length !== 0 && (
          <div className="text-center text-warning">
            <small>{error}</small>
          </div>
        )}

        <input type="checkbox" id="checkbox-1-1" className="custom-checkbox" />
        <label className={styleLogin.eslabel} htmlFor="checkbox-1-1">Keep me Signed in</label>
        
       
          <button className={styleLogin.signin}>Login</button>
        
      </form>
    </div>
  );
};

export default LoginPage;
