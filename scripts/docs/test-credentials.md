# Test User Credentials

This document contains login credentials for testing the authentication system.

## 🔐 Authentication Test Users

### 👑 **ADMIN USER**

- **Name**: Admin User
- **Email**: `admin@example.com`
- **Password**: `admin123`
- **Role**: Administrator
- **Permissions**: Full access to admin features

---

### 👤 **REGULAR USERS**

#### User 1: John Doe

- **Email**: `john.doe@example.com`
- **Password**: `password123`
- **Role**: Regular User

#### User 2: Jane Smith

- **Email**: `jane.smith@example.com`
- **Password**: `password123`
- **Role**: Regular User

#### User 3: Bob Johnson

- **Email**: `bob.johnson@example.com`
- **Password**: `password123`
- **Role**: Regular User

#### User 4: Alice Wilson

- **Email**: `alice.wilson@example.com`
- **Password**: `password123`
- **Role**: Regular User

#### User 5: Charlie Brown

- **Email**: `charlie.brown@example.com`
- **Password**: `password123`
- **Role**: Regular User

---

## 🧪 **Testing Scenarios**

### Admin Access Testing

```
Email: admin@example.com
Password: admin123
Expected: Access to admin dashboard, user management, etc.
```

### Regular User Testing

```
Email: john.doe@example.com (or any regular user)
Password: password123
Expected: Standard user features, no admin access
```

### Invalid Login Testing

```
Email: invalid@example.com
Password: wrongpassword
Expected: Login failure, appropriate error messages
```

---

## 📋 **Quick Copy-Paste**

### Admin Login

```
admin@example.com
admin123
```

### Regular User Login

```
john.doe@example.com
password123
```

---

## ⚠️ **Security Notes**

- These are **development credentials only**
- Never use these passwords in production
- Change all default passwords before deploying
- Consider using environment variables for test credentials in CI/CD

---

## 🔄 **Regenerating Users**

To recreate all test users:

```bash
pnpm db:seed:users
```

To clear all data and start fresh:

```bash
pnpm db:delete-all
pnpm db:seed:users
```
