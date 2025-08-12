# 📅 Calendar App

A modern, full-stack calendar application that lets you create, join, and manage events effortlessly. With real-time updates, Google Calendar integration, and a sleek responsive design, staying organized has never been easier.

## ✨ Features

* Create, edit, and delete events with rich details
* Join and leave events with instant updates
* Sync events seamlessly with Google Calendar
* Secure authentication and user management
* Browse and search public events
* Mobile-first, responsive UI for all devices
* Real-time notifications for event changes

## 🛠 Tech Stack

* **Frontend:** Next.js 14 (App Router)
* **Database:** Neon (PostgreSQL)
* **ORM:** Drizzle ORM
* **Authentication:** NextAuth.js
* **External API:** Google Calendar API
* **Styling:** Tailwind CSS
* **Deployment:** Vercel

## 📋 Prerequisites

* Node.js 18+
* Neon database account
* Google Cloud Console project with Calendar API enabled
* Google OAuth 2.0 credentials

## ⚙ Installation

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/calendar-app.git
cd calendar-app

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# 4. Push database schema
npm run db:push

# 5. Start the development server
npm run dev
```

Visit **[http://localhost:3000](http://localhost:3000)** to explore the app.

## 🗄 Database Schema

* **users** – Authentication and profile data
* **events** – Event details
* **event\_participants** – Many-to-many relationship between users & events
* **google\_calendar\_sync** – Tracks synchronization with Google Calendar

## 📡 API Endpoints

**Authentication**

* `POST /api/auth/signup` – Register
* `POST /api/auth/signin` – Login
* `POST /api/auth/signout` – Logout

**Events**

* `GET /api/events` – All events
* `POST /api/events` – Create event
* `GET /api/events/[id]` – Event by ID
* `PUT /api/events/[id]` – Update event
* `DELETE /api/events/[id]` – Delete event

**Participation**

* `POST /api/events/[id]/join` – Join event
* `POST /api/events/[id]/leave` – Leave event
* `GET /api/events/[id]/participants` – Event participants

**Google Calendar**

* `POST /api/google/sync` – Sync with Google Calendar
* `GET /api/google/events` – Get Google Calendar events

## 🔑 Google Calendar API Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create/select a project
3. Enable Google Calendar API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:

   * Development: `http://localhost:3000/api/auth/callback/google`
   * Production: `https://yourdomain.com/api/auth/callback/google`
6. Add credentials to `.env.local`

## 🚀 Deployment

**Vercel (Recommended)**

1. Push your code to GitHub
2. Connect to Vercel
3. Add environment variables
4. Deploy

**Manual**

```bash
npm run build
npm start
```

## 🧩 Project Structure

```
├── app/              # App directory
│   ├── api/          # API routes
│   ├── auth/         # Auth pages
│   ├── events/       # Event pages
│   └── dashboard/    # Dashboard
├── components/       # UI components
├── lib/              # Utilities
├── db/               # Database schema/config
├── types/            # TypeScript types
├── public/           # Static assets
└── styles/           # Global styles
```

## 🤝 Contributing

1. Fork the repo
2. Create a branch: `git checkout -b feature/awesome-feature`
3. Commit changes: `git commit -m 'Add awesome feature'`
4. Push: `git push origin feature/awesome-feature`
5. Open a PR

## 📜 License

Licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 💬 Support

For help, open an issue on GitHub or email [your-email@example.com](mailto:your-email@example.com)

## 🙌 Acknowledgments

* **Next.js** for the framework
* **Neon** for the serverless PostgreSQL
* **Drizzle ORM** for database magic
* **Google** for Calendar API
* All contributors making this app better!
