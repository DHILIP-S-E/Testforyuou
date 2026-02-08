from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    try:
        # Go to users page
        print("Navigating to users page...")
        page.goto("http://localhost:5173/users")

        # Wait for the table to load
        print("Waiting for table...")
        page.wait_for_selector("table", timeout=10000)

        # Wait a bit for rows to render
        page.wait_for_timeout(2000)

        # Get first row
        row = page.locator("tbody tr").first

        if row.count() == 0:
            print("No users found in table.")
            # Take screenshot anyway to see what's wrong
            page.screenshot(path="verification_no_users.png")
            return

        print("Found users. Clicking delete button...")
        # Get delete button (second button in the row - assuming Edit is first)
        delete_btn = row.locator("button").nth(1)

        delete_btn.click()

        # Wait for dialog
        print("Waiting for dialog...")
        dialog = page.locator("[role='dialog']")
        dialog.wait_for(state="visible", timeout=5000)

        # Take screenshot
        page.screenshot(path="verification_delete_dialog.png")
        print("Screenshot taken: verification_delete_dialog.png")

    except Exception as e:
        print(f"Error: {e}")
        page.screenshot(path="verification_error.png")

    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)
