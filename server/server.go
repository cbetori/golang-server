package main

import (
	"controller"
	"db"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
	_ "github.com/joho/godotenv/autoload"
)

//Model

//Controller
func apiHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Welcome to the HomePage!")
	fmt.Println("Endpoint Hit: homePage")
}

func main() {
	// Init Router
	r := mux.NewRouter()
	// Set port from env file
	port := os.Getenv("PORT")
	// Create connection string and connect to db
	// db.ConnectionString()
	db.Connection()
	// Route Handlers / Endpoints
	r.HandleFunc("/api", apiHandler).Methods("GET")

	r.HandleFunc("/api/funds", controller.FundsHandler).Methods("GET")
	r.HandleFunc("/api/fundstotals", controller.FundsTotalsHandler).Methods("GET")

	r.HandleFunc("/api/investments", controller.InvestmentsHandler).Methods("GET")
	r.HandleFunc("/api/investments/{id}", controller.InvestmentHandler).Methods("GET")
	r.HandleFunc("/api/investmentsdetail", db.GetInvestmentsTbl).Methods("GET")

	r.HandleFunc("/api/cf/totals", controller.CFTotalsHandler).Methods("GET")
	r.HandleFunc("/api/cf/totals/monthly", controller.CFTotalsMonthHandler).Methods("GET")
	// r.HandleFunc("/api/investors", controller.InvestmentHandler).Methods("GET")
	// r.HandleFunc("/api/investors/invid/{id}", db.GetInvestmentAll).Methods("GET")

	r.HandleFunc("/api/cf/invid/{id}", db.GetInvestmentInvIDCF).Methods("GET")
	r.HandleFunc("/api/cf/distro/invid", db.GetInvestmentsInvIDCFDistro).Methods("GET")

	// r.HandleFunc("/api/funds/{id}", getFund).Methods("GET")
	// r.HandleFunc("/api/funds", createFund).Methods("POST")
	// r.HandleFunc("/api/funds/{id}", updateFund).Methods("PUT")
	// r.HandleFunc("/api/funds/{id}", deleteFund).Methods("DELETE")

	// Start Server and Listen
	log.Fatal(http.ListenAndServe(":"+port, r))
}
