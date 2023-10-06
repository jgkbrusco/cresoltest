public class ViewMonthlyCostAgenciesController {
    public String selectedCooperativeId { get; set; }
    public List<Contact> filteredAgencies { get; set; }

    public List<SelectOption> getAccountOptions() {
        List<SelectOption> options = new List<SelectOption>();
        options.add(new SelectOption('', 'Select a cooperative'));

        for (Account acc : [SELECT Id, Name FROM Account]) {
            options.add(new SelectOption(acc.Id, acc.Name));
        }

        return options;
    }

    public void filteredAgencies() {
        if (selectedCooperativeId != null) {
            filteredAgencies = [SELECT Id, Name, Monthly_Cost__c FROM Contact WHERE AccountId = :selectedCooperativeId AND Monthly_Cost__c >= 60];
        } else {
            filteredAgencies = new List<Contact>();
        }
    }
}