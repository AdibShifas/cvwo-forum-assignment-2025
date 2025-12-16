package main

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/lib/pq"
)

var db *sql.DB

// InitDB initializes database connection
func InitDB() {
	connStr := "host=localhost port=5432 user=cvwo_user password=cvwo_password dbname=cvwo_forum sslmode=disable"

	var err error
	db, err = sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal("Error connecting to database:", err)
	}

	// Test connection
	err = db.Ping()
	if err != nil {
		log.Fatal("Error pinging database:", err)
	}

	fmt.Println("✅ Successfully connected to PostgreSQL database!")
}

// CloseDB closes database connection
func CloseDB() {
	if db != nil {
		db.Close()
	}
}
