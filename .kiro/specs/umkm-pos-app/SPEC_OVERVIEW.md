# UMKM-POS App - Specification Overview

## Project Summary

**Project Name:** UMKM-POS App  
**Type:** SaaS POS Frontend Application  
**Framework:** Vue 3 + Vite  
**Language:** TypeScript  
**Architecture:** Feature-Based Modular  
**Target Users:** Cashiers, Admins, Merchants  

---

## Key Documents

1. **requirements.md** - Detailed user stories and acceptance criteria
2. **USER_FLOWS.md** - Comprehensive user flows and workflows (in project root)
3. **README.md** - Project overview and tech stack

---

## Core Features

### 1. Authentication & Authorization
- User login with email/password
- JWT token management
- Session expiry handling
- Role-based access control
- Permission-based UI rendering

### 2. POS Terminal
- Product browsing and search
- Shopping cart management
- Transaction creation with stock validation
- Payment method selection
- Receipt printing
- Transaction voiding
- Shift management (start/end)

### 3. Dashboard
- Business overview with metrics
- Sales summary
- Top products
- Time period filtering
- Multi-outlet support

### 4. Transaction Management
- Transaction history with pagination
- Search and filtering
- Transaction details view
- Receipt viewing and printing
- Transaction voiding

### 5. Product Management
- Product list with search/filter
- Create/edit products
- Stock adjustment with audit logs
- Stock history tracking
- Category management

### 6. User Management
- User list with search/filter
- Create/edit users
- User deactivation
- Permission assignment
- Role management

### 7. Reports & Analytics
- Daily sales reports
- Sales analytics with charts
- Stock reports
- Data export (PDF, CSV)
- Time period analysis

### 8. Offline Support
- Offline transaction creation
- Local queue management
- Automatic sync when online
- Conflict resolution
- Sync status monitoring

---

## Feature-Based Module Structure

```
src/modules/
├── auth/              # Authentication & login
├── dashboard/         # Business overview
├── pos/              # POS terminal (to be created)
├── transactions/     # Transaction management (to be created)
├── products/         # Product management (to be created)
├── reports/          # Reports & analytics (to be created)
├── users/            # User management (to be created)
├── outlets/          # Outlet management (to be created)
├── settings/         # Settings & configuration
├── error/            # Error pages
└── landing/          # Landing page
```

Each module contains:
- `pages/` - Routable components
- `router/` - Route definitions
- `services/` - API integration
- `stores/` - Pinia state management
- `components/` - Feature-specific components (optional)
- `helpers/` - Composables & utilities (optional)
- `styles/` - Module styles (optional)

---

## Tech Stack

**Core:**
- Vue 3 (^3.5.18)
- Vite (^7.1.2)
- TypeScript (~5.8.3)
- Vue Router (^4.5.1)

**State & Data:**
- Pinia (^3.0.3)
- Axios (^1.11.0)
- Zod (^4.1.3)

**UI & Styling:**
- PrimeVue (^4.3.7)
- Tailwind CSS (^4.1.12)
- PrimeIcons (^7.0.0)

**Utilities:**
- Chart.js (^4.5.0)
- Day.js (^1.11.18)
- Hygen (^6.2.11)

---

## API Integration Points

The app consumes these API endpoints:

- **Auth:** POST /auth/login, POST /auth/register
- **Transactions:** GET/POST /transactions, POST /transactions/sync
- **Products:** GET /products, POST/PUT /products
- **Stock:** GET /stock, POST /stock/adjust
- **Shifts:** GET/POST /shifts, PUT /shifts/:id
- **Reports:** GET /reports/daily, GET /reports/summary
- **Users:** GET/POST/PUT /users
- **Outlets:** GET /outlets
- **Merchants:** GET /merchants

---

## Key User Flows

### 1. Cashier POS Flow
1. Login → Start Shift → Browse Products → Add to Cart → Checkout → Confirm Transaction → Print Receipt

### 2. Admin Dashboard Flow
1. Login → View Dashboard → Navigate to Section → View/Manage Data → Generate Reports

### 3. Offline Sync Flow
1. Create Transaction (Offline) → Queue Locally → Connection Restored → Auto/Manual Sync → Sync Complete

---

## Success Criteria

- ✅ 95%+ of user flows complete successfully
- ✅ Average page load time < 2 seconds
- ✅ 99%+ API success rate
- ✅ Zero critical bugs in production
- ✅ User satisfaction score > 4.5/5
- ✅ Offline sync success rate > 98%
- ✅ Zero data loss incidents

---

## Development Phases

### Phase 1: Core Setup & Auth
- Project initialization
- Global components
- Auth module
- Dashboard layout

### Phase 2: POS Terminal
- POS module
- Product browsing
- Cart management
- Transaction creation

### Phase 3: Management Features
- Transactions module
- Products module
- Users module
- Outlets module

### Phase 4: Reports & Advanced
- Reports module
- Analytics
- Offline sync
- Settings

### Phase 5: Polish & Testing
- Performance optimization
- Bug fixes
- Testing
- Documentation

---

## Important Notes

### Multi-Tenant Architecture
- All data is merchant-scoped
- Users belong to one merchant
- Outlets belong to merchants
- Roles are outlet-scoped

### Transaction Atomicity
- Transactions must be atomic
- Stock must be reduced immediately
- Stock logs must be created
- Price snapshots must be stored

### Offline Support
- Transactions can be created offline
- Queue is stored locally
- Server is authoritative on sync
- Conflicts are resolved server-side

### Permission-Based Access
- UI renders based on permissions
- Routes are guarded by permissions
- API enforces permissions
- Permissions are action-based

---

## Related Documentation

- **API Documentation:** See `umkm-pos-api/README.md`
- **API Conventions:** See `umkm-pos-api/API_CONVENTIONS.md`
- **Domain Rules:** See `umkm-pos-api/DOMAIN_RULES.md`
- **User Flows:** See `USER_FLOWS.md` in project root

---

## Next Steps

1. Review requirements.md for detailed acceptance criteria
2. Review USER_FLOWS.md for comprehensive user workflows
3. Begin Phase 1 development (Core Setup & Auth)
4. Create design.md for technical architecture
5. Create tasks.md for implementation tasks
