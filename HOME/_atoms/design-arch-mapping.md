---
---

```js

interface Product{
    name: string;
}



interface WebApp extends Product{
    name: string;
    pages: Page[];
}


interface Page{
    id: string;
    name: string;
    ui_elements: []
}

interface UIAction{
    id: string;
    name: string;
    ui_elements: []
}


interface UIElement{
    id: string;
    name: string;
    action: UIAction     
}


class Endpoint{
    name: string;
    path: string;
    description: string;
}


class Service{
    name: string;
    endpoints: Endpoint[];
}


interface System{
    services: Service[];
}




let AIRO = {name: "AIRO"}

let FE = new Service(name="FE")


```