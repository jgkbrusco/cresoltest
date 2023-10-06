public without sharing class Helper {

    @AuraEnabled(cacheable=true)
    public static List<Account> getCooperatives() {
        return [SELECT Id, Name FROM Account];
    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> getAgencies(){
        return [SELECT Name, Monthly_Cost__c, AccountId FROM Contact WHERE Monthly_Cost__c > 60];
    }    

}