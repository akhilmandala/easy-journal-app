import dayjs from "dayjs"

export interface JournalEntry {
    id: string,
    title: string,
    content: string,
    emotion: string,
    date: number,
    order: number
}

// store emotions as emoji unicode
export const JOURNAL_ENTRY_FIXTURE_1 = {
    "6d969f39-2a30-4045-8e92-e02748774a54": {
        id: "6d969f39-2a30-4045-8e92-e02748774a54",
        title: "Day 3",
        content: "Feeling thankful!",
        emotion: "1F970",
        date: 1657213192,
        order: 3
    },
    "88570707-5e20-4a0c-91cf-c0fd7753583b": {
        id: "88570707-5e20-4a0c-91cf-c0fd7753583b",
        title: "Day 2",
        content: " Continuing to write more and more. But this is a demo, and I need to fill up the space, so Nunc pulvinar tempor lacus eget porttitor. Aliquam mi mauris, aliquam eget erat vitae, feugiat convallis purus. Nullam sed est at odio dapibus laoreet in sit amet tortor. Aenean enim lacus, laoreet consequat gravida a, scelerisque in magna. Pellentesque luctus purus quis sem cursus egestas. Nulla non placerat risus. In hac habitasse platea dictumst. Nullam euismod nisl a hendrerit placerat. Sed justo erat, fringilla in turpis sit amet, sagittis consectetur ex. Nullam mattis urna eget sapien rutrum volutpat. Etiam a tincidunt lorem, in tempus enim. Duis malesuada dolor purus, rutrum sagittis sem euismod sit amet. Nam nisl erat, faucibus quis sem nec, tincidunt malesuada massa. Mauris imperdiet, neque id mattis tincidunt, sapien nisi tristique quam, rhoncus posuere nibh sapien nec lacus. Phasellus scelerisque velit non lorem efficitur suscipit. ",
        emotion: "1F929",
        date: 1657227592,
        order: 2
    },
    "ef29985a-0d4f-491a-a1ce-397916b96305": {
        id: "ef29985a-0d4f-491a-a1ce-397916b96305",
        title: "New start!",
        content: "Ready to start writing! I'm gonna try to do this often, consistency is key to making it work",
        emotion: "1F929",
        date: 1657231192,
        order: 1
    }
}

export default {
    JOURNAL_ENTRY_FIXTURE_1
}