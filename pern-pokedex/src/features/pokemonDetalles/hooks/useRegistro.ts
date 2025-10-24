import { useMutation } from "@tanstack/react-query";
import api from "../../../shered/utils/api";

export function useLogin() {
  return useMutation({
    mutationFn: async (data: { username: string; contrasena: string }) => {
      try{
        const response = await api.post("autenticacion", data
        );
        return response.data;
      }catch(error){
        alert("Contraseña o usuario incorrecto");
        console.log(error);
        throw new Error("Error en el inicio de sesión");
      }
    }
  });
}

export function useCrearUsuario(){
    return useMutation({
        mutationFn: async (data: { username: string; contrasena: string }) => {
            try{
                const response = await api.post("usuario", data
                );
                return response.data;
            }catch(error){
                alert("El usuario ya existe");
                console.log(error);
                throw new Error("Error al crear el usuario");
            }   
        }
    });
}
