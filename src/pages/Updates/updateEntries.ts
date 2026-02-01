import type { UpdateCardProps } from '../../components/UpdateCard';
import * as imgs from './imgs/index'

// Category options: personal, professional, learning, travel

export const updates: UpdateCardProps[] = [
    {
        title: 'New Home!',
        content: (""),
        date: new Date('2026-01-31'),
        category: ['personal'],
        image: imgs.NewHome,
    },
    {
        title: 'New Job!',
        content: (""),
        date: new Date('2026-01-31'),
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
        date: new Date('2026-01-3'),
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
        date: new Date('2026-01-3'),
        category: ['personal', 'travel'],
        image: imgs.Uganda,
    },
];