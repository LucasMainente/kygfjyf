import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "../pages/login/Login"
import TipoEvento from "../pages/tipoEvento/TipoEvento"
import CadastroEvento from "../pages/cadastroEvento/CadastroEvento"
import CadastroUsuario from "../pages/cadastroUsuario/CadastroUsuario"
import ListagemEvento from "../pages/listagemEvento/ListagemEvento"
import { useAuth } from "../contexts/AuthContext";

const Rotas = () => {
    const { usuario } = useAuth();

    const Privado = (props) => {
        if(!usuario){
            return <Navigate to="/"/>;
        }
        if (usuario.tipoUsuario !== props.tipoPermitido){
            return <Navigate to="/" />
        }
        return <props.Item />;
    }

    
    

    return(
         <BrowserRouter>
        <Routes>
            <Route path="/" element = {<Login/>} exact/>
            <Route path="/TipoEvento" element = {<Privado tipoPermitido="ADMIN" Item={TipoEvento}/>}/>
            <Route path="/Eventos" element = {< Privado tipoPermitido="ADMIN" Item= {CadastroEvento}/>}/>
            <Route path="/TipoUsuario" element = {<Privado tipoPermitido="ADMIN" Item={CadastroUsuario}/>}/>
            <Route path="/ListagemEvento" element = {<Privado tipoPermitido="Común" Item={ ListagemEvento}/>}/>
            {/* <Route path="/Home" element = {<Home/>}/> */}
        </Routes>
        </BrowserRouter>
    )
}

export default Rotas;