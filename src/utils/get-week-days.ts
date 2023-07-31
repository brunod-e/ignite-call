export function getWeekDays() {
  const formatter = new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
  })

  return Array.from(Array(7).keys())
    .map((day) => formatter.format(new Date(Date.UTC(2021, 5, day))))
    .map((weekday) => weekday.charAt(0).toUpperCase() + weekday.slice(1))
}
