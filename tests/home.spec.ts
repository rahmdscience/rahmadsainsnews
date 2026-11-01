import { expect, test } from "@playwright/test";

test.describe("RSAH Journal home page", () => {
  test("publishes crawlable SEO metadata and structured data", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle("RSAH — #tangguh");
    await expect(page.locator("meta[name='description']")).toHaveAttribute(
      "content",
      /RSAH adalah ruang/
    );
    await expect(page.locator("link[rel='canonical']")).toHaveAttribute(
      "href",
      /localhost:3000\/?$/
    );
    await expect(page.locator("meta[property='og:type']")).toHaveAttribute(
      "content",
      "website"
    );
    await expect(page.locator("script[type='application/ld+json']")).toHaveCount(1);

    const [robots, sitemap] = await Promise.all([
      page.request.get("/robots.txt"),
      page.request.get("/sitemap.xml"),
    ]);
    expect(robots.ok()).toBeTruthy();
    expect(sitemap.ok()).toBeTruthy();
    expect(await sitemap.text()).toContain("<urlset");
  });

  test("renders all chapters and accessible article headings", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator(".article-section")).toHaveCount(3);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h2")).toHaveCount(2);
    await expect(page.locator("nav[aria-label='Article chapters'] .chapter-link")).toHaveCount(3);
  });

  test("opens an individual article page with related stories", async ({ page }) => {
    await page.goto("/");
    const articleLink = page.locator(".article-read-link").first();
    await expect(articleLink).toHaveAttribute("href", "/articles/think-for-yourself");
    await page.goto("/articles/think-for-yourself");

    await expect(page).toHaveURL(/\/articles\/think-for-yourself$/);
    await expect(page.locator("h1")).toHaveText("Think for Yourself");
    await expect(page.locator(".article-detail-body")).toContainText("Thoughts is where RSAH");
    await expect(page.locator(".article-detail-quote")).toContainText("Your first opinion");
    await expect(page.locator(".related-article-card")).toHaveCount(2);
  });

  test("renders editorial media details and a gallery on an article page", async ({ page }) => {
    await page.goto("/articles/built-through-repetition");

    await expect(page.locator(".article-media-caption")).toContainText("Progress is usually quiet");
    await expect(page.locator(".article-media-caption")).toContainText("Unsplash");
    await expect(page.locator(".article-gallery")).toBeVisible();
    await expect(page.locator(".article-gallery-item")).toHaveCount(1);
    await expect(page.locator(".article-gallery-item img")).toHaveAttribute(
      "alt",
      "Athlete lifting weights during training"
    );
  });

  test("updates the active chapter when navigating", async ({ page }) => {
    await page.goto("/");
    const lastLink = page.locator(".chapter-link").last();

    await lastLink.click();
    await expect(page).toHaveURL(/#article-3$/);
    await expect(page.locator("#article-3")).toBeInViewport();
    await expect(lastLink).toHaveAttribute("aria-current", "location");
  });

  test("updates reading progress at the end of the page", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await expect(page.locator(".reading-progress-track")).toHaveAttribute("aria-valuenow", "100");
  });

  test("shows a graceful fallback when remote images fail", async ({ page }) => {
    await page.route("**/*unsplash*", (route) => route.abort());
    await page.goto("/");

    for (const image of await page.locator(".article-image").all()) {
      await image.scrollIntoViewIfNeeded();
    }

    await expect(page.locator(".article-image-fallback")).toHaveCount(2);
    await expect(page.locator(".article-image-fallback").first()).toContainText("Image unavailable");
  });

  test("honors reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    await expect(page.locator(".reveal").first()).toHaveCSS("opacity", "1");
    await expect(page.locator(".geometry-stage").first()).toHaveCSS("transform", "none");
  });

  test("keeps mobile chapter navigation usable", async ({ page }) => {
    await page.setViewportSize({ width: 393, height: 852 });
    await page.goto("/");

    const navigation = page.locator(".chapter-navigation");
    await expect(navigation).toBeVisible();
    await expect(navigation).toHaveCSS("position", "fixed");
    await expect(page.locator(".footer")).toBeVisible();
  });

  test("provides keyboard skip links and a useful missing-story state", async ({ page }) => {
    await page.goto("/articles/unknown-story");
    await expect(page).toHaveTitle(/Story not found/);
    await expect(page.locator(".article-not-found-content")).toContainText("That story is not here");

    await page.goto("/articles/think-for-yourself");
    const skipLink = page.locator(".skip-link");
    await skipLink.focus();
    await expect(skipLink).toBeFocused();
    await expect(skipLink).toHaveAttribute("href", "#article-story");
  });

  test("publishes the About page and article sharing actions", async ({ page }) => {
    await page.goto("/about");
    await expect(page).toHaveTitle(/About/);
    await expect(page.locator("#about-title")).toContainText("Stay soft enough to think");
    await expect(page.locator(".about-principle")).toHaveCount(3);

    const sitemap = await page.request.get("/sitemap.xml");
    expect(await sitemap.text()).toContain("/about");

    await page.goto("/articles/think-for-yourself");
    await expect(page.locator(".article-share")).toBeVisible();
    await expect(page.locator(".article-share-actions a")).toHaveCount(3);
    await expect(page.locator(".article-share-actions")).toContainText("Copy link");
  });
});
