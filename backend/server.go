package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/rs/cors"
)

type Topic struct {
	ID          int       `json:"id"`
	Name        string    `json:"name"`
	Description string    `json:"description"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

// Get all topics from database
func getTopicsFromDB() ([]Topic, error) {
	rows, err := db.Query("SELECT id, name, description, created_at, updated_at FROM topics ORDER BY id")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var topics []Topic
	for rows.Next() {
		var topic Topic
		err := rows.Scan(&topic.ID, &topic.Name, &topic.Description, &topic.CreatedAt, &topic.UpdatedAt)
		if err != nil {
			return nil, err
		}
		topics = append(topics, topic)
	}

	return topics, nil
}

// Create new topic in database
func createTopicInDB(name, description string) (*Topic, error) {
	var topic Topic
	err := db.QueryRow(
		"INSERT INTO topics (name, description) VALUES ($1, $2) RETURNING id, name, description, created_at, updated_at",
		name, description,
	).Scan(&topic.ID, &topic.Name, &topic.Description, &topic.CreatedAt, &topic.UpdatedAt)

	if err != nil {
		return nil, err
	}

	return &topic, nil
}

// Handle topics endpoint
func handleTopics(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	if r.Method == "GET" {
		topics, err := getTopicsFromDB()
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		json.NewEncoder(w).Encode(topics)

	} else if r.Method == "POST" {
		var input struct {
			Name        string `json:"name"`
			Description string `json:"description"`
		}

		err := json.NewDecoder(r.Body).Decode(&input)
		if err != nil {
			http.Error(w, "Invalid input", http.StatusBadRequest)
			return
		}

		topic, err := createTopicInDB(input.Name, input.Description)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(topic)
	}
}

func home(w http.ResponseWriter, r *http.Request) {
	message := map[string]string{
		"message": "🚀 CVWO Forum API",
		"version": "2.0 - Now with PostgreSQL!",
		"student": "Adib Shifas",
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(message)
}

func main() {
	// Initialize database
	InitDB()
	defer CloseDB()

	mux := http.NewServeMux()

	mux.HandleFunc("/", home)
	mux.HandleFunc("/topics", handleTopics)

	// CORS configuration
	c := cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:3000"},
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders: []string{"Content-Type"},
	})

	handler := c.Handler(mux)

	fmt.Println("🚀 Server running on http://localhost:8080")
	fmt.Println("✅ Connected to PostgreSQL database")
	fmt.Println("API Endpoints:")
	fmt.Println("  GET  /topics   - List all topics")
	fmt.Println("  POST /topics   - Create new topic")

	http.ListenAndServe(":8080", handler)
}
