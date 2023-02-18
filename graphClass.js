class Graph {
    constructor(path) {
        this.path = path || document.getElementById('bars');
        this.BAR_COLORS = ['red', 'orange', 'purple', 'blue'];
    }

    draw(values) {
        console.log(values, 'asf');
        const isLaptop = window.innerWidth < 760;
        this.path.innerHTML = '';
        this.path.appendChild(document.createElement('canvas'));
        const ctx = this.path.querySelector('canvas');

        const cloudNames = Object.keys(values);
        const cloudValues = _.map(values, (e) => e.price[e.active]);

        const bestPrice = cloudValues.indexOf(Math.min(...cloudValues));
        const paintBars = this.BAR_COLORS.map((color, index) => (index === bestPrice ? color : 'grey'));

        const graphOptions = {
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
                                const column = context.parsed.x;
                                let label;
                                if (isLaptop) {
                                    label = context.dataset.data[column];
                                } else {
                                    label = context.dataset.data[row];
                                }

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
                indexAxis: isLaptop ? 'x' : 'y',
            },
        };
        new Chart(ctx, graphOptions);
    }
}

export const graph = new Graph();
