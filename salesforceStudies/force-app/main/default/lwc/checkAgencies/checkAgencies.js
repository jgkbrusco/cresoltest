import { LightningElement, track, wire } from 'lwc';
import getCooperatives from '@salesforce/apex/Helper.getCooperatives';
import getAgencies from '@salesforce/apex/Helper.getAgencies';

export default class CheckAgencies extends LightningElement {
    @track selectedCooperativeId;
    @track cooperativeOptions = [];
    @track agencies;
    @track noAgencies = false;

    @wire(getCooperatives)
    wiredAgencys({ error, data }) {
        if (data) {
            this.cooperativeOptions = data.map(account => ({ label: account.Name, value: account.Id }));
        } else if (error) {

        }
    }

    handleCooperativeChange(event) {
        this.selectedCooperativeId = event.target.value;
        this.fetchContacts();
    }

    fetchContacts() {
        if (this.selectedCooperativeId) {
            getAgencies()
                .then(result => {
                    this.agencies = result.filter(agency => agency.AccountId === this.selectedCooperativeId && agency.Monthly_Cost__c >= 60);
                    this.noAgencies = result.filter(agency => agency.AccountId === this.selectedCooperativeId && agency.Monthly_Cost__c >= 60).length === 0;
                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            this.agencies = [];
            this.noAgencies = false;
        }
    }
}