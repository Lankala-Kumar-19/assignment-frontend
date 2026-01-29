# Company Portfolio / Admin Dashboard - React Project

This is a **React-based frontend application** for a company portfolio website with an **Admin Dashboard** to manage projects, clients, contact form submissions, and newsletter subscribers. The application integrates with a backend REST API deployed on Render.

---

## Features

### Landing Page
- **Contact Form:** Users can submit contact requests.
- **Projects Section:** Showcase company projects with images and descriptions.
- **Clients Section:** Display client testimonials and logos.
- **Newsletter Subscription:** Users can subscribe with their email.

### Admin Panel
- **Project Management:** Add, edit, and delete projects.
- **Client Management:** Add, edit, and delete clients with image URLs.
- **Contact Submissions:** View all submitted contact forms.
- **Newsletter Subscribers:** View a list of newsletter subscribers.

### Other Features
- Responsive design using **Tailwind CSS**.
- Notifications via **React Toastify** for success/error messages.
- Horizontal scrolling for projects and clients sections.
- Placeholder images for missing assets.

---

## Folder Structure

src/
├─ api/ # Axios API calls
│ ├─ clients.js
│ ├─ contactForms.js
│ ├─ newsletters.js
│ └─ projects.js
├─ assests/ # Static assets (images, SVGs)
├─ components/ # React components
│ ├─ Admin/
│ │ ├─ ClientManagement.jsx
│ │ ├─ ContactSubmissions.jsx
│ │ ├─ NewsletterList.jsx
│ │ └─ ProjectManagement.jsx
│ ├─ Landing/
│ │ ├─ ClientsSection.jsx
│ │ ├─ ContactForm.jsx
│ │ ├─ NewsletterForm.jsx
│ │ └─ ProjectsSection.jsx
├─ pages/
│ ├─ AdminPage.jsx
│ └─ LandingPage.jsx
├─ App.jsx
└─ index.js


---

## Tech Stack

- **Frontend:** React, Tailwind CSS
- **State Management:** React Hooks (`useState`, `useEffect`)
- **HTTP Requests:** Axios
- **Notifications:** React Toastify
- **Backend:** REST API (hosted on Render)

---

## Backend API Endpoints

The frontend interacts with these endpoints:

### Clients
- `GET /clients?page=&size=` → Fetch clients
- `POST /clients` → Add a client
- `PUT /clients/update/:id` → Update a client
- `DELETE /clients/delete/by-id/:id` → Delete a client

### Projects
- `GET /projects?page=&size=` → Fetch projects
- `POST /projects` → Add a project
- `PUT /projects/update/:id` → Update a project
- `DELETE /projects/delete/:id` → Delete a project

### Contact Forms
- `POST /contact-forms` → Submit a contact form
- `GET /contact-forms?page=&size=` → Fetch contact submissions

### Newsletter
- `POST /newsletters/subscribe` → Subscribe email
- `GET /newsletters?page=&size=` → Get subscribers list

---


## Installation

1. Clone the repository:

git clone https://github.com/assignment-frontend

cd assignment-frontend

2. Install dependencies:

npm install

3. Start the development server:

npm start


Open http://localhost:3000 in your browser.

