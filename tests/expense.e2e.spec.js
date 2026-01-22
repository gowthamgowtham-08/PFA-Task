import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:5173";

test.describe("Expense Tracker – Core Stability Tests", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    await page.getByText("Expense Dashboard").waitFor();
  });


  test("Dashboard loads with summary cards", async ({ page }) => {
    await expect(page.getByText("Total Expenses")).toBeVisible();
    await expect(page.getByText("Categories")).toBeVisible();
  });


  test("Add Expense button is visible", async ({ page }) => {
    const addButton = page.getByRole("button", { name: " Add Expense" });
    await expect(addButton).toBeVisible();
  });

});
