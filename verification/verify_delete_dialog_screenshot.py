from playwright.sync_api import sync_playwright

def verify_delete_dialog_screenshot():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        try:
            print("Navigating to Users page...")
            page.goto("http://localhost:5173/users")

            # Wait for the users table to load
            page.wait_for_selector("text=Users", timeout=10000)

            # Click delete button on the first user
            delete_button = page.locator('button[aria-label="delete user"]').first
            delete_button.wait_for(state="visible", timeout=5000)
            delete_button.click()

            # Wait for dialog
            dialog = page.locator('role=dialog')
            dialog.wait_for(state="visible", timeout=2000)

            # Wait a bit for animation
            page.wait_for_timeout(500)

            # Take screenshot
            print("Taking screenshot...")
            page.screenshot(path="verification/delete_dialog.png")
            print("Screenshot saved to verification/delete_dialog.png")

        except Exception as e:
            print(f"Test failed: {e}")
            raise e
        finally:
            browser.close()

if __name__ == "__main__":
    verify_delete_dialog_screenshot()
