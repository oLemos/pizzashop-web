import { expect, test } from '@playwright/test'

test('List orders', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await expect(
    page.getByRole('cell', { name: 'Costumer 1', exact: true }),
  ).toBeVisible()

  await expect(
    page.getByRole('cell', { name: 'Costumer 10', exact: true }),
  ).toBeVisible()
})

test('Paginate orders', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  // Next page
  await page.getByRole('button', { name: 'Next page' }).click()

  await expect(
    page.getByRole('cell', { name: 'Costumer 11', exact: true }),
  ).toBeVisible()

  await expect(
    page.getByRole('cell', { name: 'Costumer 20', exact: true }),
  ).toBeVisible()

  // Last page
  await page.getByRole('button', { name: 'Last page' }).click()

  await expect(
    page.getByRole('cell', { name: 'Costumer 51', exact: true }),
  ).toBeVisible()

  await expect(
    page.getByRole('cell', { name: 'Costumer 60', exact: true }),
  ).toBeVisible()

  // Previous page
  await page.getByRole('button', { name: 'Previous page' }).click()

  await expect(
    page.getByRole('cell', { name: 'Costumer 41', exact: true }),
  ).toBeVisible()

  await expect(
    page.getByRole('cell', { name: 'Costumer 50', exact: true }),
  ).toBeVisible()

  // First page
  await page.getByRole('button', { name: 'First page' }).click()

  await expect(
    page.getByRole('cell', { name: 'Costumer 1', exact: true }),
  ).toBeVisible()

  await expect(
    page.getByRole('cell', { name: 'Costumer 10', exact: true }),
  ).toBeVisible()
})

test('Filter by order id', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await page.getByPlaceholder('Order ID').fill('order-11')
  await page.getByRole('button', { name: 'Filter results' }).click()

  await expect(page.getByRole('cell', { name: 'order-11' })).toBeVisible()
})

test('Filter by costumer name', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await page.getByPlaceholder('Costumer name').fill('Costumer 11')
  await page.getByRole('button', { name: 'Filter results' }).click()

  await expect(page.getByRole('cell', { name: 'Costumer 11' })).toBeVisible()
})

test('Filter by status', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await page.getByRole('combobox').click()
  await page.getByLabel('Pending').click()
  await page.getByRole('button', { name: 'Filter results' }).click()

  const tableRows = page.getByRole('cell', { name: 'Pending' })

  await expect(tableRows).toHaveCount(10)
})
