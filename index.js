const storageSlider = document.getElementById('myRangeStorage');
const transferSlider = document.getElementById('myRangeTransfer');
const storageSliderLabel = document.querySelector('.storage-label');
const transferSliderLabel = document.querySelector('.transfer-label');
const wrapper = document.querySelector('.labels');
const BAR_COLORS = ['red', 'orange', 'purple', 'blue'];

function initGraph() {
    data.forEach((element) => {
        const elCloudNameLabel = document.createElement('p');
        elCloudNameLabel.textContent = element.name;
        wrapper.appendChild(elCloudNameLabel);
    });

    const getCanculatedData = calculatePrices(data, 100, 100);
    drawChart(getCanculatedData);
}

function drawChart(values) {
    const graph = document.getElementById('bars');
    graph.innerHTML = '';
    graph.appendChild(document.createElement('canvas'));
    const ctx = graph.querySelector('canvas');

    const cloudNames = Object.keys(values);
    const cloudValues = _.map(values, (e) => e.price[0]);

    const bestPrice = cloudValues.indexOf(Math.min(...cloudValues));
    const paintBars = BAR_COLORS.map((color, index) => (index === bestPrice ? color : 'grey'));

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: cloudNames,
            datasets: [
                {
                    backgroundColor: paintBars,
                    data: cloudValues,
                    borderWidth: 3,
                },
            ],
        },
        options: {
            scales: {
                x: {
                    ticks: {
                        callback: function (value) {
                            return '$' + value;
                        },
                    },
                },
                y: {
                    display: false,
                },
            },

            plugins: {
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            const row = context.parsed.y;
                            let label = context.dataset.data[row];

                            return new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: 'USD',
                            }).format(label);
                        },
                    },
                },

                datalabels: {
                    display: false,
                },
                legend: {
                    display: false,
                    font: 25,
                },
                title: {
                    display: false,
                },
                tooltips: {
                    enabled: false,
                },
            },
            animation: {
                duration: 0,
            },
            indexAxis: 'y',
        },
    });
}

function calculatePrices(listOfServices, storage, transfer) {
    const calculate = (cloudService, type = 0) => {
        const selection = cloudService.prices[type];

        const getStoragePrice = (storage - selection.freeSpace || 0) * selection.storage;
        const getTransferPrice = (transfer - selection.freeSpace || 0) * selection.transfer;
        const fullPrice = getStoragePrice + getTransferPrice;

        if (cloudService.minPrice && cloudService.minPrice > fullPrice) return cloudService.minPrice;
        if (cloudService.maxPrice && fullPrice > cloudService.maxPrice) return cloudService.maxPrice;

        return fullPrice;
    };

    const calculations = listOfServices.reduce((prev, curr) => {
        if (curr.type) {
            return { ...prev, [curr.name]: { price: curr.type.map((_, index) => calculate(curr, index)) } };
        }
        return { ...prev, [curr.name]: { price: [calculate(curr)] } };
    }, {});

    return calculations;
}

function onChangeSlider(e) {
    const targetName = e.target.id;

    if (targetName === 'myRangeStorage') {
        storageSliderLabel.textContent = e.target.value + ' GB';
    } else if (targetName === 'myRangeTransfer') {
        transferSliderLabel.textContent = e.target.value + ' GB';
    }

    const updateValues = calculatePrices(data, storageSlider.valueAsNumber, transferSlider.valueAsNumber);
    drawChart(updateValues);
}

initGraph();

storageSlider.addEventListener('input', _.throttle(onChangeSlider, 80));
transferSlider.addEventListener('input', _.throttle(onChangeSlider, 80));
