# UMKM-POS App - Requirements

## Overview

UMKM-POS App is a Vue 3 + Vite frontend application for a SaaS Point of Sale (POS) system designed for UMKM tourism businesses. The app provides both POS terminal functionality for cashiers and a merchant dashboard for business owners and administrators.

**Target Users:**
- Cashiers (POS terminal operators)
- Admins (business managers)
- Merchants (business owners)

**Core Purpose:**
- Enable fast, reliable POS transactions
- Provide business insights via dashboard
- Support offline transaction processing
- Manage products, users, and inventory

---

## User Stories & Acceptance Criteria

### 1. Authentication & Authorization

#### 1.1 User Login
**As a** cashier/admin/merchant  
**I want to** login with email and password  
**So that** I can access the POS system securely

**Acceptance Criteria:**
- [ ] Login page displays email and password input fields
- [ ] Email field validates email format before submission
- [ ] Password field masks input for security
- [ ] "Login" button is disabled until both fields are filled
- [ ] On successful login, JWT token is stored securely
- [ ] User is redirected to appropriate dashboard based on role
- [ ] Error message displays for invalid credentials
- [ ] Error message displays for network errors
- [ ] Loading state shows during API call
- [ ] Token persists across page refreshes
- [ ] User can navigate back to login if not authenticated

#### 1.2 User Logout
**As a** logged-in user  
**I want to** logout from the system  
**So that** my session is securely terminated

**Acceptance Criteria:**
- [ ] Logout button is visible in navigation menu
- [ ] Clicking logout immediately clears JWT token
- [ ] User is redirected to login page
- [ ] Back button doesn't allow access to protected pages
- [ ] All user data is cleared from memory
- [ ] Confirmation dialog appears before logout (optional)

#### 1.3 Session Expiry Handling
**As a** system  
**I want to** handle expired JWT tokens  
**So that** users are automatically logged out when session expires

**Acceptance Criteria:**
- [ ] Expired token triggers automatic logout
- [ ] User sees "Session expired" message
- [ ] User is redirected to login page
- [ ] All protected pages redirect to login on 401
- [ ] Axios interceptor handles 401 globally

---

### 2. POS Terminal

#### 2.1 Create Transaction (Happy Path)
**As a** cashier  
**I want to** create a transaction by adding products and confirming payment  
**So that** I can process customer purchases

**Acceptance Criteria:**
- [ ] Product list displays with images, names, prices, and stock levels
- [ ] Search filters products by name/category in real-time
- [ ] Product details show current stock level
- [ ] Quantity input validates positive numbers only
- [ ] "Add to Cart" button adds item to cart
- [ ] Cart displays all items with subtotal and total
- [ ] Cart allows editing quantity or removing items
- [ ] Total price updates correctly when items change
- [ ] Payment method selector shows available options
- [ ] "Confirm Transaction" button is disabled until payment method selected
- [ ] Transaction creation shows loading state
- [ ] Success message displays with transaction ID
- [ ] Receipt can be printed or downloaded
- [ ] Stock is reduced immediately after transaction
- [ ] Cart clears after successful transaction
- [ ] User can start new transaction immediately

#### 2.2 Stock Validation on Add to Cart
**As a** cashier  
**I want to** be prevented from adding more items than available stock  
**So that** I don't create invalid transactions

**Acceptance Criteria:**
- [ ] System validates quantity against available stock
- [ ] Error message shows "Insufficient stock" with available quantity
- [ ] Quantity input has max value set to available stock
- [ ] User can adjust quantity and retry
- [ ] Stock validation happens before adding to cart

#### 2.3 Edit Cart Items
**As a** cashier  
**I want to** edit items in my cart before checkout  
**So that** I can correct mistakes

**Acceptance Criteria:**
- [ ] Cart displays all items with quantity and price
- [ ] Edit button allows quantity adjustment
- [ ] Quantity validation prevents exceeding stock
- [ ] Total updates in real-time
- [ ] Remove button deletes item from cart
- [ ] Empty cart shows message and disables checkout

#### 2.4 Void Transaction
**As a** cashier/admin  
**I want to** void a transaction  
**So that** I can correct mistakes or handle returns

