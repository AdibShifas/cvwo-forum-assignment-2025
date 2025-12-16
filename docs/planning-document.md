# CVWO Forum Assignment - Planning Document

**Student Name:** Adib Shifas  
**Matriculation Number:** A0305618E  
**Date:** December 16 2025

---

## 1. Project Overview

### Purpose
A web-based forum application where users can create topics, post discussions, and comment on posts. Similar to Reddit but simpler, focusing on core forum functionality.

### Tech Stack
- **Frontend:** React 18 with TypeScript
- **Backend:** Go 1.25
- **Database:** PostgreSQL (planned)
- **Deployment:** Render (backend), Netlify (frontend)

---

## 2. User Stories

### Core Features (MVP)

**As a user, I want to:**

**Topics:**
- View all topics so I can browse discussions
- Create a new topic to start a conversation area
- Update a topic's name or description
- Delete a topic I created

**Posts:**
- View all posts in a topic to see discussions
- Create a post to share my thoughts
- Edit my post if I made a mistake
- Delete my post if needed

**Comments:**
- View comments on a post to see responses
- Add a comment to join the discussion
- Edit my comment to fix errors
- Delete my comment if needed

**Authentication:**
- Enter a username to identify myself
- Have my posts/comments show my username
- Use the same username across sessions

### Additional Features (Stretch Goals)

**As a user, I want to:**
- Search for topics and posts by keywords
- Like/dislike posts and comments
- See post/comment count on each topic
- View timestamps on posts and comments
- Reply to specific comments (nested replies)
- Sort posts by newest/popular

---

## 3. Data Models

### Topic
```
- ID: integer (primary key)
- Name: string
- Description: string
- CreatedAt: timestamp
- UpdatedAt: timestamp
```

### Post
```
- ID: integer (primary key)
- TopicID: integer (foreign key → Topic)
- Title: string
- Content: text
- Author: string
- CreatedAt: timestamp
- UpdatedAt: timestamp
```

### Comment
```
- ID: integer (primary key)
- PostID: integer (foreign key → Post)
- Content: text
- Author: string
- CreatedAt: timestamp
- UpdatedAt: timestamp
```

### User (for authentication)
```
- Username: string (primary key)
- CreatedAt: timestamp
```

**Relationships:**
- One Topic has many Posts
- One Post has many Comments
- All Posts and Comments belong to a User (by username)

---

## 4. API Design (RESTful Endpoints)

### Topics
- `GET /api/topics` - List all topics
- `POST /api/topics` - Create new topic
- `GET /api/topics/:id` - Get specific topic
- `PUT /api/topics/:id` - Update topic
- `DELETE /api/topics/:id` - Delete topic

### Posts
- `GET /api/posts?topic_id=:id` - List posts in topic
- `POST /api/posts` - Create new post
- `GET /api/posts/:id` - Get specific post with comments
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post

### Comments
- `GET /api/comments?post_id=:id` - List comments on post
- `POST /api/comments` - Create new comment
- `PUT /api/comments/:id` - Update comment
- `DELETE /api/comments/:id` - Delete comment

### Authentication
- `POST /api/auth/login` - Set username (simple auth)
- `GET /api/auth/me` - Get current username

---

## 5. Architecture

### System Architecture
```
┌─────────────────────────────────────┐
│  React Frontend (TypeScript)        │
│  - Components (Topic, Post, Comment)│
│  - State Management (useState)      │
│  - API calls (fetch)                │
└─────────────┬───────────────────────┘
              │
              │ HTTP/JSON (REST API)
              │ Port 3000 → 8080
              │
┌─────────────▼───────────────────────┐
│  Go Backend                          │
│  - HTTP Server (net/http)           │
│  - Route Handlers                   │
│  - Business Logic                   │
└─────────────┬───────────────────────┘
              │
              │ SQL Queries
              │
┌─────────────▼───────────────────────┐
│  PostgreSQL Database                │
│  - Tables (topics, posts, comments) │
│  - Persistent storage               │
└─────────────────────────────────────┘
```

### Frontend Components
- `App.tsx` - Main application, routing
- `TopicList.tsx` - Display all topics
- `TopicCard.tsx` - Individual topic display
- `PostList.tsx` - Display posts in topic
- `PostDetail.tsx` - Post with comments
- `CommentList.tsx` - Display comments
- `CreateForm.tsx` - Reusable form component

