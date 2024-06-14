public with sharing class dealerSearchClass {

    @AuraEnabled(cacheable=true)
    
    public static list<Dealer_Type__c> getAllDealerTypes(){
        try {

            return [select Id, Name from Dealer_Type__c];
            
        } catch (Exception e) {

            throw new AuraHandledException(e.getMessage());
            
        }
    }
}