import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Pokedex from "../features/cuadricula/components/Pokedex";
import Equipo from "../features/equipo/components/Equipo";
import { EjemploUseReducer } from "../features/ejemplosHooks/EjemploUseReducer";

export const routes = createBrowserRouter([
    {
        path: "/",
        Component: App,
        errorElement: <Error />,
        children: [
            {
                path: "/",
                Component: Pokedex
            },
            {
                path:"/prueba",
                Component: Equipo
            },
            {
                path: "batalla",
                Component: EjemploUseReducer
            }
        ]
    }
]);