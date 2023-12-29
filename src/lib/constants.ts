export type Tea = {
    name: string;
    infusions: Infusion[];
}

export type Infusion = {
    id: number;
    duration: number;
}

export const teas: Tea[] = [
    {
        name: 'Test Tea',
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
        name: 'Green Tea',
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
        name: 'Pu-erh',
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
]
