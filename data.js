const data = [
    {
        name: 'backblaze.com',
        type: null,
        minPrice: 7,
        maxPrice: null,
        prices: [
            {
                storage: 0.005,
                transfer: 0.01,
                freeSpace: 0,
            },
        ],
    },
    {
        name: 'bunny.net',
        minPrice: null,
        maxPrice: 10,
        type: ['HDD', 'SSD'],
        prices: [
            {
                storage: 0.01,
                transfer: 0.01,
                freeSpace: 0,
            },
            {
                storage: 0.02,
                transfer: 0.01,
                freeSpace: 0,
            },
        ],
    },
    {
        name: 'scaleway.com',
        minPrice: null,
        maxPrice: null,
        type: ['Multi', 'Single'],
        prices: [
            {
                storage: 0.06,
                transfer: 0.02,
                freeSpace: 75,
            },
            {
                storage: 0.03,
                transfer: 0.02,
                freeSpace: 75,
            },
        ],
    },
    {
        name: 'vultr.com',
        minPrice: 5,
        maxPrice: null,
        type: null,
        prices: [
            {
                storage: 0.01,
                transfer: 0.01,
                freeSpace: 0,
            },
        ],
    },
];
