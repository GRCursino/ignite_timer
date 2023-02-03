import { HomeContainer, StartCountdownButton, StopCountdownButton } from "./styles";
import { useForm, FormProvider } from 'react-hook-form';
import { useContext } from "react";
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';


import { HandPalm, Play } from 'phosphor-react';
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";
import { CyclesContext } from "../../contexts/CyclesContext";

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa.'),
  minutesAmount: zod
    .number()
    .min(5, 'O ciclo deve ter no mínimo ter 5 minutos.')
    .max(60, 'O ciclo deve ter no mínimo ter 60 minutos.')
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home(){

  const { activeCycle, createNewCycle, interruptCurrentCycle } = useContext(CyclesContext);

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task:'',
      minutesAmount: 0,
    }
  });

  const { handleSubmit, watch, reset } = newCycleForm;

  function handleCreateNewCycle(data: NewCycleFormData){
    createNewCycle(data);
    reset() // reseta os campos do formulario

  }

  const task = watch('task'); // hook do react hook form, para ver se o campo esta vazio ou nao.
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">   
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>   
          <Countdown />

        { activeCycle ? (
          <StopCountdownButton onClick={interruptCurrentCycle} type='button'>
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton type='submit' disabled={isSubmitDisabled}>
            <Play size={24} />
            Começar
          </StartCountdownButton>
        ) }
      </form>
    </HomeContainer>
  )
}