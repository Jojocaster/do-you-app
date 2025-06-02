import { Event } from '../components/EventWidget/EventWidget'

export const getEvents = async () => {
  const result = await fetch(
    'https://mahina.app/app/doyouworld.myshopify.com',
    {
      body: '{"shop":"doyouworld.myshopify.com","selectedEventId":null,"selectedRecurringDate":null,"page":1}',
      method: 'POST',
    }
  )
  const data = await result.json()
  const events = data?.events as Event[]
  return events || []
}
