import { LightningElement, wire } from 'lwc'; // Import LightningElement base class and wire service
import fetchDealerType from '@salesforce/apex/dealerSearchClass.getAllDealerTypes'; // Import Apex method to fetch dealer types
import { NavigationMixin } from 'lightning/navigation'; // Import NavigationMixin for navigation

export default class DealerSearch extends NavigationMixin(LightningElement) {
    appdesc = 'To locate the Dealer closest to you, go to state then go to city and reach to your nearest Dealer.'; // Description of the app
    dealerTypeProperty; // Holds the dealer types for the combobox
    values = ''; // Stores the selected dealer type value

    // Handles change event when a dealer type is selected
    handleChange(event) {
        const dealerTypeId = event.detail.value; // Get the selected value from the combobox
        // Dispatch a custom event with the selected dealer type ID
        const dealerTypeSelectedChangeEvent = new CustomEvent('selecteddealertype', { detail: dealerTypeId });
        this.dispatchEvent(dealerTypeSelectedChangeEvent);
    }

    // Wire to fetch dealer types from Apex
    @wire(fetchDealerType)
    processOutput({ data, error }) {
        if (data) {
            console.log('before Dealer Type : ' + JSON.stringify(data));
            // Initialize the dealer types array with a default option
            this.dealerTypeProperty = [{ label: 'Select dealer type', value: '' }];

            // Iterate over the fetched data to populate dealer types
            data.forEach(item => {
                const dealerTypeEach = {};
                dealerTypeEach.label = item.Name;
                dealerTypeEach.value = item.Id;
                this.dealerTypeProperty.push(dealerTypeEach);
            });

            console.log('after Dealer Type : ' + JSON.stringify(this.dealerTypeProperty));
        } else if (error) {
            console.log('error  : ' + error.body.message); // Log error if any
        }
    }

    // Navigates to the standard page to create a new dealer type
    openNewDealerTypeStdPage() {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Dealer_Type__c',
                actionName: 'new'
            },
        });
    }

    // Navigates to the standard page to create a new account
    openNewAccountTypeStdPage() {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Account',
                actionName: 'new'
            },
        });
    }

    // Navigates to the standard page to create a new contact
    openNewContactTypeStdPage() {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Contact',
                actionName: 'new'
            },
        });
    }
}
