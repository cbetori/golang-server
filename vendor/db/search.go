package db

import (
	"encoding/json"
	"log"
	"net/http"

	_ "github.com/lib/pq"
)

type InvestmentSearch struct {
	FundID      string `json:"Fund_ID"`
	AccountName string `json:"Account_Name"`
	InvID       int    `json:"InvID"`
	CID         int    `json:"CID"`
}

func GetInvestmentResults(r *http.Request) string {
	queryResult := []InvestmentSearch{}
	sqlStatement :=
		`SELECT DISTINCT "InvID", "CID", "Account_Name", "Fund_ID" FROM ("tblIDB_Investments" 
		INNER JOIN "tblIDB_Investors" ON "tblIDB_Investments"."VID" = "tblIDB_Investors"."VID") 
		INNER JOIN "tblIDB_Funds" ON "tblIDB_Investments"."Feeder" = "tblIDB_Funds"."Feeder";`
	rows, err := Db.Query(sqlStatement)
	if err != nil {
		panic(err)
	}
	defer rows.Close()
	for rows.Next() {
		var r InvestmentSearch
		err := rows.Scan(&r.InvID, &r.CID, &r.AccountName, &r.FundID)
		if err != nil {
			log.Fatal(err)
		}
		queryResult = append(queryResult, r)
	}
	result, err := json.Marshal(queryResult)
	if err != nil {
		panic(err)
	}
	return string(result)
}
