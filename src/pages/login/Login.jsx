import Botao from "../../components/botao/Botao";
import Logo from "../../assents/img/logo1.svg";
import Banner from "../../assents/img/fundo_login.png"
import api from './../../Services/services'
import "./Login.css";
import { useState } from "react";
import secureLocalStorage from "react-secure-storage";
import { useAuth } from './../../contexts/AuthContext'

import { userDecodeToken } from './../../auth/Auth'
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { setUsuario } = useAuth();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const navigate = useNavigate();


    async function realizarAutenticacao(e) {
        e.preventDefault();
        // console.log(email, senha);

        const usuario = {
            email: email,
            senha: senha
        }
        if (senha.trim() !== "" || email.trim() !== "") {
            try {


                const resposta = await api.post("Login", usuario);

                const token = resposta.data.token;

                if (token) {
                    const tokenDecodificado = userDecodeToken(token);

                    setUsuario(tokenDecodificado);
                    secureLocalStorage.setItem("tokenLogin", JSON.stringify(tokenDecodificado));
                    // console.log("O tipo de usuario é");

                    console.log(tokenDecodificado.tipoUsuario)

                    if (tokenDecodificado.tipoUsuario === "Común") {
                        console.log("Usuairo entrou");
                        navigate("/ListagemEvento")
                    } else {
                        

                        navigate("/Eventos")
                    }
                }

            } catch (error) {
                console.log(error);
                alert("Email ou senha invalidos! Para duvidas entre em contato com o suporte.")
            }
        } else {
            alert("Por favor preencha os campos para realizar o login");

        }
    }

    return (
        <main className="mae_de_todas">
            <div className="banner">
                <img src={Banner} alt="banner do fundo do Login" />
            </div>

            <section className="section_login">
                <img src={Logo} alt="Logo do Event+" />
                <form action="" className="form_login" onSubmit={realizarAutenticacao}>

                    <div className="campos_login">
                        <div className="campo_imput">
                            <label htmlFor="email"></label>
                            <input className="email" type="email" name="email" placeholder="usename" value={email} onChange={(e) => setEmail(e.target.value)} />

                        </div>
                        <div className="campo_imput">
                            <label htmlFor="senha"></label>
                            <input type="password" name="senha" placeholder="password" value={senha} onChange={(e) => setSenha(e.target.value)} />

                        </div>
                    </div>
                    <h3 className="mudar_senha">Esqueceu a senha?</h3>
                    <Botao nomeBotao="Login" />
                </form>
            </section>
        </main>
    )
}
export default Login;