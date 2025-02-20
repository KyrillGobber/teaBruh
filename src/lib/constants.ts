export type Tea = {
    name: string;
    infusions: Infusion[];
    desc?: string;
    weight?: number;
    temp?: number;
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
        name: 'constants.puErh',
        desc: 'constants.puErhDesc',
        weight: 5,
        temp: 99,
        infusions: [
            {
                id: 1,
                duration: 2,
            },
            {
                id: 2,
                duration: 10,
            },
            {
                id: 3,
                duration: 15,
            },
            {
                id: 4,
                duration: 20,
            },
            {
                id: 5,
                duration: 25,
            },
            {
                id: 6,
                duration: 30,
            },
            {
                id: 7,
                duration: 35,
            },
            {
                id: 8,
                duration: 40,
            },
            {
                id: 9,
                duration: 45,
            },
            {
                id: 10,
                duration: 50,
            },
            {
                id: 11,
                duration: 55,
            },
            {
                id: 12,
                duration: 60,
            },
            {
                id: 13,
                duration: 70,
            },
            {
                id: 14,
                duration: 80,
            },
            {
                id: 15,
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
