package db

import (
	"database/sql"
	"fmt"
	"os"

	_ "github.com/joho/godotenv/autoload"
	_ "github.com/lib/pq"
)

//Database setup 
var Db *sql.DB

func Connection() {
	db_uri := os.Getenv("db_uri")
	db, err := sql.Open("postgres", db_uri)
	if err != nil {
		panic(err)
	}
	err = db.Ping()
	if err != nil {
		panic(err)
	}
	Db = db
	fmt.Println("Successfully connected!")
}
