// impor funcoes do REact necessarias para criar e usar contexto
import { createContext,useState,useContext } from "react";
//Criar o cotexto de autenticacao auqe via permitir compartiolhar dados entgre componentes 
const AuthContext = createContext();
//Esse componenete vai envolver a aplicacao (ou parte dela ) e fornever os dados de autenticacao oara os filhos
//Provider = prover/dar
export const AuthProvider = ({children}) => {
    //Criar um estado que guarda os dados do usuario logado
    const [usuario, setUsuario] = useState(null);

return(// O AuthContext.Provider permite que qualquer componete dentro dele acesse o usuario e setUsuario
    //Faz com que qualquer componente que esteja dentro de <AuthProvider> consiga acessar 
    //o valor {usuario, setUsuario} consiga acessar o valor usando o hook useAuth())
    <AuthContext.Provider value={{usuario,setUsuario}}>{children}</AuthContext.Provider>
);

}

// Esse hook personalizado facilita o acesso ao contexto dentro de qualquer componente dentro de quakqeur componetne 
//Usar!!

export const useAuth = () => useContext(AuthContext);