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
        name: 'test',
        desc: 'constants.greenTeaJapaneseDesc',
        weight: 5,
        temp: 70,
        infusions: [
            {
                id: 1,
                duration: 1
            },
            {
                id: 2,
                duration: 2
            },
            {
                id: 3,
                duration: 3
            }

        ]
    },
    {
        name: 'constants.greenTeaJapanese',
        desc: 'constants.greenTeaJapaneseDesc',
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
        name: 'constants.puErh',
        desc: 'constants.puErhDesc',
        weight: 5,
        temp: 99,
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
                id: 4,
                duration: 35

            },
            {
                id: 5,
                duration: 40
            },
            {
                id: 7,
                duration: 45
            },
            {
                id: 8,
                duration: 50
            },
            {
                id: 9,
                duration: 55
            },
            {
                id: 10,
                duration: 60
            },
            {
                id: 11,
                duration: 70
            },
            {
                id: 12,
                duration: 80
            },
            {
                id: 13,
                duration: 90
            },
        ]
    },
    {
        name: 'constants.greenTeaWestern',
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
        name: 'constants.blackTeaWestern',
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
