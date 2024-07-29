import { expect, test } from '@playwright/test'

test('Sign up successfully', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  await page.getByLabel('Establishment name').fill('Pizza Shop')
  await page.getByLabel('Your name').fill('John Doe')
  await page.getByLabel('Your phone').fill('00123456789')
  await page.getByLabel('Your e-mail').fill('johndoe@example.com')

  await page.getByRole('button', { name: 'Create' }).click()

  const toast = page.getByText('Establishment created successfully!')

  await expect(toast).toBeVisible()
})

test('Sign up with wrong credentials', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  await page.getByLabel('Establishment name').fill('Invalid establishment name')
  await page.getByLabel('Your name').fill('Invalid name')
  await page.getByLabel('Your phone').fill('Invalid phone')
  await page.getByLabel('Your e-mail').fill('invalid@example.com')

  await page.getByRole('button', { name: 'Create' }).click()

  const toast = page.getByText('Error when creating establishment.')

  await expect(toast).toBeVisible()
})

test('Navigate to login page', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  await page.getByRole('link', { name: 'Login' }).click()

  expect(page.url()).toContain('/sign-in')
})
