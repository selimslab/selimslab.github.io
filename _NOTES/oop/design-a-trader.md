---

---

Trade financial instruments like stocks, bonds, and currencies on one or more exchanges, in real-time 


```py
BasePoint = Decimal(1/10000) 
UID = str 

class UID:
    ... 

class UIDGenerator:
    def generate()->UID:
        ... 

class Asset: 
    symbol: str
    name: str 

class Currency(Asset):
    ...

class Crypto(Currency):
    ...

class CurrencyPair:
    base: Currency
    quote : Currency 

    @property
    def symbol(self):
        return self.base.symbol + self.quote.symbol

    def __str__(self):
        return f"{self.base}_{self.quote}"


class Stock(Asset):
    ...

class Bond(Asset):
    ...

class ETF(Asset):
    ...


class AssetBalance: 
    asset: Asset
    free: Decimal 
    locked: Decimal 


class OrderBook:
    ask: Decimal
    mid: Decimal
    bid: Decimal
    spread: Decimal

class OrderSide(Enum):
    LONG = 1 
    SHORT = 2

class OrderType(Enum):
    MARKET = 1
    LIMIT = 2 

class Order: 
    side: OrderSide
    typ: OrderType

class DataSource:
    def stream(asset):

class ExchangeAPI: 
    name: str 

    def auth():
        ... 

    def get_balance(): 
        ...

    def submit_order(order:Order):
        ...

    def cancel_order(uid):
        ...

    def cancel_open_orders():
        ...

    def close_all_positions():
        ... 

    def deposit(asset:Asset, amount:Decimal)->AssetBalance:
        ...

    def withdraw(asset:Asset, amount:Decimal)->AssetBalance:
        ...

class DecisionInput:
    ...

class Decision:
    inputs: list[DecisionInput]
    output: Optional[Order]
    
class Strategy:
    uid: UID
    name: str 

    def decide(list[DecisionInput])->Decision:
        ...

class Trader: 
    strategy: Strategy
    exchange: ExchangeAPI 

```