import { Button, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react";
import { Container, Form, FormError, Header } from "./styles";
import { ArrowRight } from "phosphor-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useEffect } from "react";

const registerFormSchema = z.object({
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
    name: z.string().min(3, {
        message: 'O nome de usuário deve ter pelo menos 3 caracteres',
    })
})

type RegisterFormData = z.infer<typeof registerFormSchema>

export default function Register() {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerFormSchema),
    })

    const router = useRouter()

    async function handleRegister(data: RegisterFormData) { }

    useEffect(() => {
        if (router.query.username) {
            setValue('username', String(router.query.username))
        }
    }, [router.query?.username, setValue])

    return (
        <Container>
            <Header>
                <Heading as='strong'>Bem-vindo ao Ignite Call!</Heading>
                <Text>Precisamos de algumas informações para criar seu perfil! Ah, você pode editar essas informações depois.</Text>

                <MultiStep size={4} currentStep={1} />
            </Header>

            <Form as='form' onSubmit={handleSubmit(handleRegister)}>
                <label>
                    <Text>Nome de usuário</Text>
                    {/* @ts-ignore */}
                    <TextInput prefix='ignite.com/' placeholder='seu-usuario' {...register('username')} />
                    {errors.username && <FormError size='sm'>{errors.username.message}</FormError>}
                </label>

                <label>
                    <Text>Nome completo</Text>
                    {/* @ts-ignore */}
                    <TextInput placeholder='Seu nome' {...register('name')} />
                    {errors.name && <FormError size='sm'>{errors.name.message}</FormError>}
                </label>

                <Button type='submit' disabled={isSubmitting}>Próximo passo <ArrowRight /></Button>
            </Form>
        </Container>
    )
}