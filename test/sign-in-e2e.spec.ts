import { expect, test } from '@playwright/test'

test('Sign in successfully', async ({ page }) => {
  await page.goto('/sign-in', { waitUntil: 'networkidle' })

  await page.getByLabel('Your e-mail').fill('jhondoe@example.com')
  await page.getByRole('button', { name: 'Access' }).click()

  const toast = page.getByText('We sent an authentication link to your email.')

  await expect(toast).toBeVisible()
})

test('Sign in with wrong credentials', async ({ page }) => {
  await page.goto('/sign-in', { waitUntil: 'networkidle' })

  await page.getByLabel('Your e-mail').fill('wrong@example.com')
  await page.getByRole('button', { name: 'Access' }).click()

  const toast = page.getByText('Something went wrong! Please try again later.')

  await expect(toast).toBeVisible()
})

test('Navigate to new restaurant page', async ({ page }) => {
  await page.goto('/sign-in', { waitUntil: 'networkidle' })

  await page.getByRole('link', { name: 'New establishment' }).click()

  expect(page.url()).toContain('/sign-up')
})
