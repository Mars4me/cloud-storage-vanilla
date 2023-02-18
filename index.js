import { graph } from './graphClass.js';
import { store } from './dataClass.js';

const storageSlider = document.getElementById('myRangeStorage');
const transferSlider = document.getElementById('myRangeTransfer');
const storageSliderLabel = document.querySelector('.storage-label');
const transferSliderLabel = document.querySelector('.transfer-label');
const elLabelWrapper = document.querySelector('.labels');

initGraph();

function initGraph() {
    store.data.forEach((element) => {
        const elLabelInnerWrapper = document.createElement('div');
        const elCloudNameLabel = document.createElement('p');
        elCloudNameLabel.className = 'text-center';
        const elRadioWrapper = document.createElement('div');

        if (element.type?.value?.length > 0) {
            element.type.value.forEach((name, index) => {
                const elTypeRadio = document.createElement('input');
                const elTypeLabel = document.createElement('label');

                elTypeRadio.type = 'radio';
                elTypeRadio.value = name;
                elTypeRadio.name = element.name;
                elTypeRadio.dataset.itemId = index;
                elTypeRadio.id = element.name + index;

                if (index === 0) elTypeRadio.setAttribute('checked', 'checked');

                elTypeLabel.setAttribute('for', element.name + index);
                elTypeLabel.textContent = name;

                elTypeRadio.className =
                    'w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500';
                elTypeLabel.className = 'text-xs mx-1';
                elRadioWrapper.appendChild(elTypeRadio);
                elRadioWrapper.appendChild(elTypeLabel);
            });
            elRadioWrapper.className = 'flex items-center';
        }

        elCloudNameLabel.textContent = element.name;
        elLabelInnerWrapper.appendChild(elCloudNameLabel);
        elLabelInnerWrapper.appendChild(elRadioWrapper);
        elLabelWrapper.appendChild(elLabelInnerWrapper);
    });

    graph.draw(store.getActiveStore());
}

// handleEvents

function onChangeSlider(e) {
    const targetName = e.target.id;

    if (targetName === 'myRangeStorage') {
        storageSliderLabel.textContent = e.target.value + ' GB';
    } else if (targetName === 'myRangeTransfer') {
        transferSliderLabel.textContent = e.target.value + ' GB';
    }

    store.compute(storageSlider.valueAsNumber, transferSlider.valueAsNumber);
    graph.draw(store.getActiveStore());
}

function onChangeRadio(e) {
    if (e.target.localName === 'input') {
        const { name } = e.target;
        const { itemId } = e.target.dataset;

        store.updateActiveType(name, itemId);
        graph.draw(store.getActiveStore());
    }
}

// setup listeners
elLabelWrapper.addEventListener('click', onChangeRadio);
storageSlider.addEventListener('input', _.throttle(onChangeSlider, 80));
transferSlider.addEventListener('input', _.throttle(onChangeSlider, 80));