**Acceptance Criteria:**
- [ ] Void button only appears for voidable transactions
- [ ] Confirmation dialog shows transaction details
- [ ] Void action is logged with user and timestamp
- [ ] Stock is restored to original amount
- [ ] Stock log shows void reason
- [ ] Voided transaction shows "VOIDED" status
- [ ] Cannot void already voided transaction

#### 2.5 Shift Management
**As a** cashier  
**I want to** start and end shifts  
**So that** I can track my work hours and transactions

**Acceptance Criteria:**
- [ ] Start Shift button visible when no active shift
- [ ] End Shift button visible when shift is active
- [ ] Shift start time is recorded
- [ ] Shift end time is recorded
- [ ] Transactions can be linked to shift
- [ ] Shift summary shows correct transaction count
- [ ] Shift summary shows correct total sales
- [ ] Cannot start new shift without ending current one

---

### 3. Dashboard

#### 3.1 View Dashboard Overview
**As a** admin/merchant  
**I want to** see a dashboard with key business metrics  
**So that** I can understand my business performance

**Acceptance Criteria:**
- [ ] Dashboard loads within 3 seconds
- [ ] Sales metrics display correctly (today's sales, transaction count)
- [ ] Top products list shows correct data
- [ ] Charts render without errors
- [ ] Time period filter (today, week, month) updates data
- [ ] Outlet filter updates data (if multi-outlet)
- [ ] Data refreshes on page reload
- [ ] Loading state shows while fetching data
- [ ] Error message displays if data fetch fails

#### 3.2 Navigate Dashboard Sections
**As a** admin/merchant  
**I want to** navigate between different dashboard sections  
**So that** I can access different features

**Acceptance Criteria:**
- [ ] Navigation menu is always visible
- [ ] Menu items are based on user permissions
- [ ] Active menu item is highlighted
- [ ] Navigation is responsive on mobile
- [ ] Page transitions are smooth
- [ ] Breadcrumb shows current location

---

### 4. Transaction Management

#### 4.1 View Transaction History
**As a** admin/cashier  
**I want to** view a list of all transactions  
**So that** I can track sales and find specific transactions

**Acceptance Criteria:**
- [ ] Transaction list displays with all required fields (ID, date, amount, status)
- [ ] Pagination works correctly
- [ ] Search filters transactions by ID
- [ ] Date range filter works
- [ ] Status filter works (completed, voided)
- [ ] Column sorting works
- [ ] Loading state shows while fetching
- [ ] Empty state message shows if no transactions
- [ ] Table is responsive on mobile

#### 4.2 View Transaction Details
**As a** admin/cashier  
**I want to** view detailed information about a specific transaction  
**So that** I can see all transaction details and print receipts

**Acceptance Criteria:**
- [ ] Transaction details page loads quickly
- [ ] All transaction information displays correctly
- [ ] Items show price snapshot
- [ ] Receipt preview is accurate
- [ ] Print button works
- [ ] Void button appears only if permitted
- [ ] Back button returns to transaction list

#### 4.3 Search & Filter Transactions
**As a** admin  
**I want to** search and filter transactions  
**So that** I can find specific transactions quickly

**Acceptance Criteria:**
- [ ] Search works by transaction ID
- [ ] Date range filter works
- [ ] Status filter works
- [ ] Multiple filters can be applied together
- [ ] Results update in real-time
- [ ] Clear filters button resets all filters
- [ ] Result count shows filtered amount

---

### 5. Product Management

#### 5.1 View Product List
**As a** admin  
**I want to** view all products  
**So that** I can manage inventory

**Acceptance Criteria:**
- [ ] Product list displays with all fields (name, category, price, cost, stock, status)
- [ ] Search filters by product name
- [ ] Category filter works
- [ ] Sorting works on all columns
- [ ] Pagination works
- [ ] Loading state shows
- [ ] Empty state message shows if no products

#### 5.2 Create Product
**As a** admin  
**I want to** create a new product  
**So that** I can add items to the POS system

**Acceptance Criteria:**
- [ ] Form displays all required fields (name, category, description, price, cost, stock)
- [ ] Form validates required fields
- [ ] Price and cost must be positive numbers
- [ ] Stock must be non-negative number
- [ ] Form shows validation errors
- [ ] Save button is disabled until form is valid
- [ ] Success message displays after creation
- [ ] New product appears in list
- [ ] User can cancel and return to list

#### 5.3 Edit Product
**As a** admin  
**I want to** edit product information  
**So that** I can update prices and details

**Acceptance Criteria:**
- [ ] Form pre-fills with current product data
- [ ] All fields are editable
- [ ] Validation works same as create
- [ ] Save button shows loading state
- [ ] Success message displays
- [ ] Changes appear in product list
- [ ] User can cancel without saving

#### 5.4 Adjust Stock
**As a** admin  
**I want to** adjust product stock  
**So that** I can track inventory changes

**Acceptance Criteria:**
- [ ] Stock adjustment dialog displays current stock
- [ ] Adjustment type selector works (add/reduce)
- [ ] Quantity input validates positive numbers
- [ ] Reason field is optional
- [ ] Confirm button disabled until quantity entered
- [ ] Stock updates immediately
- [ ] Stock log entry is created
- [ ] Success message displays
- [ ] Cannot reduce stock below 0

#### 5.5 View Stock Audit Log
**As a** admin  
**I want to** view stock adjustment history  
**So that** I can track inventory changes

**Acceptance Criteria:**
- [ ] Stock log displays all entries
- [ ] Entries show correct information (date, type, quantity, reason, user)
- [ ] Date range filter works
- [ ] Sorting works
- [ ] Pagination works if many entries
- [ ] Empty state shows if no history

---

### 6. User Management

#### 6.1 View User List
**As a** admin/merchant  
**I want to** view all users  
**So that** I can manage team members

**Acceptance Criteria:**
- [ ] User list displays with all fields (name, email, role, outlet, status, last login)
- [ ] Search works by name and email
- [ ] Role filter works
- [ ] Outlet filter works
- [ ] Sorting works
- [ ] Pagination works
- [ ] Loading state shows

#### 6.2 Create User
**As a** admin/merchant  
**I want to** create a new user  
**So that** I can add team members

**Acceptance Criteria:**
- [ ] Form displays all required fields (name, email, password, role, outlet)
- [ ] Email validation works
- [ ] Password strength validation works
- [ ] Role selector shows available roles
- [ ] Outlet selector shows available outlets
- [ ] Form validates all required fields
- [ ] Save button disabled until form valid
- [ ] Success message displays
- [ ] New user appears in list
- [ ] User receives welcome email (optional)

#### 6.3 Edit User
**As a** admin/merchant  
**I want to** edit user information  
**So that** I can update team member details

**Acceptance Criteria:**
- [ ] Form pre-fills with user data
- [ ] Email field is read-only
- [ ] Password field is optional (for updates)
- [ ] Role can be changed
- [ ] Outlet assignment can be changed
- [ ] Validation works
- [ ] Success message displays
- [ ] Changes appear in user list

#### 6.4 Deactivate User
**As a** admin/merchant  
**I want to** deactivate a user  
**So that** I can remove access without deleting data

**Acceptance Criteria:**
- [ ] Deactivate button appears for active users
- [ ] Confirmation dialog shows user name
- [ ] User status changes to inactive
- [ ] Inactive user cannot login
- [ ] User can be reactivated
- [ ] Success message displays

#### 6.5 Assign Permissions
**As a** admin/merchant  
**I want to** assign permissions to users  
**So that** I can control what users can do

**Acceptance Criteria:**
- [ ] Permissions list displays all available permissions
- [ ] Current permissions are checked
- [ ] User can toggle permissions
- [ ] Save button disabled until changes made
- [ ] Success message displays
- [ ] Permissions take effect immediately

---

### 7. Reports & Analytics

#### 7.1 View Daily Report
**As a** admin/merchant  
**I want to** view daily sales reports  
**So that** I can track daily performance

**Acceptance Criteria:**
- [ ] Report loads within 3 seconds
- [ ] Date picker works
- [ ] Report shows correct data for selected date
- [ ] Charts render correctly
- [ ] Data is accurate (total sales, transaction count, top products)
- [ ] Report can be exported to PDF
- [ ] Report can be printed

#### 7.2 View Sales Analytics
**As a** admin/merchant  
**I want to** view sales analytics with charts  
**So that** I can understand sales trends

**Acceptance Criteria:**
- [ ] Charts display correctly (trend, by product, by outlet)
- [ ] Time period filter works (week, month, year)
- [ ] Outlet filter works
- [ ] Data is accurate
- [ ] Charts are interactive
- [ ] Export to CSV works
- [ ] Export to PDF works

#### 7.3 View Stock Report
**As a** admin  
**I want to** view stock levels and movement  
**So that** I can manage inventory

**Acceptance Criteria:**
- [ ] Stock levels are accurate
- [ ] Low stock items are highlighted
- [ ] Category filter works
- [ ] Sorting works
- [ ] Export works
- [ ] Report shows stock movement history

---

### 8. Offline Sync

#### 8.1 Create Transaction Offline
**As a** cashier  
**I want to** create transactions when offline  
**So that** I can continue working without internet

**Acceptance Criteria:**
- [ ] Offline mode indicator displays
- [ ] Transactions are stored locally
- [ ] Transactions show "Pending Sync" status
- [ ] User can create multiple transactions offline
- [ ] Cart functionality works offline
- [ ] Stock validation uses local data
- [ ] No error messages displayed

#### 8.2 Sync Transactions When Online
**As a** system  
**I want to** sync offline transactions when connection restored  
**So that** data is synchronized with server

**Acceptance Criteria:**
- [ ] Sync notification appears when online
- [ ] Sync button triggers sync process
- [ ] Progress indicator shows during sync
- [ ] Successful transactions are removed from queue
- [ ] Failed transactions remain in queue
- [ ] User can retry failed syncs
- [ ] Sync results are displayed
- [ ] Offline indicator clears after successful sync

#### 8.3 Handle Sync Conflicts
**As a** system  
**I want to** handle conflicts during sync  
**So that** data integrity is maintained

**Acceptance Criteria:**
- [ ] Conflicts are detected
- [ ] Server-authoritative resolution is applied
- [ ] User is notified of conflicts
- [ ] Conflict details are displayed
- [ ] User can retry sync
- [ ] User can discard transaction
- [ ] Failed transactions are logged

#### 8.4 View Sync Queue
**As a** cashier/admin  
**I want to** view the offline sync queue  
**So that** I can monitor sync status

**Acceptance Criteria:**
- [ ] Queue status displays correctly
- [ ] Pending count is accurate
- [ ] Failed count is accurate
- [ ] Queue details show transaction info
- [ ] Retry button works
- [ ] Clear queue requires confirmation
- [ ] Queue clears after confirmation

---

## Cross-Cutting Requirements

### Performance
- All pages must load within 3 seconds
- API responses must complete within 2 seconds
- Charts must render within 1 second
- Search results must appear within 500ms
- No memory leaks on page navigation

### Accessibility
- All forms must be keyboard navigable
- All buttons must have proper labels
- Color contrast must meet WCAG AA standards
- Error messages must be clear and actionable
- Loading states must be announced

### Error Handling
- All API errors must display user-friendly messages
- Network errors must be handled gracefully
- Validation errors must be specific and helpful
- Error messages must suggest corrective actions
- Errors must be logged for debugging

### Security
- JWT tokens must be stored securely
- Sensitive data must not be logged
- CSRF protection must be enabled
- XSS protection must be enabled
- User data must be merchant-scoped

### Responsive Design
- App must work on desktop (1920x1080)
- App must work on tablet (768x1024)
- App must work on mobile (375x667)
- Touch targets must be at least 44x44px
- Navigation must adapt to screen size

### Data Validation
- All inputs must be validated on client
- All inputs must be validated on server
- Invalid data must be rejected with clear messages
- Whitelist validation must be used
- Type validation must be enforced

---

## Success Metrics

- 95%+ of user flows complete successfully
- Average page load time < 2 seconds
- 99%+ API success rate
- Zero critical bugs in production
- User satisfaction score > 4.5/5
- Offline sync success rate > 98%
- Zero data loss incidents

---

## Out of Scope (MVP)

- Mobile app (web-responsive only)
- Advanced analytics
- Loyalty program integration
- Multi-language support (initially)
- Accounting export
- Tax calculations
