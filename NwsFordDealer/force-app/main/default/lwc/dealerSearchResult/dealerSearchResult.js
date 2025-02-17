import { LightningElement, api, wire } from 'lwc'; // Importing necessary modules
import fetchDealerType from '@salesforce/apex/DealerSearchResultController.getDealers'; // Importing Apex method

export default class DealerSearchResult extends LightningElement {
    // Public property to receive dealer type ID from parent component
    @api channelDealerTypeId;

    // Property to hold dealer data fetched from the database
    dealerDataFromDB;

    // Property to hold the selected dealer's account ID
    selectDealerCardAccountId;

    // Fetch dealer data based on dealer type ID using the Apex method
    @wire(fetchDealerType, { dealerTypeId: '$channelDealerTypeId' })
    processOutput({ data, error }) {
        if (data) {
            // Log and assign the fetched dealer data to the local property
            console.log('Data from DB :: ' + JSON.stringify(data));
            this.dealerDataFromDB = data;
        } else if (error) {
            // Log an error message if data fetching fails
            console.log('Error');
        }
    }

    // Getter to check if dealer data is available
    get IsDealerfound() {
        // Return true if dealer data is not null and has at least one entry
        if (this.dealerDataFromDB != null && this.dealerDataFromDB.length > 0) {
            return true;
        }
        return false;
        
    }

    // Handler for selecting a dealer card
    selectDealerHandler(event) {
        // Retrieve the selected dealer's account ID from the event detail
        const dealerId = event.detail;
        this.selectDealerCardAccountId = dealerId;
    }
}
