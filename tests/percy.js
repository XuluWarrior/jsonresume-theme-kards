const PercyScript = require('@percy/script');

async function clickMenuLink(page, percySnapshot, linkName) {
    await page.click('[data-test=menu-toggle]');
    await page.waitFor(1000);

    await page.click(`[data-test=${linkName}-link]`);
    await page.waitFor(1000);

    // percy actualy takes fullscreen snapshots.  So after click, snapshot will be identical to homepage one
    // TODO: find different way to test scroll behaviour
    // await percySnapshot(linkName);
}

PercyScript.run(async (page, percySnapshot) => {
    await page.goto('http://localhost:5001/index.html');
    await page.waitFor(".pace-inactive");
    await percySnapshot('homepage');

    // Open menu
    await page.click('[data-test=menu-toggle]');
    await page.waitFor(1000);
    await percySnapshot('menu');

    // Close menu
    await page.click('[data-test=menu-toggle]');
    await page.waitFor(1000);

    await clickMenuLink(page, percySnapshot, 'about');
});
