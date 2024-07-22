import { http, HttpResponse } from 'msw'

import { GetProfileResponse } from '../getProfile'

export const getProfileMock = http.get<never, never, GetProfileResponse>(
  '/me',
  () => {
    return HttpResponse.json({
      id: 'custom-user-id',
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '00123456789',
      role: 'manager',
      createdAt: new Date(),
      updatedAt: null,
    })
  },
)
