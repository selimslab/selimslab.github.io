---
tags: sys 
---

Follow prices of online products on multiple websites 

```py 

class Website:
    name: str  
    url: str
    html: str

class Currency(Enum):
    ...

class Price: 
    amount: Decimal 
    currency: Currency 

class UID: 
    def generate():
        ... 

class Photo(File): 
    uid: UID  

class Company:
    name: str 

class Brand: 
    name: str
    company: Company 

class Product:
    uid: UID
    name: str
    brand: Brand 

class ProductPrice: 
    product_id: str
    price_id: str 
    timestamp: Timestamp 

class ProductPhoto:
    product_id: str
    photo_id: str 
    timestamp: Timestamp    
```
