# Frontend - Customer Tracking System

React.js frontend with TailwindCSS and modern UI components.

## Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Header.js          # Navigation header
│   │   ├── Loader.js          # Loading spinner
│   │   ├── StatusBadge.js     # Status badge component
│   │   ├── CustomerForm.js    # Add customer form
│   │   ├── CustomerCard.js    # Customer card display
│   │   ├── CustomerList.js    # Customer list container
│   │   └── CallPanel.js       # Call history panel
│   ├── context/
│   │   └── AppContext.js      # Global state (React Context)
│   ├── pages/
│   │   ├── Home.js            # Home/Dashboard page
│   │   ├── Customers.js       # Customers page
│   │   ├── Reports.js         # Reports/Statistics page
│   │   └── Settings.js        # Settings page
│   ├── services/
│   │   └── api.js             # API service layer
│   ├── App.js                 # Main app component
│   ├── index.js               # React entry point
│   └── index.css              # Global styles + Tailwind
```

## Features

- **Responsive Design** - Mobile-first with TailwindCSS
- **Global State** - React Context for state management
- **Loading States** - All API calls show loading indicators
- **Toast Notifications** - User feedback with react-hot-toast
- **Icons** - Lucide React icons throughout
- **Animations** - Smooth transitions and animations

## Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests

## Environment Variables

Optional `.env` file:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

