import { api } from '@/lib/axios'

export interface RegisterRestaurantBody {
  restaurantName: string
  managerName: string
  email: string
  phone: string
}

export async function registerRestaurant({
  email,
  phone,
  managerName,
  restaurantName,
}: RegisterRestaurantBody) {
  await api.post('/restaurants', {
    email,
    phone,
    managerName,
    restaurantName,
  })
}
