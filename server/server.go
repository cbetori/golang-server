package main

import (
	"db"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

//Model

//Controller
func API(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Welcome to the HomePage!")
	fmt.Println("Endpoint Hit: homePage")
}

func getFunds(w http.ResponseWriter, res *http.Request) {

}

func getFund(w http.ResponseWriter, res *http.Request) {

}

func createFund(w http.ResponseWriter, res *http.Request) {

}

func updateFund(w http.ResponseWriter, res *http.Request) {

}

func deleteFund(w http.ResponseWriter, res *http.Request) {

}

func main() {
	// Init Router
	r := mux.NewRouter()
	db.Connection()
	// db.Query()

	// Route Handlers / Endpoints
	r.HandleFunc("/api", API).Methods("GET")
	r.HandleFunc("/api/funds", db.Query).Methods("GET")
	r.HandleFunc("/api/funds/{id}", getFund).Methods("GET")
	r.HandleFunc("/api/funds", createFund).Methods("POST")
	r.HandleFunc("/api/funds/{id}", updateFund).Methods("PUT")
	r.HandleFunc("/api/funds/{id}", deleteFund).Methods("DELETE")

	// Start Server and Listen
	log.Fatal(http.ListenAndServe(":3001", r))
}
