import { api } from '@/lib/axios'

interface UpdateProfileBody {
  name: string
  description: string
}

export async function updateProfile({ name, description }: UpdateProfileBody) {
  const body = { name, description }

  await api.put('/profile', body)
}
