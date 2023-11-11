import { CalendarBlank, Clock } from "phosphor-react"
import { FormActions, FormContainer, FormError, FormHeader } from "./styles"
import { Button, Text, TextArea, TextInput } from "@ignite-ui/react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import dayjs from "dayjs"
import { useRouter } from "next/router"
import { api } from "@/lib/axios"

const confirmFormSchema = z.object({
  name: z
    .string()
    .min(3, "O nome precisa no mínimo 3 caracteres")
    .max(255, "Nome muito longo, precisa ser menor que 255 caracteres"),
  email: z.string().email("Digite um e-mail válido"),
  notes: z.string().nullable(),
})

type ConfirmFormData = z.infer<typeof confirmFormSchema>

interface ConfirmStepProps {
  schedulingDate: Date
  onCancelConfirmation: () => void
}

export function ConfirmStep({
  schedulingDate,
  onCancelConfirmation,
}: ConfirmStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ConfirmFormData>({
    resolver: zodResolver(confirmFormSchema),
  })

  const router = useRouter()
  const username = String(router.query.username)

  async function handleConfirmScheduling(data: ConfirmFormData) {
    const { name, email, notes } = data

    await api.post(`/users/${username}/schedule`, {
      name,
      email,
      notes,
      date: schedulingDate,
    })

    onCancelConfirmation()
  }

  const describedDate = dayjs(schedulingDate).format("DD [de] MMMM [de] YYYY")
  const describedTime = dayjs(schedulingDate).format("HH:mm[h]")

  return (
    <FormContainer as="form" onSubmit={handleSubmit(handleConfirmScheduling)}>
      <FormHeader>
        <Text>
          <CalendarBlank />
          {describedDate}
        </Text>
        <Text>
          <Clock />
          {describedTime}
        </Text>
      </FormHeader>
      <label>
        <Text size="sm">Nome completo</Text>
        <TextInput placeholder="Seu nome" {...register("name")} />
        {errors.name && <FormError size="sm">{errors.name.message}</FormError>}
      </label>
      <label>
        <Text size="sm">Endereço de email</Text>
        <TextInput placeholder="johndoe@example.com" {...register("email")} />
        {errors.email && (
          <FormError size="sm">{errors.email.message}</FormError>
        )}
      </label>
      <label>
        <Text size="sm">Observações</Text>
        <TextArea {...register("notes")} />
      </label>

      <FormActions>
        <Button type="button" variant="tertiary" onClick={onCancelConfirmation}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          Confirmar
        </Button>
      </FormActions>
    </FormContainer>
  )
}