### Backend Structure
```
backend/
├── main.go              - Entry point
├── handlers/            - HTTP handlers
│   ├── topics.go
│   ├── posts.go
│   └── comments.go
├── models/              - Data structures
│   ├── topic.go
│   ├── post.go
│   └── comment.go
└── database/            - DB connection
    └── db.go
```

---

## 6. Libraries & Tools

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Material-UI (MUI)** - UI components (planned)
- **React Router** - Navigation (planned)

### Backend
- **Go 1.25** - Programming language
- **net/http** - HTTP server (built-in)
- **github.com/rs/cors** - CORS handling
- **github.com/lib/pq** - PostgreSQL driver (planned)

### Database
- **PostgreSQL** - Relational database
- Chosen for: ACID compliance, relationships, SQL support

### Development Tools
- **VS Code** - Code editor
- **Git/GitHub** - Version control
- **Postman/curl** - API testing

---

## 7. Implementation Plan

### Phase 1: Foundation (Completed)
- ✅ Project setup
- ✅ Go backend with HTTP server
- ✅ React frontend with TypeScript
- ✅ Topics CRUD (in-memory)
- ✅ API integration with CORS

### Phase 2: Database (Dec 17-22)
- ✅ Install PostgreSQL locally
- ✅ Design database schema
- ✅ Connect Go to PostgreSQL
- ✅ Migrate topics to database
- ✅ Add database CRUD operations

### Phase 3: Posts Feature (Dec 23-25)
- Create Post data model
- Implement posts API endpoints
- Build Post React components
- Connect posts to topics
- Test full posts workflow

### Phase 4: Comments Feature (Dec 26-29)
- Create Comment data model
- Implement comments API endpoints
- Build Comment React components
- Nested comment display
- Test full comments workflow

### Phase 5: Authentication (Dec 30 - Jan 2)
- Simple username-based auth
- Store username in session
- Associate posts/comments with users
- Display author information

### Phase 6: Polish & Deploy (Jan 3-18)
- Add Material-UI styling
- Improve error handling
- Add loading states
- Deploy backend to Render
- Deploy frontend to Netlify
- Test deployed application

### Phase 7: Final Touches (Jan 19-24)
- Code review and refactoring
- Add stretch features (if time)
- Write documentation
- Prepare final submission

---

## 8. Challenges & Solutions

### Expected Challenges

**Challenge 1: CORS Configuration**
- *Solution:* Use github.com/rs/cors library with proper configuration

**Challenge 2: Database Connection**
- *Solution:* Use connection pooling, handle errors gracefully

**Challenge 3: State Management in React**
- *Solution:* Keep state at appropriate component level, lift state when needed

**Challenge 4: TypeScript Types**
- *Solution:* Define interfaces for all data models, use strict typing

---

## 9. Testing Strategy

### Manual Testing
- Test each API endpoint with Postman/curl
- Test UI interactions in browser
- Test edge cases (empty inputs, long text)
- Test error scenarios

### Browser Testing
- Test on Chrome (primary)
- Test on Firefox
- Basic mobile responsiveness check

---

## 10. Success Criteria

### Minimum Viable Product (MVP)
- ✅ Topics: Full CRUD working
- ⏳ Posts: Full CRUD working
- ⏳ Comments: Full CRUD working
- ⏳ Database: Data persists across restarts
- ⏳ Authentication: Username-based system
- ⏳ Deployment: Accessible online

### Quality Metrics
- Clean, readable code
- Proper error handling
- Responsive UI
- No major bugs
- Good documentation

---

## 11. Timeline Summary

- **Dec 10-13:** Setup and core features ✅
- **Dec 17-22:** Database integration
- **Dec 23-29:** Posts and Comments
- **Dec 30 - Jan 2:** Authentication
- **Jan 3-18:** Deployment and polish
- **Jan 19-24:** Final documentation
- **Jan 25:** Final submission

---

## 12. Conclusion

This planning document outlines a realistic path to building a functional web forum. The phased approach ensures steady progress while allowing time for learning and problem-solving. The tech stack (Go + React + PostgreSQL) provides modern, industry-standard tools that align with CVWO's requirements.

The focus is on building a solid MVP first, then adding enhancements. This ensures that even if time is limited, a complete working application will be delivered.

---

**Note:** This is a living document and may be updated as development progresses and new insights are gained.