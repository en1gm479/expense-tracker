## **Expense Tracker** 📝💰  

A simple **Expense Tracker** application to add, view, and filter expenses using **Node.js (Express)** for the backend and **React.js (Vite)** for the frontend.  

### **Features**   
✅ **Add expenses** with amount, category, date, and description.  
✅ **View all recorded expenses** in a list.  
✅ **Filter expenses** by **category** and **date**.  
✅ **View total expenses** for a selected period.  

---

## **Tech Stack** 
- **Backend:** Node.js, Express, MongoDB  
- **Frontend:** React.js (Vite)  
- **Database:** MongoDB  

---

## **Installation & Setup** 

### **1️⃣ Clone the Repository**  
```sh
git clone git@github.com:en1gm479/expense-tracker.git
cd expense-tracker
```

---

## **Backend Setup** (Node.js + Express)  

1️⃣ Navigate to the backend folder:  
```sh
cd backend
```

2️⃣ Install dependencies:  
```sh
sudo npm install
```

3️⃣ **Create a `.env` file** in the `backend` directory and add:  
```env
MONGO_URI=mongodb://localhost:27017/expense-tracker
PORT=3000
```

4️⃣ Start the backend server:  
```sh
node server.js
```
The server will run on **http://localhost:3000**.

---

## **Frontend Setup** (React + Vite)  

1️⃣ Navigate to the frontend folder:  
```sh
cd frontend
```

2️⃣ Install dependencies:  
```sh
sudo npm install
```

3️⃣ **Create a `.env` file** in the `frontend` directory and add:  
```env
VITE_API_BASE_URL=http://localhost:3000
```

4️⃣ Start the frontend server:  
```sh
sudo npm run dev
```
The frontend will run on **http://localhost:5173** (default Vite port).  

---

## **API Endpoints** 🌐  

### **Expenses API**  
| Method | Endpoint | Description |
|--------|-------------|--------------|
| **POST** | `/api/expenses` | Add a new expense |
| **GET** | `/api/expenses` | Get all expenses |
| **GET** | `/api/expenses?category=Food&date=YYYY-MM-DD` | Filter expenses by category & date |
| **GET** | `/api/expenses/total?start=YYYY-MM-DD&end=YYYY-MM-DD` | Get total expenses for a date range |

---
