# 🧠 Habit Tracker Web Application

![Java](https://img.shields.io/badge/Java-17-orange)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.0-brightgreen)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue)
![Docker](https://img.shields.io/badge/Docker-Enabled-blue)
![Kubernetes](https://img.shields.io/badge/Kubernetes-Deployed-blue)
![License](https://img.shields.io/badge/License-Academic-lightgrey)

A **cloud-native full-stack habit tracker** that enables users to create, manage, and track daily habits across a weekly grid.  
Built with **Java Spring Boot**, **PostgreSQL**, and a **vanilla HTML/CSS/JS frontend**, containerized with **Docker**, and deployed to a **Kubernetes cluster on Chameleon Cloud**.  

---

## 📌 Features
- ✅ **User Authentication** (Signup & Login with JWT)
- ➕ Add, Edit, and Delete Habits
- 📅 Weekly Habit Tracking Grid
- 📈 Progress Bar & Summary Sidebar
- 💾 Persistent Storage via PostgreSQL
- 🌐 Containerized & Deployed on Chameleon Cloud (Kubernetes)
- 🔒 Role-based API Security with Spring Security

---

## ⚙️ Tech Stack
| Layer        | Technologies                                   |
|--------------|------------------------------------------------|
| Frontend     | HTML, CSS, JavaScript                          |
| Backend      | Java, Spring Boot, Spring Security, JWT        |
| Database     | PostgreSQL                                     |
| DevOps       | Docker, Kubernetes, Helm, Chameleon Cloud      |
| Tools        | VS Code, pgAdmin, Postman, Maven               |

---

## 🏗️ Project Architecture
```
[ Browser ] ⇄ [ HTML/CSS/JS ] ⇄ [ Spring Boot REST API ] ⇄ [ PostgreSQL DB ]
                         ↑              ↑
                 Chameleon Cloud     Kubernetes Cluster
```
- **Frontend** calls backend REST endpoints for CRUD operations.
- **Backend** handles user authentication & business logic.
- **PostgreSQL** stores user and habit data.
- **Docker** containerizes services for consistency.
- **Kubernetes** manages deployment, scaling, and networking.

---

## 🚀 Local Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/LeonHarb/habit-tracker.git
cd habit-tracker/habits
```

### 2️⃣ Backend Setup
```bash
mvn clean package -DskipTests
java -jar target/habits-0.0.1-SNAPSHOT.jar
```

### 3️⃣ Frontend Setup
Open:
```
src/main/resources/static/index.html
```
in your browser.

---

## ☁️ Deployment on Chameleon Cloud
1. **SSH into your instance**  
```bash
ssh -i group8.pem cc@<INSTANCE_IP>
```
2. **Apply Kubernetes manifests**  
```bash
kubectl apply -f postgres-deployment.yaml
kubectl apply -f backend-deployment.yaml
kubectl apply -f backend-service.yaml
```
3. **(Optional) Port Forward**  
```bash
kubectl port-forward service/habit-tracker-backend-service 8080:8080
```
4. **Access in Browser**  
```
http://<INSTANCE_PUBLIC_IP>:<NODE_PORT>/index.html
```

---

## 🧪 API Endpoints
| Endpoint                | Method | Description         |
|-------------------------|--------|---------------------|
| `/api/auth/signup`      | POST   | Register new user   |
| `/api/auth/signin`      | POST   | Login existing user |
| `/api/habits`           | GET    | Get all habits      |
| `/api/habits`           | POST   | Add new habit       |
| `/api/habits/{id}`      | PUT    | Edit habit by ID    |
| `/api/habits/{id}`      | DELETE | Delete habit by ID  |

---

## 📸 Screenshots
*(Replace these with actual image URLs in your repo’s `/screenshots` folder so they display inline)*

- ![Home Page UI](screenshots/home.png)
- ![Habit Grid Interface](screenshots/grid.png)
- ![pgAdmin View](screenshots/pgadmin.png)
- ![Postman Tests](screenshots/postman.png)
- ![Kubernetes Pods](screenshots/k8s.png)

---

## 🎥 Demo
▶ **[Watch 10-Minute Demo Video](https://drive.google.com/file/d/1g3ZacEORZSPgImfUgNXgT8TbYPLaAWLu/view?usp=sharing)**

---

## 👨‍💻 Contributors
- **Leon Harb** – Backend Development, Deployment
- **Joseph Nwanebi** – Frontend Development
- **John Leura** – DevOps & Deployment

---

## 📄 License
This project was developed for the **Cloud Computing course (CS 4843)** at **UTSA – Summer 2025**.

---

## 📬 Connect
📧 **Email:** leon.s.harb@gmail.com  
💼 **LinkedIn:** [linkedin.com/in/leonharb](https://www.linkedin.com/in/leonharb)  
🐙 **GitHub:** [github.com/LeonHarb](https://github.com/LeonHarb)
