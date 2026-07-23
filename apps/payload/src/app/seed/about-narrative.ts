/**
 * Shared two-paragraph narrative (§6) used by both pageAbout instances
 * (home's shortened close and /about's full version currently carry the
 * same copy — see the makeover handoff's "About page copy" follow-up).
 */
export const aboutNarrativeBody = {
    root: {
        type: 'root',
        children: [
            {
                type: 'paragraph',
                children: [
                    {
                        type: 'text',
                        text: 'Before I wrote a line of production code, I was running cable and programming light boards backstage in theater — ',
                        format: 0,
                        version: 1,
                    },
                    {
                        type: 'text',
                        text: "learning that a live system either works exactly when it needs to, or it doesn't work at all.",
                        format: 1,
                        version: 1,
                    },
                    {
                        type: 'text',
                        text: " That mindset followed me into electronics: CNC machining, PCB design, VHDL. There's no partial credit when a circuit is wrong.",
                        format: 0,
                        version: 1,
                    },
                ],
                direction: 'ltr' as const,
                format: '' as const,
                indent: 0,
                version: 1,
            },
            {
                type: 'paragraph',
                children: [
                    {
                        type: 'text',
                        text: 'Software turned out to be the same discipline with a faster feedback loop. I bring the same instinct for systems — ',
                        format: 0,
                        version: 1,
                    },
                    {
                        type: 'text',
                        text: 'how the parts fit together, what breaks under load, where the real constraint is',
                        format: 1,
                        version: 1,
                    },
                    {
                        type: 'text',
                        text: " — to every web app and client project I take on. It's why I default to simple, well-structured solutions over clever ones.",
                        format: 0,
                        version: 1,
                    },
                ],
                direction: 'ltr' as const,
                format: '' as const,
                indent: 0,
                version: 1,
            },
        ],
        direction: 'ltr' as const,
        format: '' as const,
        indent: 0,
        version: 1,
    },
}
