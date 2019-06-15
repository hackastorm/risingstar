public class LineItemEditiorController {
	@AuraEnabled
    public static list<WrapProductSelection> FetchActiveProducts(id PricebookID) {
        list<WrapProductSelection> ProductWrapList = new list<WrapProductSelection>();
        for(PricebookEntry PEntry : [select id, Product2.Name, UnitPrice, Product2.ProductCode, Product2.Description, Product2.Family, Product2Id from PricebookEntry where Pricebook2Id =: PricebookID and isActive = true and Product2.isActive = true])
            ProductWrapList.add(new WrapProductSelection(PEntry.Product2.Name, PEntry.Product2.ProductCode, PEntry.UnitPrice, PEntry.Product2.Description, PEntry.Product2.Family, PEntry.Product2Id));
        return ProductWrapList;
    }
    @AuraEnabled
    public static list<WrapLineItemInfo> InitialiseProductLines(list<WrapProductSelection> ProductWrapperList){
        list<WrapLineItemInfo> LineItems = new list<WrapLineItemInfo>();
        for(WrapProductSelection Prod : ProductWrapperList)
            LineItems.add(new WrapLineItemInfo(Prod.productName, 1, Prod.price, 0, Prod.productId));
        return LineItems;
    }
    @AuraEnabled
    public static void StoreLineItems(id ParentID, list<WrapLineItemInfo> LineItemsList, string ParentAPIName, string ObjectAPIName, string ProductAPIName, string SalesPriceAPIName, string QuantityAPIName, string DiscountAPIName){
        list<sObject> LineItems = new list<sObject>();
        for(WrapLineItemInfo Line : LineItemsList){
            sObject sObj = Schema.getGlobalDescribe().get(ObjectAPIName).newSObject();
            sObj.put(ParentAPIName, ParentID);
            sObj.put(ProductAPIName, Line.productID);
            sObj.put(SalesPriceAPIName, Line.unitPrice);
            sObj.put(QuantityAPIName, Line.quantity);
            sObj.put(DiscountAPIName, Line.discount);
            LineItems.add(sObj);
        }
        insert LineItems;
    }
    public class WrapLineItemInfo{
        @AuraEnabled public string productName {get;set;}
        @AuraEnabled public decimal quantity {get;set;}
        @AuraEnabled public decimal unitPrice {get;set;}
        @AuraEnabled public decimal discount {get;set;}
        @AuraEnabled public id productID {get;set;}
        public WrapLineItemInfo(){
            
        }
        public WrapLineItemInfo(string productName, integer quantity, decimal unitPrice, decimal discount, id productID){
            this.productName = productName;
            this.quantity = quantity;
            this.unitPrice = unitPrice;
            this.discount = discount;
            this.productID = productID;
        }
    }
    public class WrapProductSelection{
        @AuraEnabled public string productName {get;set;}
        @AuraEnabled public string productCode {get;set;}
        @AuraEnabled public decimal price {get;set;}
        @AuraEnabled public string description {get;set;}
        @AuraEnabled public id productId {get;set;}
        @AuraEnabled public string family {get;set;}
        public WrapProductSelection(){
            
        }
        public WrapProductSelection(string productName, string productCode, decimal price, string description, string family, id productId){
            this.productName = productName;
            this.productCode = productCode;
            this.price = price;
            this.description = description;
            this.family = family;
            this.productId = productId;
        }
    }
}