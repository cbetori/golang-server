package db

import (
	"encoding/json"
	"log"
	"net/http"
)

type Fund struct {
	FundID   string `json:"Fund_ID"`
	Feeder   string `json:"Feeder"`
	FundType string `json:"Fund_Type"`
}

func GetFunds(r *http.Request) string {
	queryResult := []Fund{}
	sqlStatement := `SELECT * FROM "tblIDB_Funds"`
	rows, err := Db.Query(sqlStatement)
	if err != nil {
		panic(err)
	}
	defer rows.Close()
	for rows.Next() {
		var r Fund
		err := rows.Scan(&r.FundID, &r.Feeder, &r.FundType)
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

type FundsCapitalTotals struct {
	FundID     string  `json:"Fund_ID"`
	GrossCap   float32 `json:"Sum_of_Gross_Capital"`
	NetCap     float32 `json:"Sum_of_Net_Capital"`
	ActualCap  float32 `json:"Sum_of_Actual_Capital"`
	InvIDCount float32 `json:"InvID_Count"`
}

func GetFundsCapitalTotals(r *http.Request) string {
	queryResult := []FundsCapitalTotals{}
	sqlStatement :=
		`SELECT "tblIDB_Funds"."Fund_ID", SUM("tblIDB_Investments"."Gross_Capital") ` +
			`AS Sum_of_Gross_Capital, SUM("tblIDB_Investments"."Net_Capital") AS Sum_of_Net_Capital,` +
			`SUM("tblIDB_Investments"."Actual_Capital") AS Sum_of_Actual_Capital, ` +
			`COUNT("tblIDB_Investments"."InvID") AS Sum_of_Actual_Capital ` +
			`FROM "tblIDB_Funds" INNER JOIN "tblIDB_Investments" ` +
			`ON "tblIDB_Funds"."Feeder" = "tblIDB_Investments"."Feeder" ` +
			`WHERE "tblIDB_Investments"."Date_Eliminate" IS NOT NULL ` +
			`GROUP BY "tblIDB_Funds"."Fund_ID"`
	rows, err := Db.Query(sqlStatement)
	if err != nil {
		panic(err)
	}
	defer rows.Close()
	for rows.Next() {
		var r FundsCapitalTotals
		err := rows.Scan(&r.FundID, &r.GrossCap, &r.NetCap, &r.ActualCap, &r.InvIDCount)
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
