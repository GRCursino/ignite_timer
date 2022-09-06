import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";

export function DefaultLayout() {
  return(
    <div>
      <Header />
      <Outlet /> {/* Espaço que vai ser inserido contéudo, exemplo: outros componentes, códigos diversos, etc*/}
    </div>
  );
}