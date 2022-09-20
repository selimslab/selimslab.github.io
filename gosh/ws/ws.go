package main

import (
	"fmt"
	"net/http"
	"log"
	"github.com/gorilla/websocket"
	"github.com/adshao/go-binance/v2"
)

var upgrader = websocket.Upgrader{
    ReadBufferSize:  1024,
    WriteBufferSize: 1024,
}


func watcher(kchan chan binance.WsKline){
	wsKlineHandler := func(event *binance.WsKlineEvent) {
		kchan <- event.Kline
	}
	errHandler := func(err error) {
		log.Println(err)
	}
	doneC, _, err := binance.WsKlineServe("LTCBTC", "1m", wsKlineHandler, errHandler)
	if err != nil {
		fmt.Println(err)
		return
	}
	<-doneC
}

func publisher(kchan chan binance.WsKline, conn *websocket.Conn){

	for kline := range(kchan){
		fmt.Printf("%s sent: %s\n", conn.RemoteAddr(), kline)
		// Write message back to browser
		if err := conn.WriteMessage(0, []byte(kline.Low)); err != nil {
			return
		}
	}

}


func main() {
    http.HandleFunc("/echo", func(w http.ResponseWriter, r *http.Request) {
		upgrader.CheckOrigin = func(r *http.Request) bool { return true }
        conn, err := upgrader.Upgrade(w, r, nil) // error ignored for sake of simplicity
		if err != nil {
			log.Fatal(err)
			return 
		}

		kchan := make(chan binance.WsKline)
		go watcher(kchan)
		go publisher(kchan, conn)

    })

    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        http.ServeFile(w, r, "index.html")
    })

    http.ListenAndServe(":8080", nil)
}