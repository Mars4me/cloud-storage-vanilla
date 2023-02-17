const storageSlider = document.getElementById('myRangeStorage');
const transferSlider = document.getElementById('myRangeTransfer');
const storageSliderLabel = document.querySelector('.storage-label');
const transferSliderLabel = document.querySelector('.transfer-label');
const chartsWrapper = document.getElementById('charts');

console.log('test', data);

const xValues = data.map((e) => e.name);
const yValues = [55, 49, 44, 24, 15];
const yValues2 = [11, 25, 25, 25, 25];
const barColors = ['red', 'green', 'blue', 'orange', 'brown'];

// const drawChart = (values) => {
//     const wrapper = document.getElementById('myChart');
//     wrapper.innerHTML = '';
//     wrapper.appendChild(document.createElement('canvas'));
//     const ctx = wrapper.querySelector('canvas');

//     new Chart(ctx, {
//         type: 'bar',
//         data: {
//             labels: xValues,
//             datasets: [
//                 {
//                     label: '# of Votes',
//                     data: values,
//                     borderWidth: 3,
//                 },
//             ],
//         },
//         options: {
//             legend: { display: false },
//             title: {
//                 display: false,
//                 text: 'World Wine Production 2018',
//             },
//         },
//     });
// };

// drawChart(yValues2);

function onChangeSlider(e) {
    const targetName = e.target.id;

    if (targetName === 'myRangeStorage') {
        storageSliderLabel.textContent = e.target.value + ' GB';
    } else if (targetName === 'myRangeTransfer') {
        transferSliderLabel.textContent = e.target.value + ' GB';
    }
}
storageSlider.addEventListener('change', onChangeSlider);
transferSlider.addEventListener('change', onChangeSlider);
