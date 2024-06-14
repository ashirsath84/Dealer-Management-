public with sharing class DealerSearchResultController {
    @AuraEnabled(cacheable=true)
    public static list<account> getDealers(String dealerTypeId ){

        if(String.isEmpty(dealerTypeId)){
            return [SELECT Id, Name, Dealer_Type__c, Dealer_Type__r.Name, Dealer_Budget__c, Dealer_Total_Sales_Revenue__c, Dealer_Active_Pipeline_Value__c,
            Dealer_Primary_PUC__c, Dealer_Primary_PUC__r.Name,Dealer_Primary_PUC__r.title, Dealer_Primary_PUC__r.Salutation, Dealer_Contarct_Start_Date__c, Dealer_Contarct_End_Date__c, Dealer_Training_Completed__c, 
            Dealer_Status__c, Number_of_trend_Partner_contact__c, Dealer_WebSite__c, New_D_Geolocation__Latitude__s, 
            New_D_Geolocation__Longitude__s, New_D_Geolocation__c,(Select FirstName,LastName,title,Salutation from Contacts) FROM Account WHERE Dealer_Status__c IN ('Active','Inactive','Pending')];
        } else{
            return [SELECT Id, Name, Dealer_Type__c, Dealer_Type__r.Name, Dealer_Budget__c, Dealer_Total_Sales_Revenue__c, Dealer_Active_Pipeline_Value__c,
            Dealer_Primary_PUC__c, Dealer_Primary_PUC__r.Name,Dealer_Primary_PUC__r.title, Dealer_Primary_PUC__r.Salutation, Dealer_Contarct_Start_Date__c, Dealer_Contarct_End_Date__c, Dealer_Training_Completed__c, 
            Dealer_Status__c, Number_of_trend_Partner_contact__c, Dealer_WebSite__c, New_D_Geolocation__Latitude__s, 
            New_D_Geolocation__Longitude__s, New_D_Geolocation__c,(Select FirstName,LastName,title,Salutation from Contacts) FROM Account WHERE Dealer_Status__c IN ('Active','Inactive','Pending') AND Dealer_Type__c =: dealerTypeId];
        }
        
    }
}