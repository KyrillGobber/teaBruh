export type Tea = {
    name: string;
    infusions: Infusion[];
    desc?: string;
    weight?: number;
    temp?: number;
}

export type Infusion = {
    id: number;
    duration: number;
}

export const teas: Tea[] = [
    {
        name: 'Test Tea',
        desc: 'This is a test tea',
        weight: 5,
        temp: 95,
        infusions: [
            {
                id: 1,
                duration: 3
            },
            {
                id: 2,
                duration: 5
            },
            {
                id: 3,
                duration: 10
            }

        ]
    },
    {
        name: 'Green Tea, japanese style',
        desc: 'Sencha, Gyokuro, etc. Max 70°C, first infusion longer to open the leaves, depending on the tea, there can also be a longer fourth or even fifth infusion.',
        weight: 5,
        temp: 70,
        infusions: [
            {
                id: 1,
                duration: 60
            },
            {
                id: 2,
                duration: 25
            },
            {
                id: 3,
                duration: 35
            }

        ]
    },
    {
        name: 'Pu-erh <3',
        desc: 'First infusion is a rinse / wash, not to be drunk. The first real infusion is the second one. The wash may be shorter or longer than 10 seconds, depending on the tea.',
        infusions: [
            {
                id: 1,
                duration: 10
            },
            {
                id: 2,
                duration: 20
            },
            {
                id: 3,
                duration: 25
            },
            {
                id: 4,
                duration: 30

            },
            {
                id: 5,
                duration: 40
            },
            {
                id: 6,
                duration: 45
            },
            {
                id: 7,
                duration: 50
            },
            {
                id: 8,
                duration: 55
            },
            {
                id: 9,
                duration: 60
            },
            {
                id: 10,
                duration: 70
            },
            {
                id: 11,
                duration: 80
            },
            {
                id: 12,
                duration: 90
            },
        ]
    },
    {
        name: 'Green Tea, western style',
        weight: 2,
        temp: 70,
        infusions: [
            {
                id: 1,
                duration: 120
            },
        ]
    },
    {
        name: 'Black Tea, western style',
        weight: 2,
        temp: 99,
        infusions: [
            {
                id: 1,
                duration: 90
            },
        ]
    },
]
