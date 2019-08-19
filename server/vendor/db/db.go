package db

import (
	"database/sql"
	"fmt"
	"log"
	"os"
	"strconv"

	"github.com/joho/godotenv"
	_ "github.com/joho/godotenv/autoload"
	_ "github.com/lib/pq"
)

//Database setup
var Db *sql.DB

var (
	host     = ""
	port     = 0
	user     = ""
	password = ""
	Dbname   = ""

// host     = "localhost"
// port     = 6432
// user     = "postgres"
// password = "betori12"
// Dbname   = "virtus"
)

func ConnectionString() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	host = os.Getenv("db_host")
	port, err = strconv.Atoi(os.Getenv("db_port"))
	user = os.Getenv("db_user")
	password = os.Getenv("db_password")
	Dbname = os.Getenv("db_name")
}

func Connection() {
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+
		"password=%s dbname=%s",
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
