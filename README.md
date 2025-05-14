# 🚢 ENTNT – Ship Maintenance Assignment Dashboard

![ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/46a9cff8-7606-4488-9004-6dc2b2b7f985)

**ENTNT** is a React-based dashboard designed to manage ship maintenance tasks, job assignments, and related KPIs. Built as an assignment project, it features authentication, protected routes, Redux for state management, Recharts for data visualization, and localStorage for persistence.

---

## 🔗 Deployment

- **Live Application**: [Your Live Link](https://entnt-assignment-chi.vercel.app/)
- **GitHub Repository**: [GitHub Repo](https://github.com/Anand930singh/ENTNT_assignment)

## 🧩 Features

- ✅ **Authentication**: Simple user login system
- 🔒 **Protected Routes**: Navigation guard using `PrivateRoutes`
- 📊 **Dashboard Analytics**: Visualize KPIs with Recharts
- 📦 **Redux Toolkit**: Global state management for ships, jobs, and components
- 💾 **Persistent Data**: Sync state with `localStorage`
- 🔔 **Notifications**: Toast messages via `react-toastify`
- ⚙️ **Modular Architecture**: Organized components, slices, and views

---

## 🛠️ Getting Started

### Prerequisites

- Node.js v16+
- npm or yarn

### Steps to Run Locally

```bash
# Clone the repository
git clone [https://github.com/your-username/entnt.git](https://github.com/Anand930singh/ENTNT_assignment)
cd entnt

# Install dependencies
npm install

# Run development server
npm run dev
```

Visit http://localhost:5173

## 🔐 Login Credentials

Use the following credentials to log into the application. Each role has different access permissions.

| Role       | Email               | Password     | Access Permissions                                      |
|------------|---------------------|--------------|----------------------------------------------------------|
| Admin      | admin@entnt.in      | admin123     | ✅ Add/Edit/Delete Ships, Components, and Jobs           |
| Inspector  | inspector@entnt.in  | inspect123   | 🔍 Edit(Status/Priority only)                            |
| Engineer   | engineer@entnt.in   | engine123    | 🔍 View-only access                                      |

> ⚠️ **Note**: **Admin** role has the ability to **create**, **edit**, and **delete** records.
> ⚠️ **Note**: **Inspector** role has the ability to **edit**(priority/status), **view** records.
> ⚠️ **Note**: **Engineer** role has the ability to only **view** records.

## 📸 Screenshots

###  Login Screen
![image](https://github.com/user-attachments/assets/e00791f8-d7d5-427e-8bab-76001803cf8d)

###  Dashboard with KPIs and Charts
![image](https://github.com/user-attachments/assets/f0610555-ed82-4832-a544-0b6325f1ca6a)

###  Ship Listing UI with history of ship(components and jobs)
![image](https://github.com/user-attachments/assets/fa761f69-1754-4561-9659-a24db4f77539)
![image](https://github.com/user-attachments/assets/b80f53ec-ff7f-43b4-ba73-76753ff79448)

###  Components Listing
![image](https://github.com/user-attachments/assets/c4b428c0-fd31-40ad-b455-dd2293e81a4e)

###  Maintenance Jobs
![image](https://github.com/user-attachments/assets/014d0e08-82a0-4988-954f-95cd655683e3)

### Maintenance Calendar
![image](https://github.com/user-attachments/assets/71f3373e-7f3a-4d62-8102-397dae52b4e7)
![image](https://github.com/user-attachments/assets/2e214e06-2571-452b-96e9-892ec0d1b9bf)
![image](https://github.com/user-attachments/assets/760950e9-cf32-40c5-af73-85585a2ca51a)

### Add Ships/Components/Jobs
<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/6886b8cd-3c47-463e-b39e-d42daf1bf488" width="300"/></td>
    <td><img src="https://github.com/user-attachments/assets/4a3f0fa3-7e87-428a-9c83-3bad60cd985e" width="300"/></td>
    <td><img src="https://github.com/user-attachments/assets/86580f29-ae99-4c4c-9618-ee204c905b3a" width="300"/></td>
  </tr>
</table>

### Notification on Update/Delete/Edit


<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/fbd38f76-0eb7-4653-b0a0-26a4b608ac55" width="300"/></td>
    <td><img src="https://github.com/user-attachments/assets/5da81cbb-f99d-4a50-9be1-dcdbdac0234f" width="300"/></td>
    <td><img src="https://github.com/user-attachments/assets/8c3c9b56-398e-429b-bdef-9829e32a04fc" width="300"/></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/f769182f-e430-43f4-912e-02a37a38deaf" width="300"/></td>
    <td><img src="https://github.com/user-attachments/assets/d0c5c9c4-172b-452f-8fe5-de93f0a98486" width="300"/></td>
    <td><img src="https://github.com/user-attachments/assets/6deb0239-681b-4648-8e6e-7f9c84ae0534" width="300"/></td>
  </tr>
</table>


## ⚠️ Known Issues or Limitations

- No real authentication or security (user data is hardcoded).
- Only login feature is there (no signup)
- Data loss if `localStorage` is cleared manually.
- No offline/online sync or backups.
- Role access is enforced only on the frontend (can be bypassed via dev tools).

## 💡 Technical Decisions

- React Functional Components with Hooks for modern and clean code.
- `localStorage` used for data simulation per the project restriction.
- MUI components and External CSS (or your choice) for fast, utility-first styling.
- Form Validation with native HTML5 and custom feedback logic.
- Manual JSON structure created to seed the application on first load.




