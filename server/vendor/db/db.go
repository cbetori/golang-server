package db

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	_ "github.com/lib/pq"
)

//Database setup
var Db *sql.DB

const (
	host     = "localhost"
	port     = 6432
	user     = "postgres"
	password = "betori12"
	Dbname   = "virtus"
)

type Fund struct {
	FundID   string `json:"Fund_ID"`
	Feeder   string `json:"Feeder"`
	FundType string `json:"Fund_Type"`
}

var Connection = func() {
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+
		"password=%s dbname=%s sslmode=disable",
		host, port, user, password, Dbname)
	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		panic(err)
	}
	err = db.Ping()
	if err != nil {
		panic(err)
	}
	fmt.Println("Successfully connected!")
	Db = db
}

var Query = func(w http.ResponseWriter, r *http.Request) {
	funds := []Fund{}
	sqlStatement := `SELECT * FROM "tblIDB_Funds"`
	rows, err := Db.Query(sqlStatement)
	if err != nil {
		panic(err)
	}
	defer rows.Close()
	for rows.Next() {
		var f Fund
		err := rows.Scan(&f.FundID, &f.Feeder, &f.FundType)
		if err != nil {
			log.Fatal(err)
		}
		funds = append(funds, f)
	}
	result, err := json.Marshal(funds)
	if err != nil {
		panic(err)
	}
	fmt.Fprintf(w, string(result))

}
