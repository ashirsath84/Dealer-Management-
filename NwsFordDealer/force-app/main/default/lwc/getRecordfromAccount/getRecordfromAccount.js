import { LightningElement, api, wire } from "lwc";
import { getRecord } from "lightning/uiRecordApi";

const FIELDS = [
    'Account.Name',    
    'Account.New_D_Geolocation__Latitude__s',
    'Account.New_D_Geolocation__Longitude__s',
];

export default class GetRecordfromAccount extends LightningElement {
    @api recordId; // Expose recordId as a public property
    latitude;
    longitude;
    Namei;

    connectedCallback() {
        // Logic to execute when component is connected to the DOM
    }
    
    @wire(getRecord, { recordId: "$recordId", fields: FIELDS }) // Wire service to fetch account record data
    processOutput({ data, error }) {
        if (data) {
            // Read values from data and assign to local properties
            this.latitude = data.fields.New_D_Geolocation__Latitude__s.value;
            this.longitude = data.fields.New_D_Geolocation__Longitude__s.value;
            this.Namei = data.fields.Name.value;
            // Log fetched data
            console.log('Name: ' + this.Namei); 
            console.log('Latitude: ' + this.latitude);
            console.log('Longitude: ' + this.longitude);
        } else if (error) {
            // Log any errors
            console.log('Error');
        }
    }

    getLocation() {
        // Logic to get location goes here
    }
}
