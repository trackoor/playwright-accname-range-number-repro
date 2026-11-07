import { test, expect } from '@playwright/test';

test('embedded number/range inputs use their current value in accessible names', async ({ page }) => {
  await page.setContent(`
    <input type="checkbox" id="cb"><label for="cb">Remind me <input type="number" value="3" aria-label="count"> times</label>
    <input type="checkbox" id="v"><label for="v">Volume <input type="range" aria-label="vol"> percent</label>
    <input type="checkbox" id="w"><label for="w">Level <input type="range" max="10" value="70" aria-label="lvl"> of 10</label>
  `);
  await page.getByLabel('count').fill('5');

  const boxes = page.getByRole('checkbox');
  await expect(boxes.nth(0)).toHaveAccessibleName('Remind me 5 times');
  await expect(boxes.nth(1)).toHaveAccessibleName('Volume 50 percent');
  await expect(boxes.nth(2)).toHaveAccessibleName('Level 10 of 10');
});
