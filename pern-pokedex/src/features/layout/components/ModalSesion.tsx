import React, { useState } from 'react'
import { Modal } from '@mantine/core';
import {set, z} from 'zod';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import { useCrearUsuario, useLogin } from '../../pokemonDetalles/hooks/useRegistro';
import { flushSync } from 'react-dom';
import { useUserStore } from '../store/userStore';

const LOGIN = z.object({
    username: z.string().min(5, "El usuario es obligatorio"),
    contrasena: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});

type formValues = z.infer<typeof LOGIN>;

export default function ModalSesion({onOpened, onClose} : {onOpened : boolean, onClose: () => void}) {
    const [sesion, setSesion] = useState(false);

    const setUser = useUserStore((state) => state.setUser);
    const logout = useUserStore((state) => state.logout);

    const { mutate: login } = useLogin();

    const { mutate: crearUsuario } = useCrearUsuario();
    
    const form = useForm<formValues>({
        resolver: zodResolver(LOGIN),
        defaultValues: {
            username: "",
            contrasena: "",
        }
    });


     const onSubmit = (data: formValues) => {
        if(sesion) {
            // Lógica para registro
            crearUsuario(data);
        } else {
            // Lógica para inicio de sesión

            login(data, {
                onSuccess: (data) => {
                    flushSync(() => logout());
                    setUser(data);
                    form.reset();
                },
            });
        }
        
         console.log(data);
     }

  return (
    <Modal title="Iniciar Sesión" opened={onOpened} onClose={onClose} centered>
                
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-4">
                        <input
                            type="text"
                            placeholder="Usuario"
                            className="border border-gray-300 rounded-md p-2"
                            {...form.register("username")}
                        />
                        {form.formState.errors.username && (
                            <p className="text-red-500 text-sm">{form.formState.errors.username.message}</p>
                        )}
                        <input
                            type="password"
                            placeholder="Contraseña"
                            className="border border-gray-300 rounded-md p-2"
                            {...form.register("contrasena")}  
                        />
                        {form.formState.errors.contrasena && (
                            <p id="contrasena-error" className="text-red-500 text-sm">{form.formState.errors.contrasena.message}</p>
                        )}
                        <button
                            type="submit"
                            className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600"
                        >
                            Iniciar Sesión
                        </button>
                        <div className="flex items-center gap-3">
                            <span className="text-sm">{sesion ? "Registrarse" : "Iniciar sesión"}</span>
                            <button
                                type="button"
                                onClick={() => setSesion(prev => !prev)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                                sesion ? "bg-red-300" : "bg-blue-300"
                                }`}
                            >
                                <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                                    sesion ? "translate-x-6" : "translate-x-1"
                                }`}
                                />
                            </button>
                        </div>
                    </div>
                </form>
            </Modal>
    
  )
}
