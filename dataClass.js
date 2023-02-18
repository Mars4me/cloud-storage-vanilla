import { data } from './data.js';

class Data {
    constructor(data) {
        this.data = data;
        this.compute(100, 100);
    }

    compute(storage, transfer) {
        const calculate = (cloudService, type = 0) => {
            const selection = cloudService.prices[type];

            const getStoragePrice =
                storage > selection.freeSpace ? (storage - selection.freeSpace) * selection.storage : 0;
            const getTransferPrice =
                transfer > selection.freeSpace ? (transfer - selection.freeSpace) * selection.transfer : 0;
            const fullPrice = getStoragePrice + getTransferPrice;

            if (cloudService.minPrice && cloudService.minPrice > fullPrice) return cloudService.minPrice;
            if (cloudService.maxPrice && fullPrice > cloudService.maxPrice) return cloudService.maxPrice;

            return fullPrice;
        };

        const calculations = this.data.reduce((prev, curr) => {
            if (curr.type) {
                return {
                    ...prev,
                    [curr.name]: {
                        price: curr.type.value.map((_, index) => calculate(curr, index)),
                        active: curr.type.active,
                    },
                };
            }
            return { ...prev, [curr.name]: { price: [calculate(curr)], active: 0 } };
        }, {});

        this.updateActiveStore(calculations);
        return calculations;
    }

    getActiveStore() {
        return this.activeStore;
    }

    updateActiveStore(data) {
        this.activeStore = data;
    }

    updateActiveType(key, id) {
        const indexObj = this.data.findIndex((e) => e.name === key);
        this.data[indexObj].type.active = +id;
        this.activeStore[key].active = +id;
    }
}

export const store = new Data(data);
