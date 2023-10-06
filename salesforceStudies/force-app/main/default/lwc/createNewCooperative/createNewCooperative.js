import { LightningElement, track } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from "lightning/platformShowToastEvent";


export default class CreateNewCooperative extends LightningElement {
    @track cooperativeName = '';
    @track cooperativeStreet = '';
    @track cooperativeCity = '';
    @track cooperativeCountry = '';
    @track cooperativState = '';
    @track cooperativePostalCode = '';
    @track cooperativePhone = '';
    @track cooperativeId = '';
    @track options = [
        {label: 'Yes', value: true},
    ];
    @track selectedCheckbox = '';
    @track isSameBillingShipping = false;

    handleNameChange(event){
        this.cooperativeName = event.target.value;
    }

    handleAddressChange(event){
        const address = event.detail;
        this.cooperativeStreet = address.street;
        this.cooperativeCity = address.city;
        this.cooperativeCountry = address.country;
        this.cooperativeState = address.province;
        this.cooperativePostalCode = address.postalCode;
    }

    handleSameBillingShippingChange(event){
        const value = event.detail.value;
        if(value > 0){
            this.selectedCheckbox = value[0];
        }
        console.log(this.isSameBillingShipping);
        console.log(this.value);
    }

    handlePhoneChange(event){
        this.cooperativePhone = event.target.value;
    }

    createCooperative() {
        const fields = {
            'Name': this.cooperativeName,
            'BillingStreet': this.cooperativeStreet,
            'BillingCity': this.cooperativeCity,
            'BillingCountry': this.cooperativeCountry,
            'BillingState': this.cooperativeState,
            'BillingPostalCode': this.cooperativePostalCode,
            'Phone': this.cooperativePhone
        };
        const cooperative = {apiName: 'Account', fields};
        
        createRecord(cooperative)
        .then((cooperative) => {
            this.cooperativeId = cooperative.id;
            this.dispatchEvent(
                new ShowToastEvent({
                    title: "Success",
                    message: "Cooperative created with id: " + this.cooperativeId,
                    variant: "success",
                }),
            );
        })
        .catch((error) => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: "Error creating record",
                    message: "Error creating record " + JSON.stringify(error),
                    variant: "error",
                }),
            );
        });
    }
}