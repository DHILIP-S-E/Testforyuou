from playwright.sync_api import sync_playwright

def verify_frontend():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # 1. Dashboard
        try:
            print("Navigating to Dashboard...")
            page.goto("http://localhost:5173/")
            page.wait_for_timeout(2000) # Wait for initial load
            page.screenshot(path="verification_dashboard.png", full_page=True)
            print("Dashboard screenshot taken.")
        except Exception as e:
            print(f"Error on Dashboard: {e}")

        # 2. Users
        try:
            print("Navigating to Users...")
            page.goto("http://localhost:5173/users")
            page.wait_for_selector("text=Users", timeout=5000)
            page.wait_for_timeout(1000)
            page.screenshot(path="verification_users.png", full_page=True)
            print("Users screenshot taken.")
        except Exception as e:
            print(f"Error on Users: {e}")

        # 3. eCommerce
        try:
            print("Navigating to eCommerce...")
            page.goto("http://localhost:5173/ecommerce/products")
            page.wait_for_selector("text=Products", timeout=5000)
            page.wait_for_timeout(2000) # Wait for images
            page.screenshot(path="verification_ecommerce.png", full_page=True)
            print("eCommerce screenshot taken.")
        except Exception as e:
            print(f"Error on eCommerce: {e}")

        browser.close()

if __name__ == "__main__":
    verify_frontend()
