import { Button, TextInput, Text } from '@ignite-ui/react'
import { Form, FormAnnotation } from './styles'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'

const claimUsernameFormSchema = z.object({
    username: z
        .string()
        .min(3, {
            message: 'O nome de usuário deve ter pelo menos 3 caracteres',
        })
        .max(20, {
            message: 'O nome de usuário deve ter no máximo 20 caracteres',
        })
        .regex(/^[a-z0-9//-]+$/i, {
            message: 'O nome de usuário não pode conter caracteres especiais',
        })
        .transform((username) => username.toLowerCase()),
})

type ClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema>

export function ClaimUsernameForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ClaimUsernameFormData>({
        resolver: zodResolver(claimUsernameFormSchema),
    })

    const router = useRouter()

    async function handleClaimUsername(data: ClaimUsernameFormData) {
        const { username } = data

        await router.push(`/register?username=${username}`)
    }

    return (
        <>
            <Form as='form' onSubmit={handleSubmit(handleClaimUsername)}>
                {/* @ts-ignore */}
                <TextInput
                    size='sm'
                    prefix='ignite.com/'
                    placeholder='seu-usuário'
                    {...register('username')}
                />
                <Button size='sm' type='submit' disabled={isSubmitting}>
                    Reservar
                    <ArrowRight />
                </Button>
            </Form>
            <FormAnnotation>
                <Text size='sm'>
                    {errors.username
                        ? errors.username.message
                        : 'Digite o nome de usuário desejado'}
                </Text>
            </FormAnnotation>
        </>
    )
}
