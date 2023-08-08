import { Avatar, Heading, Text } from "@ignite-ui/react"
import { Container, UserHeader } from "./styles"
import { GetStaticPaths, GetStaticProps } from "next"
import { prisma } from "@/lib/prisma"
import { ScheduleForm } from "./ScheduleForm"

interface ScheduleProps {
  user: {
    name: string
    avatarUrl: string
    bio: string
  }
}

export default function Schedule({ user }: ScheduleProps) {
  const { name, avatarUrl, bio } = user

  return (
    <Container>
      <UserHeader>
        <Avatar src={avatarUrl} />
        <Heading>{name}</Heading>
        <Text>{bio}</Text>
      </UserHeader>
      <ScheduleForm />
    </Container>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const username = String(params?.username)

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!user) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      user: {
        name: user.name,
        avatarUrl: user.avatar_url,
        bio: user.bio,
      },
    },
    revalidate: 60 * 60 * 24, // 24 hours
  }
}
