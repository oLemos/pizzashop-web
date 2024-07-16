import { QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import { MemoryRouter } from 'react-router-dom'

import { queryClient } from '@/lib/reactQuery'

import { SignIn } from '.'

describe('SignIn', () => {
  it('should set default email input value if email is present on search params', () => {
    const mockedEmail = 'jhondoe@example.com'

    const wrapper = render(<SignIn />, {
      wrapper: ({ children }) => (
        <HelmetProvider>
          <MemoryRouter initialEntries={[`/sign-in?email=${mockedEmail}`]}>
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
          </MemoryRouter>
        </HelmetProvider>
      ),
    })

    const emailInput = wrapper.getByLabelText('Your e-mail') as HTMLInputElement

    expect(emailInput.value).toEqual(mockedEmail)
  })
})
