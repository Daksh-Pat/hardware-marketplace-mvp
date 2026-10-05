# PC Hardware Trading Marketplace MVP

A full-stack, real-time marketplace application designed for trading PC components. Built with a decoupled .NET REST API backend, PostgreSQL relational database, custom React frontend, and SignalR WebSockets for real-time messaging.

---

## Key Features

* **User Authentication:** Secure server-side credential hashing with JWT issuance for stateless session validation.
* **Listing Management:** Full CRUD operations for hardware components with category filtering and relational data indexing.
* **Real-Time Messaging:** Bidirectional chat channels built with .NET SignalR hubs enabling real-time WebSocket communication between buyers and sellers.
* **Database Optimization:** PostgreSQL schema using foreign key indexing to optimize query execution and maintain relational integrity.

---

## Tech Stack

* **Backend:** C#, .NET Core, ASP.NET Core Web API, Entity Framework Core
* **Real-Time Engine:** .NET SignalR
* **Database:** PostgreSQL
* **Authentication:** JWT (JSON Web Tokens)
* **Frontend:** React.js, JavaScript, HTML/CSS
* **Tooling & Ops:** Git, REST APIs, Postman

---

## Architecture Overview

<img width="537" height="434" alt="marketplace_architecture" src="https://github.com/user-attachments/assets/7055bdb3-87a7-4ab9-aafe-4412a08e9306" />

## Quick Start

### Prerequisites
* .NET 10 SDK, React.js, PostgreSQL

### Running Locally
1. **Backend:** Update `appsettings.json` connection string, run `dotnet ef database update`, then `dotnet run`.
2. **Frontend:** Run `npm install` and `npm start`.
