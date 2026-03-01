export type Tea = {
    name: string;
    infusions: Infusion[];
    desc?: string;
    weight?: number;
    temp?: number;
    increment?: number;
    custom?: boolean;
};

export type Infusion = {
    id: number;
    duration: number;
};

export const teas: Tea[] = [
    {
        name: 'constants.greenTeaJapanese',
        desc: 'constants.greenTeaJapaneseDesc',
        weight: 5,
        temp: 70,
        infusions: [
            {
                id: 1,
                duration: 60,
            },
            {
                id: 2,
                duration: 25,
            },
            {
                id: 3,
                duration: 35,
            },
        ],
    },
    {
        name: 'constants.gyokuro',
        desc: 'constants.gyokuroDesc',
        weight: 5,
        temp: 60,
        infusions: [
            {
                id: 1,
                duration: 120,
            },
            {
                id: 2,
                duration: 25,
            },
            {
                id: 3,
                duration: 35,
            },
        ],
    },
    {
        name: 'constants.puErh',
        desc: 'constants.puErhDesc',
        weight: 5,
        temp: 99,
        infusions: [
            {
                id: 1,
                duration: 20,
            },
            {
                id: 2,
                duration: 25,
            },
            {
                id: 3,
                duration: 30,
            },
            {
                id: 4,
                duration: 35,
            },
            {
                id: 5,
                duration: 40,
            },
            {
                id: 6,
                duration: 45,
            },
            {
                id: 7,
                duration: 50,
            },
            {
                id: 8,
                duration: 55,
            },
            {
                id: 9,
                duration: 60,
            },
            {
                id: 10,
                duration: 70,
            },
            {
                id: 11,
                duration: 80,
            },
            {
                id: 12,
                duration: 90,
            },
        ],
    },
    {
        name: 'constants.greenTeaWestern',
        weight: 2,
        temp: 70,
        infusions: [
            {
                id: 1,
                duration: 120,
            },
        ],
    },
    {
        name: 'constants.blackTeaWestern',
        weight: 2,
        temp: 99,
        infusions: [
            {
                id: 1,
                duration: 90,
            },
        ],
    },
];
