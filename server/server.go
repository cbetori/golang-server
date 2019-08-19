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

// func getFunds(w http.ResponseWriter, res *http.Request) {

// }

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

	//Create connection string and connect to db
	db.ConnectionString()
	db.Connection()

	// Route Handlers / Endpoints
	r.HandleFunc("/api", API).Methods("GET")

	r.HandleFunc("/api/funds", db.GetFunds).Methods("GET")
	r.HandleFunc("/api/fundssumgrosscap", db.GetFundsSumGrossCap).Methods("GET")

	r.HandleFunc("/api/investments", db.GetInvestments).Methods("GET")
	r.HandleFunc("/api/investments/{id}", db.GetInvestment).Methods("GET")
	r.HandleFunc("/api/investmentsdetail", db.GetInvestmentsTbl).Methods("GET")

	r.HandleFunc("/api/cf/invid/{id}", db.GetInvestmentInvIDCF).Methods("GET")
	r.HandleFunc("/api/cf/distro/invid/{id}", db.GetInvestmentsInvIDCFDistro).Methods("GET")

	r.HandleFunc("/api/funds/{id}", getFund).Methods("GET")
	r.HandleFunc("/api/funds", createFund).Methods("POST")
	r.HandleFunc("/api/funds/{id}", updateFund).Methods("PUT")
	r.HandleFunc("/api/funds/{id}", deleteFund).Methods("DELETE")

	// Start Server and Listen
	log.Fatal(http.ListenAndServe(":3001", r))
}
