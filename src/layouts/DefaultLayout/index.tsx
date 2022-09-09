import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header";
import { LayoutContainer } from "./styles";

export function DefaultLayout() {
  return(
    <LayoutContainer>
      <Header />
      <Outlet /> {/* Espaço que vai ser inserido contéudo, exemplo: outros componentes, códigos diversos, etc*/}
    </LayoutContainer>
  );
}