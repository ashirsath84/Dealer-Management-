import { LightningElement} from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import razorPayCheckout from '@salesforce/resourceUrl/checkout';
 
export default class RazorPayIntegration extends LightningElement {
    amount = '';
    currency = '';
    description = '';
    email = '';
    contact = '';
 
    amountMethod(event) {
        this.amount = event.target.value;
        console.log(this.amount);
    }
    currencyMethod(event) {
        this.currency = event.target.value;
        console.log(this.currency);
    }
    descpMethod(event) {
        this.description = event.target.value;
        console.log(this.description);
    }
    emailtMethod(event) {
        this.email = event.target.value;
        console.log(this.email);
    }
    contactMethod(event) {
        this.contact = event.target.value;
        console.log(this.contact);
    }
   
 
    handlePayment() {
        const externallink = 'https://checkout.razorpay.com/v1/checkout.js';
 
        const options = {

            // from line 7580 checkout.js
            "key": "rzp_test_aRTcvUbBWq0Sg9", // Enter the Key ID generated from the Dashboard
            "amount": this.amount*100, // Amount should be in smallest currency unit (e.g., cents for USD)
            "currency": this.currency,
            "description": this.description,
            "image": "https://s3.amazonaws.com/rzp-mobile/images/rzp.jpg",
            "prefill": {
                "email": this.email,
                "contact": this.contact,
            },
            "config": {
                "display": {
                    "blocks": {
                        "utib": {
                            "name": "Pay using Axis Bank",
                            "instruments": [
                                {
                                    "method": "card",
                                    "issuers": ["UTIB"]
                                },
                                {
                                    "method": "netbanking",
                                    "banks": ["UTIB"]
                                }
                            ]
                        },
                        "other": {
                            "name": "Other Payment modes",
                            "instruments": [
                                {
                                    "method": "card",
                                    "issuers": ["ICIC"]
                                },
                                {
                                    "method": "netbanking"
                                }
                            ]
                        }
                    },
                    "hide": [
                        {
                            "method": "upi"
                        }
                    ],
                    "sequence": ["block.utib", "block.other"],
                    "preferences": {
                        "show_default_blocks": false
                    }
                }
            },
            "handler": function (response) {
                alert(response.razorpay_payment_id);
            },
            "modal": {
                "ondismiss": function () {
                    if (confirm("Are you sure, you want to close the form?")) {
                        console.log("Checkout form closed by the user");
                    } else {
                        console.log("Complete the Payment");
                    }
                }
            }
        };
 
        // Create a new instance of Razorpay
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    }
 
    connectedCallback() {
        // Load the RazorPay checkout.js script
        loadScript(this, razorPayCheckout)
            .then(() => {
                // RazorPay script loaded
            })
            .catch(error => {
                console.error('Error loading RazorPay script: ', error);
            });
    }
}



