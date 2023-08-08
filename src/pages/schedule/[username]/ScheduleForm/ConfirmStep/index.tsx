import { CalendarBlank, Clock } from "phosphor-react"
import { FormActions, FormContainer, FormHeader } from "./styles"
import { Button, Text, TextArea, TextInput } from "@ignite-ui/react"

export function ConfirmStep() {
  function handleConfirmScheduling() {}
  return (
    <FormContainer as="form" onSubmit={handleConfirmScheduling}>
      <FormHeader>
        <Text>
          <CalendarBlank />
          07 de Agosto de 2023
        </Text>
        <Text>
          <Clock />
          18:00h
        </Text>
      </FormHeader>
      <label>
        <Text size="sm">Nome completo</Text>
        <TextInput placeholder="Seu nome" />
      </label>
      <label>
        <Text size="sm">Endereço de email</Text>
        <TextInput placeholder="johndoe@example.com" />
      </label>
      <label>
        <Text size="sm">Observações</Text>
        <TextArea />
      </label>

      <FormActions>
        <Button type="button" variant="tertiary">
          Cancelar
        </Button>
        <Button type="submit">Confirmar</Button>
      </FormActions>
    </FormContainer>
  )
}
