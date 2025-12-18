package main

import (
	"database/sql"
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

type Post struct {
	ID        int       `json:"id"`
	TopicID   int       `json:"topic_id"`
	Title     string    `json:"title"`
	Content   string    `json:"content"`
	Author    string    `json:"author"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
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

// get all posts from database
func getPostsFromDB(topicID string) ([]Post, error) {
	var rows *sql.Rows
	var err error
	if topicID != "" {
		// Get posts for specific topic
		rows, err = db.Query(
			"SELECT id, topic_id, title, content, author, created_at, updated_at FROM posts WHERE topic_id = $1 ORDER BY created_at DESC",
			topicID,
		)
	} else {
		// Get all posts
		rows, err = db.Query(
			"SELECT id, topic_id, title, content, author, created_at, updated_at FROM posts ORDER BY created_at DESC",
		)
	}

	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var posts []Post
	for rows.Next() {
		var post Post
		err := rows.Scan(&post.ID, &post.TopicID, &post.Title, &post.Content, &post.Author, &post.CreatedAt, &post.UpdatedAt)
		if err != nil {
			return nil, err
		}
		posts = append(posts, post)
	}
	if posts == nil {
		posts = []Post{}
	}

	return posts, nil
}

// create new post in database
func createPostInDB(topicID int, title, content, author string) (*Post, error) {
	var post Post
	err := db.QueryRow(
		"INSERT INTO posts (topic_id, title, content, author) VALUES ($1, $2, $3, $4) RETURNING id, topic_id, title, content, author, created_at, updated_at",
		topicID, title, content, author,
	).Scan(&post.ID, &post.TopicID, &post.Title, &post.Content, &post.Author, &post.CreatedAt, &post.UpdatedAt)

	if err != nil {
		return nil, err
	}
	return &post, nil
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

// handle posts endpoint
func handlePosts(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	if r.Method == "GET" {
		topicID := r.URL.Query().Get("topic_id")
		posts, err := getPostsFromDB(topicID)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		json.NewEncoder(w).Encode(posts)
	} else if r.Method == "POST" {
		var input struct {
			TopicID int    `json:"topic_id"`
			Title   string `json:"title"`
			Content string `json:"content"`
			Author  string `json:"author"`
		}

		err := json.NewDecoder(r.Body).Decode(&input)
		if err != nil {
			http.Error(w, "Invalid input", http.StatusBadRequest)
			return
		}

		post, err := createPostInDB(input.TopicID, input.Title, input.Content, input.Author)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(post)
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
	mux.HandleFunc("/posts", handlePosts)

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
	fmt.Println("  GET  /topics        - List all topics")
	fmt.Println("  POST /topics        - Create new topic")
	fmt.Println("  GET  /posts         - List all posts")
	fmt.Println("  GET  /posts?topic_id=1  - List posts in topic")
	fmt.Println("  POST /posts         - Create new post")

	http.ListenAndServe(":8080", handler)
}
