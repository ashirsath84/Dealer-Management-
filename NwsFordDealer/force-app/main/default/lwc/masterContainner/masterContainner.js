import { LightningElement } from 'lwc';

export default class MasterContainer extends LightningElement {
    selectedDealerTypeId = ''; // Initialize selected dealer type ID

    // Handler for selected dealer type event
    handleSelectedDealerTypeEvent(event) {
        this.selectedDealerTypeId = event.detail; // Update selected dealer type ID
    }
}
