import { LightningElement, track, wire } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import getCooperatives from '@salesforce/apex/Helper.getCooperatives';

export default class CreateNewAgency extends LightningElement {
    @track agencytName = '';
    @track selectedCooperativeId = '';
    @track cooperativeOptions = [];
    @track monthlyCost = '';
    @track agencyId = '';
    @track errorMessage = '';

    @wire(getCooperatives)
    wiredAgencys({ error, data }) {
        if (data) {
            this.cooperativeOptions = data.map(account => ({ label: account.Name, value: account.Id }));
        } else if (error) {

        }
    }

    handleNameChange(event) {
        var nameInput = this.template.querySelector('.nameInput');
        var value = nameInput.value;
        if(value <= 0){
            nameInput.setCustomValidity('The name is required');
        }else{
            nameInput.setCustomValidity('');            
        }
        nameInput.reportValidity();
        this.agencytName = event.target.value;        
    }

    handleCooperativeChange(event) {
        this.selectedCooperativeId = event.target.value;
    }

    handlemonthlyCostChange(event) {
        var monthlyCostInput = this.template.querySelector('.monthlyCostInput');
        var value = monthlyCostInput.value;
        if(value <= 0){
            monthlyCostInput.setCustomValidity('The value must be greater than zero');
        }else{
            monthlyCostInput.setCustomValidity('');            
        }
        monthlyCostInput.reportValidity();
        this.monthlyCost = event.target.value;
    }

    createAgency() {       

        const fields = {
            'LastName': this.agencytName,
            'AccountId': this.selectedCooperativeId,
            'Monthly_Cost__c': this.monthlyCost
        };
        const agency = {apiName: 'Contact', fields};

        createRecord(agency)
        .then((agency) => {
            this.agencyId = agency.id;
            this.dispatchEvent(
                new ShowToastEvent({
                    title: "Success",
                    message: "Agency created with id: " + this.agencyId,
                    variant: "success",
                }),
            );
        })
        .catch((error) => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: "Error creating record",
                    message: error.body.message,
                    variant: "error",
                }),
            );
        });
    }


}