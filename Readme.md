# **Student Management System**  

A simple student management system with authentication, profile management, and CRUD operations.

---

## **Prerequisites**  
Before running the project, ensure you have the following installed:  
- **MongoDB** (running locally at `mongodb://127.0.0.1:27017`)  
- **Node.js** (latest LTS version recommended)  
- **npm** or **yarn** for package management  

### **Setup `.env` file in the Server**  
Create a `.env` file in the server directory and add the following:  
```env
ACCESS_TOKEN_SECRET="Your_Access_Token"
REFRESH_TOKEN_SECRET="Your_Refresh_Token"
MONGO_URI="mongodb://127.0.0.1:27017/sms"


### Running and installation

1. Clone github repo :
2. Setup .env for server
3. Install dependancy for client and server : npm install
4. Run project in client and server: npm run dev
5. Test locally.
