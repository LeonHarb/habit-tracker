# 🧠 Habit Tracker Web Application

This Habit Tracker is a full-stack web application that allows users to create, manage, and track daily habits across a weekly grid. The app supports account creation, login/logout, and data persistence through a PostgreSQL database. It was deployed on **Chameleon Cloud** using **Docker** and **Kubernetes**.

---

## 📌 Features

- ✅ User Signup & Login (JWT Authentication)
- ➕ Add, Edit, and Delete Habits
- 📅 Weekly Habit Tracking Grid
- 📈 Progress Bar and Summary Sidebar
- 💾 Data persistence via PostgreSQL
- 🌐 Deployed with Docker & Kubernetes on Chameleon Cloud
- 🔒 Role-based API protection with Spring Security

---

## ⚙️ Tech Stack

| Layer        | Technologies                                   |
|--------------|------------------------------------------------|
| Frontend     | HTML, CSS, JavaScript                          |
| Backend      | Java, Spring Boot, Spring Security, JWT        |
| Database     | PostgreSQL                                     |
| DevOps       | Docker, Kubernetes, Helm, Chameleon Cloud      |
| Tools        | VS Code, pgAdmin, Postman                      |

---

## 🏗️ Project Architecture

```
[ Browser ] ⇄ [ HTML/CSS/JS ] ⇄ [ Spring Boot REST API ] ⇄ [ PostgreSQL DB ]
                         ↑              ↑
                 Chameleon Cloud     Kubernetes Cluster
```

- Frontend makes API requests to backend endpoints.
- Backend handles user auth and CRUD operations on habits.
- PostgreSQL persists user and habit data.
- Docker containerizes services.
- Kubernetes manages deployment and networking on Chameleon Cloud.

---

## 🚀 How to Run Locally

### 1. Clone the repo:
```bash
git clone https://github.com/your-username/habit-tracker.git
cd habit-tracker
```

### 2. Setup Backend

```bash
cd backend
mvn clean package -DskipTests
java -jar target/habits-0.0.1-SNAPSHOT.jar
```

### 3. Run Frontend

Open `frontend/index.html` in any browser.

---

## ☁️ How to Deploy on Chameleon Cloud

1. **SSH into the instance**
```bash
ssh -i group8.pem cc@<INSTANCE_IP>
```

2. **Run Kubernetes Commands**
```bash
kubectl apply -f postgres-deployment.yaml
kubectl apply -f backend-deployment.yaml
kubectl apply -f backend-service.yaml
```

3. **Port Forwarding (if needed)**
```bash
kubectl port-forward service/habit-tracker-backend-service 8080:8080
```

4. **Open in Browser**
```
http://<INSTANCE_PUBLIC_IP>:<NODE_PORT>/index.html
```

---

## 🧪 API Testing (Postman)

| Endpoint                | Method | Description               |
|-------------------------|--------|---------------------------|
| `/api/auth/signup`      | POST   | Register new user         |
| `/api/auth/signin`      | POST   | Login existing user       |
| `/api/habits`           | GET    | Get all habits            |
| `/api/habits`           | POST   | Add new habit             |
| `/api/habits/{id}`      | PUT    | Edit habit by ID          |
| `/api/habits/{id}`      | DELETE | Delete habit by ID        |

---

## 📸 Screenshots

(See `screenshots/` folder)

- Home Page UI
- Habit Grid Interface
- pgAdmin database view
- Postman API test results
- Chameleon terminal output
- Kubernetes pods/services

---

## 🎥 Project Demo

Watch the full 10-minute demo video here:  
**[📺 Demo Video Link]** https://drive.google.com/file/d/1g3ZacEORZSPgImfUgNXgT8TbYPLaAWLu/view?usp=sharing

---

## 👨‍💻 Contributors

- **Leon Harb** – Backend Developer, Deployment Help  
- **Joseph Nwanebi** – Frontend Developer
- **John Leura** – Deployment, DevOps
---

## 📄 License

This project was completed as part of the **Cloud Computing course (CS 4843)** at **UTSA – Summer 2025**.

---