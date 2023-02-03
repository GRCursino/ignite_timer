import { differenceInSeconds } from "date-fns";
import { useContext, useEffect} from "react";
import { CyclesContext } from "../../../../contexts/CyclesContext";
import { CountdownContainer, Separator } from "./styles"

{/* Para exibir corretamente, usamos a posição da string minutes e seconds como posição de vetor,
    desta maneira exibe corretamente número inteiro ou zero, visto que minutes e seconds foram formatados
    acima com o padStart
*/}

export function Countdown() {
  const { activeCycle, activeCycleId, markCurrentCycleAsFinished, amountSecondsPassed, setSecondsPassed } = useContext(CyclesContext);
  
  // Convertendo minutos para segundos
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;

  
  useEffect(() => {
    let interval: number;

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(), 
          new Date(activeCycle.startDate));

        if (secondsDifference >= totalSeconds) {
          markCurrentCycleAsFinished();

          setSecondsPassed(totalSeconds) // Reflete o valor 00:00 na interface quando o ciclo chegar ao fim

          clearInterval(interval)
        } else {
          setSecondsPassed(secondsDifference) // Atualiza os segundos passados caso o total de segundos não tenha atingido o seu próprio total, indicando o término do ciclo 
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval);
    }
  }, [activeCycle, totalSeconds, activeCycleId, markCurrentCycleAsFinished, amountSecondsPassed]) // quando usamos uma variável externa ou função, a mesma deve ser passada no array de dependencias

  
  // Número de segundos atual
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  // Calculo de minutos
  const minutesAmount = Math.floor(currentSeconds / 60); // Arredonda pra baixo, pegando somente minutos cheios
  const secondsAmount = currentSeconds % 60

  // Formatação para exibição em tela
  const minutes = String(minutesAmount).padStart(2, '0'); // Inclui zero no para ficar com 2 casas numéricas, seja no começo ou final
  const seconds = String(secondsAmount).padStart(2, '0'); // Inclui zero no para ficar com 2 casas numéricos seja no começo ou final
  
  // Coloca o tempo passado como título da aba
  useEffect(() => {
    if (activeCycle){
      document.title = `${minutes}:${seconds}`
    }
  }, [minutes, seconds, activeCycle]);

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}