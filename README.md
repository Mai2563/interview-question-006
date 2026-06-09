# 📦 Product Code Management System

Technical Test - Sr. Application Developer (.NET + Angular)

---

## 📖 Overview

This application was developed based on the technical assignment requirements.

### ✨ Features

* ➕ Add product code
* 📋 Display product code list
* 🏷️ Generate barcode using Code 39 standard
* 🗑️ Delete product code with confirmation dialog
* 💾 Store data in SQL Server database

---

## 🛠️ Technology Stack

### 🔹 Backend

* ASP.NET 8 Web API
* Entity Framework Core
* SQL Server Express

### 🔹 Frontend

* Angular 22
* TypeScript
* HTML / CSS
* JsBarcode

---

## 🔐 Product Code Format

Product codes must follow the format:

```text
XXXX-XXXX-XXXX-XXXX
```

### Rules

* 🔤 Uppercase English letters (A-Z)
* 🔢 Numbers (0-9)
* 📏 Length: 16 characters
* 🧩 Format: XXXX-XXXX-XXXX-XXXX

### Example

```text
ABCD-1234-EFGH-5678
```

---

## 🏷️ Barcode Standard

This application generates barcodes using:

✅ Code 39 Standard

Library:

* JsBarcode

---

## 🌐 API Endpoints

<img width="337" height="224" alt="Capture3" src="https://github.com/user-attachments/assets/1cacff2e-4303-47a0-afbc-cecced7f6617" />

### Get Product Codes

```http
GET /api/ProductCodes
```

### Add Product Code

```http
POST /api/ProductCodes
```

### Delete Product Code

```http
DELETE /api/ProductCodes/{id}
```

---

## 🗄️ Database

### ProductCodes

| Column      | Type     |
| ----------- | -------- |
| Id          | int      |
| Code        | nvarchar |
| CreatedDate | datetime |

---

## 🚀 Run Backend

Update connection string in:

```text
appsettings.json
```

Install dependencies:

```bash
dotnet restore
```

Apply migration:

```bash
dotnet ef database update
```

Run API:

```bash
dotnet run
```

Backend URL:

```text
http://localhost:5292
```

---

## 🚀 Run Frontend

Install dependencies:

```bash
npm install
```

Run Angular:

```bash
ng serve
```

Frontend URL:

```text
http://localhost:4200
```

---

## ✅ Implemented Features

* ✔ Product code validation
* ✔ Add product code
* ✔ Display product code list
* ✔ Code 39 barcode generation
* ✔ Delete confirmation popup
* ✔ SQL Server integration
* ✔ RESTful API

---

## 📸 Screenshots

### Main Screen

<img width="796" height="533" alt="Capture" src="https://github.com/user-attachments/assets/98f74a7b-cf08-4648-9e5f-c0026c7fc2fb" />
<img width="785" height="525" alt="Capture2" src="https://github.com/user-attachments/assets/68584fd4-d6e1-4cf6-bd3a-ac37b009d3ac" />

---

## 👨‍💻 Author

**Nawaphat S.**
