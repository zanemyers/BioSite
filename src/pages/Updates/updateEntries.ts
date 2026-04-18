import type { UpdateCardProps } from '../../components/UpdateCard';
import * as imgs from './imgs/index'

// Category options: personal, professional, learning, travel
// Date (year, month, day)
// - month (Jan-0, Feb-1, etc.)

export const updates: UpdateCardProps[] = [
    {
        title: 'Flybox 2.0',
        content: (
            "A while back I built Flybox — a tool that scraped Google Maps and fly-fishing shop websites to aggregate data about shops, fishing reports, and their digital presence. But, overtime it grew complicated: a separate React frontend, an Express backend, three standalone tools (ShopReel, FishTales, and SiteScout) each living in their own /apps directory, Bootstrap with SCSS, and ESLint and Prettier configured separately. It worked, but it had accumulated a lot of structure for what was ultimately a focused task.\n\n" +
            "Flybox 2.0 collapses all of that into a single Next.js app. The Express server is gone — Next.js handles the API routes. The three-tool split is gone — it's one cohesive flow. Bootstrap and SCSS are replaced with Tailwind and DaisyUI. ESLint and Prettier are replaced with Biome. The core — SerpAPI for shop discovery, Google Gemini for summarizing reports, Prisma for persistence — stayed the same. Playwright is still there for pages that need a real browser, but most scraping now runs through Cheerio, which is significantly faster since it parses static HTML without spinning up a headless browser. It just all lives in one place now.\n\n" +
            "I also leaned on Claude throughout the rebuild, mostly as a thinking partner for architecture decisions and getting Vitest set up. It made the process feel more like pairing than grinding through it alone.\n\n" +
            "The result is a smaller codebase that does everything v1 did, with less to maintain and a lot less mental overhead."
        ),
        date: new Date(2026, 3, 17),
        category: ['professional', 'learning'],
        image: imgs.Flybox2
    },
    {
        title: 'New Home!',
        content: (
            "We moved into our new home about a week and a half ago and are finally starting to get settled. It’s been " +
            "so good to have our own space again and to no longer be living out of a suitcase. Of course, moving comes " +
            "with plenty of tasks, and some took longer than expected—like tracking down the nuts and bolts for our " +
            "bed (haha). We’re incredibly thankful for the friends and family who helped us move; their support made " +
            "everything go so much faster.\n\nThe weekend after we moved in, a snowstorm hit, adding an unexpected " +
            "twist to settling in. This past week brought more adventures—dealing with a dead car battery, building a " +
            "dresser, and buying a washer and dryer. There’s still plenty left to do, but we’re thrilled to finally be " +
            "in one place for more than a year. It feels amazing to have a home we can truly make our own, a place to " +
            "build routines, host friends and family, and create lasting memories without the constant stress of " +
            "packing and moving."
        ),
        date: new Date(2026, 1, 1),
        category: ['personal'],
        image: imgs.NewHome,
    },
    {
        title: 'New Job!',
        content: (
            `Last Monday, I started a new job as an Application Developer at Aprio—and it still feels a bit surreal.\n
            Over the summer, a close friend and I were talking when he mentioned that his company might be hiring a developer in the fall. A few months passed, and then they went through a merger. After that, everything went quiet. Shortly after we returned from Uganda, I interviewed with another company that told me I’d hear back in a few days. A week went by, and I heard nothing.\n 
            Then, out of nowhere, my friend texted me to say he had shared my résumé with Aprio—the company that had acquired his. Shortly after, I received an email asking to set up a talent and culture-fit interview. A day later, they wanted to schedule a technical interview. A few days after that, a second interview followed.\n
            In the middle of all this, the first company finally got back to me with an offer. It felt disappointing. It had taken nearly two weeks when they had said it would only be a few days, the offer was low, and the location wasn’t one we were excited about. After a lot of thought, I declined.\n
            The holiday season rolled around, and I didn’t hear anything from Aprio until early January. Then came the exciting news: they extended an offer. It was more flexible, higher paying, and in a location we genuinely liked—all while staying within the timeline they had promised. It was a no-brainer. I signed immediately and felt weeks of stress lift off my shoulders.\n
            The plans I had hoped for—but quietly wondered might never happen—had come together. Not because of anything I did, but because God hears our prayers and guides our steps. He had set things in motion long before I could see them and simply asked me to wait, to be patient, and to trust that He would provide.\n
            After receiving the first offer, I briefly considered accepting it for the sake of security and backing out later if something better came along. In the end, I’m grateful I trusted in the Lord’s provision instead. As tempting as that sense of security would have been, the complication—and the cost to my integrity—simply wasn’t worth it.`
        ),
        date: new Date(2026, 1, 1),
        category: ['professional'],
        image: imgs.Aprio,
    },
    {
        title: 'Job Search',
        content: (
            "I began exploring new opportunities in October, looking for the right role to pursue after our return from Uganda. " +
            "Over the past few months, I’ve had several interviews and remain hopeful for the right fit. That said, the online " +
            "application process has been challenging and, at times, disheartening. I’ve submitted close to 100 applications, " +
            "often receiving only automated confirmations. I’m grateful for the few responses I’ve received, even if they were " +
            "simply to indicate that the role had been filled or that other candidates were a better fit. And while I don’t " +
            "have a solution, it’s clear that there must be a more effective and human-centered way to connect talent " +
            "with opportunity."
        ),
        date: new Date(2026, 0, 3),
        category: ['learning', 'professional'],
        image: imgs.JobHunt,
    },
    {
        title: 'Uganda',
        content: (
            "My wife and I lived in Uganda for much of 2025. She was completing her clinical fellowship in " +
            "Speech Pathology with Hope Speaks, while I worked with Rescue River—an organization that supports " +
            "women who have survived trafficking or abuse by providing employment, teaching life skills, and offering " +
            "discipleship.\n\nA few weeks before we left, we had the opportunity to visit a conservation center, where " +
            "we were able to interact with some of the animals, including the lion cub I’m holding above. We’ve been " +
            "back in the U.S. for about a month and a half now, and we’ve found ourselves missing the tropical climate " +
            "just a little 😅."
        ),
        date: new Date(2026, 0, 3),
        category: ['personal', 'travel'],
        image: imgs.Uganda,
    },
];