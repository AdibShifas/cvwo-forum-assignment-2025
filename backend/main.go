// package main

// import "fmt"

// // Topic struct
// type Topic struct {
// 	ID          int
// 	Name        string
// 	Description string
// 	PostCount   int
// }

// func (t Topic) GetInfo() string {
// 	return fmt.Sprintf("%s - %s (%d posts)", t.Name, t.Description, t.PostCount)
// }

// // Method to check if topic is popular
// func (t Topic) IsPopular() bool {
// 	return t.PostCount > 10
// }

// // Post struct
// type Post struct {
// 	ID     int
// 	Title  string
// 	Author string
// 	Likes  int
// }

// // Method on Post
// func (p Post) GetSummary() string {
// 	return fmt.Sprintf("'%s' by %s (%d likes)", p.Title, p.Author, p.Likes)
// }

// func main() {
// 	// Create topics
// 	topics := []Topic{
// 		{ID: 1, Name: "Technology", Description: "Tech discussions", PostCount: 15},
// 		{ID: 2, Name: "Gaming", Description: "Video games", PostCount: 8},
// 		{ID: 3, Name: "Music", Description: "Music lovers", PostCount: 25},
// 	}

// 	// Use methods
// 	fmt.Println("=== TOPICS ===")
// 	for _, topic := range topics {
// 		fmt.Println(topic.GetInfo())
// 		if topic.IsPopular() {
// 			fmt.Println("  ⭐ Popular topic!")
// 		}
// 	}
// 	// Create posts
// 	posts := []Post{
// 		{ID: 1, Title: "AI Revolution", Author: "Adib", Likes: 42},
// 		{ID: 2, Title: "Best RPG Games", Author: "Alice", Likes: 18},
// 	}

// 	fmt.Println("\n=== POSTS ===")
// 	for _, post := range posts {
// 		fmt.Println(post.GetSummary())
// 	}

// }
