public with sharing class getAccFromNws {
    
        @AuraEnabled(cacheable=true)
    public static list<Account> retriveAccount(){
        list<Account> acclist = [select id, name, industry,phone from account limit 20];

        return acclist;

    }
}