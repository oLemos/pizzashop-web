import { http, HttpResponse } from 'msw'

import { GetManagedRestaurantResponse } from '../getManagedRestaurant'

export const getManagedRestaurantMock = http.get<
  never,
  never,
  GetManagedRestaurantResponse
>('/managed-restaurant', () => {
  return HttpResponse.json({
    id: 'custom-restaurant-id',
    name: 'Pizza Shop',
    description: 'Custom restaurant description',
    managerId: 'custom-managed-restaurant-id',
    createdAt: new Date(),
    updatedAt: null,
  })
})
