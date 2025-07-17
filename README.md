# Calendar App

A modern, full-stack calendar application that allows users to create, participate in, and manage events seamlessly. Built with Next.js and integrated with Google Calendar API for synchronization across platforms.

## Features

- **Event Management**: Create, edit, and delete events with detailed information
- **Event Participation**: Join and leave events with real-time updates
- **Google Calendar Integration**: Sync events with your Google Calendar
- **User Authentication**: Secure user registration and login
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Updates**: Live event updates and notifications
- **Event Discovery**: Browse and search for public events

## Tech Stack

- **Frontend**: Next.js 14 with App Router
- **Database**: Neon (PostgreSQL)
- **ORM**: Drizzle ORM
- **Authentication**: NextAuth.js
- **External API**: Google Calendar API
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## Prerequisites

Before running this application, make sure you have:

- Node.js 18+ installed
- A Neon database account
- Google Cloud Console project with Calendar API enabled
- Google OAuth 2.0 credentials

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/calendar-app.git
cd calendar-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure your environment variables in `.env.local`:
```env
# Database
DATABASE_URL="your_neon_database_url"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your_nextauth_secret"

# Google OAuth & Calendar API
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"

# App Configuration
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

5. Run database migrations:
```bash
npm run db:push
```

6. Start the development server:
```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## Database Schema

The application uses the following main tables:

- **users**: User authentication and profile information
- **events**: Event details and metadata
- **event_participants**: Many-to-many relationship between users and events
- **google_calendar_sync**: Tracking Google Calendar synchronization

## API Routes

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login
- `POST /api/auth/signout` - User logout

### Events
- `GET /api/events` - Get all events
- `POST /api/events` - Create new event
- `GET /api/events/[id]` - Get event by ID
- `PUT /api/events/[id]` - Update event
- `DELETE /api/events/[id]` - Delete event

### Participation
- `POST /api/events/[id]/join` - Join an event
- `POST /api/events/[id]/leave` - Leave an event
- `GET /api/events/[id]/participants` - Get event participants

### Google Calendar
- `POST /api/google/sync` - Sync with Google Calendar
- `GET /api/google/events` - Get Google Calendar events

## Google Calendar API Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Calendar API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://yourdomain.com/api/auth/callback/google` (production)
6. Download the credentials and add them to your environment variables

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Manual Deployment

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## Development Commands

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Database operations
npm run db:push          # Push schema changes
npm run db:studio        # Open Drizzle Studio
npm run db:generate      # Generate migrations
npm run db:migrate       # Run migrations
```

## Project Structure

```
├── app/                 # Next.js app directory
│   ├── api/            # API routes
│   ├── auth/           # Authentication pages
│   ├── events/         # Event pages
│   └── dashboard/      # Dashboard pages
├── components/         # React components
├── lib/               # Utility functions
├── db/                # Database schema and config
├── types/             # TypeScript types
├── public/            # Static assets
└── styles/            # Global styles
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please open an issue on GitHub or contact [your-email@example.com](mailto:your-email@example.com).

## Acknowledgments

- Next.js team for the amazing framework
- Neon for the serverless PostgreSQL database
- Drizzle team for the excellent ORM
- Google for the Calendar API
- All contributors who help improve this project
