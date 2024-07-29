import { expect, test } from '@playwright/test'

test('Update profile successfully', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await page.getByRole('button', { name: 'Pizza Shop' }).click()
  await page.getByRole('menuitem', { name: 'Establishment profile' }).click()

  await page.getByLabel('Name').fill('Pizza Shop Mock')
  await page.getByLabel('Description').fill('Another mocked description')
  await page.getByRole('button', { name: 'Save' }).click()

  await page.waitForLoadState('networkidle')

  const toast = page.getByText('Profile updated successfully.')

  await expect(toast).toBeVisible()

  await page.getByRole('button', { name: 'Cancel' }).click()

  await expect(
    page.getByRole('button', { name: 'Pizza Shop Mock' }),
  ).toBeVisible()
})

test('Update profile unsuccessfully', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await page.getByRole('button', { name: 'Pizza Shop' }).click()
  await page.getByRole('menuitem', { name: 'Establishment profile' }).click()

  await page.getByLabel('Name').fill('Invalid establishment name')
  await page.getByLabel('Description').fill('Invalid establishment description')
  await page.getByRole('button', { name: 'Save' }).click()

  await page.waitForLoadState('networkidle')

  const toast = page.getByText('Error on update profile. Try again later.')

  await expect(toast).toBeVisible()
})
