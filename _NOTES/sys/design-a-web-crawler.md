---
tags: sys 
---

Follow prices of online products on multiple websites 

```py 

class Website:
    name: str  
    url: URL
    html: HTML

class Currency(Enum):
    ...

class Price: 
    amount: Decimal 
    currency: Currency 

class UUID: 
    ...

class Photo(File): 
    uid: UUID  

class Company:
    name: str 

class Brand: 
    name: str
    company: Company 

class Product:
    uid: UUID
    name: str
    brand: Brand 
    description: str 
    
class ProductPrice: 
    product_id: str
    price_id: str 
    timestamp: Timestamp 

class ProductPhoto:
    product_id: str
    photo_id: str 
    timestamp: Timestamp    
```
