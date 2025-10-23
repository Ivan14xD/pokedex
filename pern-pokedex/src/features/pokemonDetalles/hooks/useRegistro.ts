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
        alert(error);
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
                alert(error);
                throw new Error("Error al crear el usuario");
            }   
        }
    });
}
