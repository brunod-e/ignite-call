import { prisma } from "@/lib/prisma"
import dayjs from "dayjs"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end()
  }

  const username = String(req.query.username)
  const { date } = req.query

  if (!date) {
    return res.status(400).json({
      error: "Missing date",
    })
  }

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!user) {
    return res.status(400).json({
      error: "User not found",
    })
  }

  const referenceDate = dayjs(String(date))
  const isPastDate = referenceDate.endOf("day").isBefore(new Date())

  if (isPastDate) {
    return res.json({
      availability: [],
      possibleTimes: [],
    })
  }

  const userAvailability = await prisma.userTimeInterval.findFirst({
    where: {
      user_id: user.id,
      week_day: referenceDate.get("day"),
    },
  })

  if (!userAvailability) {
    return res.json({
      availability: [],
      possibleTimes: [],
    })
  }

  const { time_start_in_minutes, time_end_in_minutes } = userAvailability

  const startHour = Math.floor(time_start_in_minutes / 60)
  const endHour = Math.floor(time_end_in_minutes / 60)

  const possibleTimes = Array.from({ length: endHour - startHour }).map(
    (_, index) => {
      return startHour + index
    }
  )

  const blockedTimes = await prisma.scheduling.findMany({
    select: {
      user_id: true,
      date: true,
    },
    where: {
      user_id: user.id,
      date: {
        gte: referenceDate.set("hour", startHour).toDate(),
        lte: referenceDate.set("hour", endHour).toDate(),
      },
    },
  })

  const availableTimes = possibleTimes.filter((time) => {
    return !blockedTimes.some(
      (blockedTime) => blockedTime.date.getHours() === time
    )
  })

  return res.json({ possibleTimes, availableTimes })
}
