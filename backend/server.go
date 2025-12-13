package main

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/rs/cors"
)

type Topic struct {
	ID          int    `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
}

type Post struct {
	ID      int    `json:"id"`
	Title   string `json:"title"`
	Author  string `json:"author"`
	TopicID int    `json:"topic_id"`
}

var topics = []Topic{
	{ID: 1, Name: "Technology", Description: "Tech discussions"},
	{ID: 2, Name: "Gaming", Description: "Video game talks"},
	{ID: 3, Name: "Music", Description: "Music lovers"},
}

var posts = []Post{
	{ID: 1, Title: "AI is amazing", Author: "Adib", TopicID: 1},
	{ID: 2, Title: "Best RPG games", Author: "Alice", TopicID: 2},
}

func handleTopics(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	if r.Method == "GET" {
		json.NewEncoder(w).Encode(topics)

	} else if r.Method == "POST" {
		var newTopic Topic
		json.NewDecoder(r.Body).Decode(&newTopic)
		newTopic.ID = len(topics) + 1
		topics = append(topics, newTopic)

		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(newTopic)
	}
}

func getPosts(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(posts)
}

func home(w http.ResponseWriter, r *http.Request) {
	message := map[string]string{
		"message": "🚀 CVWO Forum API",
		"version": "1.0",
		"student": "Adib Shifas",
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(message)
}

func main() {
	mux := http.NewServeMux()

	mux.HandleFunc("/", home)
	mux.HandleFunc("/topics", handleTopics)
	mux.HandleFunc("/posts", getPosts)

	// CORS configuration
	c := cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:3000"},
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders: []string{"Content-Type"},
	})

	handler := c.Handler(mux)

	fmt.Println("🚀 Server running on http://localhost:8080")
	fmt.Println("✅ CORS enabled for http://localhost:3000")
	fmt.Println("API Endpoints:")
	fmt.Println("  GET  /topics   - List all topics")
	fmt.Println("  POST /topics   - Create new topic")
	fmt.Println("  GET  /posts    - List all posts")

	http.ListenAndServe(":8080", handler)
}
