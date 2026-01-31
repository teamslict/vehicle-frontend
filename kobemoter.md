# KOBE MOTOR COMPREHENSIVE BUSINESS ANALYSIS
## Complete System Architecture & Feature Documentation

---

## TABLE OF CONTENTS
1. [Business Overview](#business-overview)
2. [Core Business Model](#core-business-model)
3. [User Types & Roles](#user-types--roles)
4. [Vehicle Inventory System](#vehicle-inventory-system)
5. [Auction System](#auction-system)
6. [Stock Purchase System](#stock-purchase-system)
7. [Payment System](#payment-system)
8. [Shipping & Logistics](#shipping--logistics)
9. [Customer Portal Features](#customer-portal-features)
10. [Employee/Internal ERP Modules](#employeeinternal-erp-modules)
11. [Technical Features](#technical-features)
12. [Database Schema Overview](#database-schema-overview)

---

## 1. BUSINESS OVERVIEW

### Company Profile
- **Name**: Kobe Motor Company
- **Founded**: 1997
- **Location**: Shin-Yokohama, Japan (near Yokohama Port)
- **Business Type**: Used & New Japanese vehicle exporter
- **Market**: 40+ countries across 5 continents
- **Stock**: 75,000+ vehicles (10,000+ own stock + partners)
- **Monthly Export**: 2,000+ vehicles
- **Staff**: Multilingual team from 12+ countries

### Key Credentials
- Ranked #1 buyer on Aucnet for 3 consecutive years (2016-2018, 2023)
- Member of Yokohama Chamber of Commerce, JUMVEA, SLAAJ
- 8 overseas offices (Kenya, Mauritius, Sri Lanka, Tanzania, Bangladesh, Philippines, Pakistan, Singapore, Trinidad)
- Award: "Best Buyer" by Aucnet

---

## 2. CORE BUSINESS MODEL

### Revenue Streams

#### A. Stock Sales (Direct Inventory)
- **Own Stock**: 10,000+ vehicles in physical inventory
- **Partner Stock**: 65,000+ vehicles from partners
- **Exclusive Stock**: Special inventory only available at Kobe Motor
- **New Arrivals**: Recently added vehicles
- **Clearance Sales**: Discounted vehicles (up to 43% off)

#### B. Auction Services
- Access to 100,000+ vehicles in Japanese car auctions
- Act as intermediary/agent for customers
- Customers bid through Kobe Motor platform
- Kobe Motor bids on behalf of customers at live auctions

#### C. Brand New Vehicles
- Order fresh vehicles from manufacturers
- Custom orders based on customer specifications

#### D. Request for Vehicle Service
- Customer specifies requirements
- Kobe Motor sources vehicle matching criteria
- Personalized vehicle hunting service

#### E. Value-Added Services
- Marine insurance
- Vehicle inspection
- Kobe Powertrain Warranty (3-year hybrid battery warranty + 2 year/100,000km service)
- Documentation assistance
- Shipping arrangements
- 16 service centers in Sri Lanka

---

## 3. USER TYPES & ROLES

### Customer Types

#### 1. Individual Buyers
- End consumers purchasing for personal use
- Access to all buying methods
- Can create wishlists, favorites
- Get notifications for specific vehicles

#### 2. Dealer/Business Accounts
- Professional car dealers/resellers
- Volume purchases
- Potential for special pricing
- Access to exclusive stocks

### Employee Roles (Internal ERP)

#### 1. Sales Managers
- Assigned to customer accounts
- Handle inquiries and negotiations
- Process proforma invoices
- Multi-lingual support (12+ languages)

#### 2. Auction Agents
- Monitor auction schedules
- Place bids on behalf of customers
- Track auction results
- Send notifications to customers

#### 3. Procurement Team
- Source vehicles from auctions
- Manage relationships with auction houses
- Purchase vehicles for stock
- Quality control and inspection

#### 4. Inventory Managers
- Manage 75,000+ vehicle database
- Update stock availability
- Mark vehicles as sold/reserved
- Track vehicle locations (yard management)

#### 5. Shipping Coordinators
- Arrange vessel bookings
- Track shipment schedules
- Coordinate with ports
- Manage documentation for customs

#### 6. Finance/Accounts Team
- Process payments
- Issue invoices
- Track deposits and refunds
- Manage bank transfers and PayPal
- Currency conversion (JPY/USD)

#### 7. Customer Support
- Handle pre-sale inquiries
- Post-sale support
- Complaint resolution
- Multi-channel support (WhatsApp, Email, Phone)

#### 8. Documentation Team
- Prepare export documents
- Courier documents to customers
- Manage customs paperwork
- Certificate of origin, BL, etc.

#### 9. Marketing Team
- Manage website content
- Social media (Facebook, Instagram, YouTube)
- Promotional campaigns (clearance sales, banners)
- Email marketing

#### 10. System Administrators
- Manage customer portal
- Update vehicle listings
- Maintain auction integration
- Handle technical issues

---

## 4. VEHICLE INVENTORY SYSTEM

### Vehicle Data Structure

#### Basic Information
```
- Vehicle ID (unique identifier)
- Stock Number
- Make (Toyota, Nissan, Honda, etc.)
- Model (Harrier, Corolla, etc.)
- Year (1950-2026)
- Mileage
- Engine CC
- Fuel Type (Gasoline, Diesel, Hybrid, EV, PHEV, LPG, etc.)
- Transmission (Automatic, Manual)
- Steering (LHD, RHD)
- Drive Type (2WD, 4WD, AWD)
- Color (Exterior)
- Interior Color
- Doors
- Seats
```

#### Body Types
- Sedan
- Hatchback
- SUV
- Minivan
- Van
- Truck
- Bus
- Wagon
- Coupe
- Hardtop
- Machinery
- Concrete Pump

#### Pricing Information
```
- Base Price (JPY)
- Discount (if applicable)
- Original Price (for clearance items)
- Discount Percentage
- FOB Price (Free on Board)
- C&F Price (Cost and Freight) - varies by destination
- Final Price (with optional add-ons)
```

#### Vehicle Condition
```
- Auction Grade (for auction vehicles)
- Condition Rating
- Inspection Report
- Damage Report (if any)
- Auction Sheet (Japanese)
- Photos (multiple angles)
- Video (if available)
```

#### Status Tracking
```
- Available
- Reserved
- Sold
- In Transit
- Delivered
- Stock Location (Yokohama yard, partner yard, etc.)
```

#### Additional Options
```
- Marine Insurance (Yes/No)
- Vehicle Inspection (Yes/No)
- Kobe Warranty (Yes/No)
```

### Search & Filter System

#### Search Capabilities
- Keyword search (make, model, color, features)
- Advanced filters:
  - Make
  - Model
  - Year range (Min/Max)
  - Price range (multiple brackets)
  - Body type
  - Fuel type
  - Steering side
  - Engine CC range
  - Transmission type
  - Stock sale filter (clearance)
  - Vendor stock (exclusive)

#### Sorting Options
- Price: Low to High
- Price: High to Low
- Year: Newest First
- Year: Oldest First
- Mileage: Low to High
- Recently Added

#### Country-Specific Stock
- Filter vehicles suitable for specific countries
- Based on import regulations
- Pre-calculated C&F prices per destination
- 160+ destination countries

### Vehicle Listing Features

#### Display Information
- Thumbnail grid view
- List view
- Detailed vehicle page
- Image gallery (multiple photos)
- Vehicle specifications table
- Similar vehicles suggestions
- "Notify Me" button
- "Add to Favorites" button
- "Inquiry" button

---

## 5. AUCTION SYSTEM

### Auction Access
- 100,000+ vehicles available
- 120+ auction houses across Japan
- Major auctions: USS, TAA, CAA, HAA Kobe, Aucnet, JU auctions, etc.
- Daily auctions (multiple lanes, 8-12 hour sessions)

### Auction Process Flow

#### Step 1: Customer Registration
```
- Create account on Kobe Motor website
- Provide personal/business information
- Select country
- Account verification
```

#### Step 2: Security Deposit
```
- Minimum: USD 1,000
- Purpose: Activate bidding account
- Refundable if no successful bid
- Can be used for future bids with consent
- Payment methods: Bank transfer, PayPal
```

#### Step 3: Browse Auction Inventory
```
- Access to live auction listings
- View auction sheets (translated)
- Vehicle condition grading
- Auction schedule (date, time, location)
- Starting price
- Estimated market value
```

#### Step 4: Auction Sheet Information
```
- Vehicle history
- Condition grade (numerical scale)
- Interior rating
- Exterior rating
- Damage map/diagram
- Equipment list
- Previous auction history
- Mileage verification
- Modification notes
```

#### Step 5: Place Proxy Bid
```
- Customer sets maximum bid on portal
- Bid amount in JPY
- Select vehicle
- Confirm bid
- System records proxy bid
```

#### Step 6: Live Auction
```
- Kobe Motor agents attend physical auction
- Bid on behalf of customer using proprietary systems
- Auction duration: 10-40 seconds per vehicle
- Multiple lanes running simultaneously
- Computer-based bidding (joystick/mouse)
```

#### Step 7: Auction Result Notification
```
- Email notification (immediately after auction)
- Portal notification
- Result status:
  - Won: Successful bid
  - Lost: Outbid by another buyer
  - Not Sold: Reserve price not met
- Winning price displayed
```

#### Step 8: Invoice Generation
```
- If won:
  - Winning bid price
  - Auction commission fee
  - FOB charges
  - Optional services (insurance, inspection, warranty)
  - C&F to destination
  - Total amount
- PDF invoice via email
```

#### Step 9: Payment
```
- Payment deadline (typically 3-7 days)
- Full payment required
- Include invoice number in reference
- Deposit adjusts against total
```

#### Step 10: Post-Auction Process
```
- Vehicle pickup from auction
- Transport to Kobe Motor yard
- Final inspection
- Preparation for shipping
- Documentation
- Loading on vessel
```

### Auction Sheet Guide
- Grading system explanation
- Interior codes
- Exterior codes
- Damage notation system
- Equipment codes
- How to read Japanese characters
- Color codes
- Transmission codes

---

## 6. STOCK PURCHASE SYSTEM

### Stock Purchase Flow

#### Step 1: Browse Stock
```
- View 75,000+ vehicles
- Use filters and search
- View vehicle details
- Check photos and specifications
```

#### Step 2: Inquiry
```
- Click "Inquiry" button on vehicle page
- Fill inquiry form:
  - Name
  - Email
  - Phone/WhatsApp
  - Country
  - Port/City
  - Marine Insurance preference
  - Vehicle Inspection preference
  - Kobe Warranty preference
  - Additional comments/questions
- Submit inquiry
```

#### Step 3: Sales Manager Contact
```
- Assigned sales manager contacts customer
- Via email/WhatsApp/phone
- Discusses requirements
- Answers questions
- Negotiates price (if applicable)
- Confirms availability
```

#### Step 4: Price Finalization
```
- Base vehicle price
- Add-ons (insurance, inspection, warranty)
- Shipping to destination port (C&F)
- Customs/import duties (informational)
- Total price agreement
```

#### Step 5: Proforma Invoice
```
- Detailed breakdown:
  - Vehicle information
  - Chassis number
  - Engine number
  - FOB price
  - Freight charges
  - Insurance (if selected)
  - Inspection (if selected)
  - Warranty (if selected)
  - Total amount
- Bank details for payment
- Payment deadline
- Invoice number
- Sales manager contact
```

#### Step 6: Payment
```
- Bank wire transfer (primary)
- PayPal (available upon request)
- Must include invoice number
- Payment confirmation sent to Kobe Motor
```

#### Step 7: Vehicle Preparation
```
- Final inspection
- Cleaning
- Minor repairs (if needed)
- Documentation preparation
- Photos before loading
```

#### Step 8: Shipping Arrangement
```
- Book vessel space
- Vessel name and schedule
- ETD (Estimated Time of Departure)
- ETA (Estimated Time of Arrival)
- Container or RoRo shipping
- Notify customer of vessel details
```

#### Step 9: Documentation
```
- Bill of Lading (BL)
- Export certificate
- Invoice
- Packing list
- Certificate of origin
- Inspection certificate (if opted)
- Warranty documents (if opted)
- Deregistration certificate
- Courier documents to customer (when fully paid)
```

#### Step 10: Customer Clearance
```
- Documents arrive at customer
- Customer submits to customs agent
- Pay import duties/taxes
- Clear vehicle from port
- Vehicle delivered to customer
```

---

## 7. PAYMENT SYSTEM

### Payment Methods

#### 1. Bank Wire Transfer
```
Primary Method
- Bank details on website (/our-bank)
- Multiple currency accounts
- Banks in Japan
- SWIFT transfers
- Reference: Invoice number mandatory
```

#### 2. PayPal
```
Upon Request
- Customer requests PayPal invoice
- Sales manager generates PayPal invoice
- Customer pays via PayPal
- Higher fees may apply
```

### Payment Tracking (ERP)
```
- Payment received date
- Amount received
- Currency
- Exchange rate (if applicable)
- Invoice number reference
- Customer ID
- Payment method
- Bank transaction reference
- Outstanding balance
- Payment status:
  - Pending
  - Partial
  - Completed
  - Overdue
```

### Security Deposit Management
```
- Initial deposit amount
- Date received
- Customer ID
- Auction ID (if applicable)
- Status:
  - Active (available for bidding)
  - Applied (used for purchase)
  - Refunded
  - Pending refund
- Refund details (if applicable)
```

### Invoice System
```
- Invoice number (unique)
- Date issued
- Customer details
- Vehicle details
- Itemized charges
- Subtotals
- Grand total
- Payment terms
- Due date
- Bank details
- Sales manager signature
- Company stamp
- PDF generation
- Email delivery
- Portal access
```

---

## 8. SHIPPING & LOGISTICS

### Shipping Methods

#### 1. RoRo (Roll-on/Roll-off)
```
- Cars driven onto vessel
- Lower cost
- Suitable for running vehicles
- Longer transit time
- Weather exposure
```

#### 2. Container Shipping
```
- Vehicle(s) loaded in 20ft or 40ft container
- Higher cost
- Better protection
- Can ship non-running vehicles
- Can consolidate with other cargo
```

### Shipping Destinations
- 40+ primary countries
- 160+ total destinations
- Major routes:
  - East Africa (Kenya, Tanzania, Uganda)
  - Southern Africa (South Africa, Zimbabwe, Mozambique)
  - Caribbean (Jamaica, Trinidad, Barbados)
  - South Asia (Sri Lanka, Bangladesh, Pakistan)
  - Southeast Asia (Philippines, Singapore, Myanmar)
  - Middle East (UAE, Yemen, Oman)
  - Oceania (Fiji, Papua New Guinea)
  - South America (Guyana, Suriname)

### Port Management
- Multiple destination ports per country
- Port-specific C&F pricing
- Port congestion tracking
- Vessel schedule management
- Container availability

### Vessel Tracking
```
- Vessel name
- Voyage number
- Departure date (ETD)
- Arrival date (ETA)
- Current location
- Port of loading (Yokohama, Tokyo, Nagoya)
- Port of discharge
- Vessel schedule updates
- Email notifications to customers
```

### Document Preparation Timeline
```
- Pre-shipment: Prepare export docs
- On shipment: Generate BL
- Post-shipment: Courier documents
- Requirement: Zero balance payment
```

---

## 9. CUSTOMER PORTAL FEATURES

### Account Management

#### Registration
```
- Free account creation
- Account types:
  - Individual
  - Dealer
- Required information:
  - Name
  - Email
  - Password
  - Country
  - Phone
  - Address
  - ID verification (for dealers)
```

#### Dashboard
```
- Account summary
- Recent activity
- Active bids
- Won auctions
- Purchased vehicles
- Saved vehicles
- Notifications
- Messages
- Documents
```

### Key Features

#### 1. Favorites/Wishlist
```
- Save vehicles for later
- Organize by categories
- Price drop notifications
- Availability alerts
```

#### 2. Notify Me
```
- Set alerts for specific:
  - Make and model
  - Price range
  - Year range
  - Body type
  - Country availability
- Email notifications when match found
```

#### 3. Inquiry System
```
- Submit inquiries on vehicles
- Track inquiry status
- View responses from sales managers
- Inquiry history
```

#### 4. Auction Access
```
- Browse auction inventory
- View auction sheets
- Place proxy bids
- View bid history
- Auction results
- Won vehicles
```

#### 5. Order Tracking
```
- View all orders
- Order status:
  - Pending payment
  - Payment received
  - In preparation
  - Ready to ship
  - Shipped
  - In transit
  - Delivered
- Vessel information
- Document status
- Tracking updates
```

#### 6. Document Center
```
- View invoices
- Download invoices (PDF)
- View shipping documents
- BL copies
- Certificates
- Warranty documents
```

#### 7. Payment Portal
```
- Pay online (for PayPal)
- View payment history
- View outstanding balance
- Download payment receipts
```

#### 8. Communication
```
- Direct messaging with sales manager
- WhatsApp integration
- Email notifications
- Phone support
```

---

## 10. EMPLOYEE/INTERNAL ERP MODULES

### Sales Module

#### Lead Management
```
- New inquiry tracking
- Lead assignment (by country/language)
- Lead status:
  - New
  - Contacted
  - Negotiating
  - Quote sent
  - Won
  - Lost
- Follow-up reminders
- Lead source tracking
```

#### Customer Relationship Management (CRM)
```
- Customer database
- Purchase history
- Communication history
- Preferred payment methods
- Language preference
- Country/port
- Notes and tags
- Customer rating/feedback
```

#### Quote/Invoice Generation
```
- Create proforma invoice
- Template-based
- Auto-calculation:
  - Vehicle price
  - Freight (based on destination)
  - Insurance percentage
  - Inspection fees
  - Warranty fees
  - Currency conversion
- Email to customer
- Save to customer file
- Payment tracking
```

### Auction Module

#### Auction Calendar
```
- Auction house schedules
- Daily auction list import
- Auction start times (by lane)
- Auction house locations
- Holidays and closures
```

#### Bid Management
```
- View customer proxy bids
- Bidding queue (by date/time)
- Assign agents to auctions
- Live bidding interface
- Bid result entry
- Win/loss ratio tracking
- Customer notification triggers
```

#### Auction House Integration
```
- Import auction sheets
- Translate auction sheets
- Auction grading system
- Calculate estimated costs
- Historical price data
- Auction house accounts management
```

### Inventory Module

#### Stock Management
```
- Add new vehicle
- Edit vehicle details
- Bulk upload (CSV/Excel)
- Photo management (multiple photos per vehicle)
- Video uploads
- Stock location tracking
- Yard management
- Reserve/unreserve vehicles
- Mark as sold
- Delete/archive vehicles
```

#### Partner Stock Integration
```
- API connections to partner databases
- Sync inventory
- Price synchronization
- Availability checking
- Partner commission tracking
```

#### Vehicle Inspection
```
- Inspection checklist
- Photo documentation
- Damage reports
- Grade assignment
- Inspection history
- Inspector assignment
```

### Procurement Module

#### Auction Purchases
```
- Won auction tracking
- Purchase invoice processing
- Payment to auction houses
- Vehicle pickup scheduling
- Transport to yard
- Cost tracking (all-in cost)
```

#### Stock Planning
```
- Inventory analysis
- Popular models tracking
- Stock aging reports
- Reorder recommendations
- Budget allocation
- ROI tracking
```

### Logistics Module

#### Shipping Scheduler
```
- Vessel bookings
- Container allocations
- Load planning
- Vehicle assignment to vessels
- ETD/ETA tracking
- Port charges
```

#### Document Management
```
- Export doc generation
- BL processing
- Certificate generation
- Document scanning
- Document tracking
- Courier tracking
```

#### Port Operations
```
- Yard to port transport
- Loading schedule
- Port charges
- Container stuffing reports
- Final inspection before loading
```

### Finance Module

#### Accounts Receivable
```
- Invoice tracking
- Payment matching
- Outstanding payments report
- Aging analysis
- Payment reminders
- Receipt generation
```

#### Accounts Payable
```
- Auction house payments
- Vendor payments
- Freight payments
- Port charges
- Operating expenses
- Payment scheduling
```

#### Bank Reconciliation
```
- Bank statement import
- Auto-matching with invoices
- Currency conversion
- Exchange rate tracking
- Bank balance monitoring
```

#### Financial Reports
```
- Sales reports (daily/monthly/yearly)
- Revenue by country
- Revenue by vehicle type
- Profit margin analysis
- Commission reports
- Expense tracking
- Cash flow statements
```

### Customer Service Module

#### Ticket System
```
- Customer inquiry tracking
- Complaint management
- Ticket assignment
- Priority levels
- Status tracking
- Resolution tracking
- Response time monitoring
```

#### Knowledge Base
```
- FAQ management
- How-to guides
- Video tutorials
- Document templates
```

### Marketing Module

#### Website Content Management
```
- Banner management
- Promotional campaigns
- Blog posts
- Featured vehicles
- Clearance sales
- New arrivals highlighting
```

#### Email Marketing
```
- Newsletter creation
- Customer segmentation
- Email templates
- Campaign scheduling
- Open/click tracking
```

#### Social Media Management
```
- Post scheduling
- Content calendar
- Engagement tracking
- Customer inquiries from social
```

### Reports & Analytics

#### Sales Analytics
```
- Sales by country
- Sales by vehicle type
- Sales by price range
- Sales trends (monthly/yearly)
- Top-selling models
- Average sale price
- Conversion rates
```

#### Inventory Analytics
```
- Stock turnover rate
- Aging inventory
- Stock value
- Popular vs. slow-moving
- Stock by location
```

#### Customer Analytics
```
- New vs. returning customers
- Customer acquisition cost
- Customer lifetime value
- Geographical distribution
- Preferred payment methods
```

#### Auction Performance
```
- Win rate
- Average winning price
- Most active auction houses
- Auction ROI
- Commission earned
```

---

## 11. TECHNICAL FEATURES

### Website Features

#### Multi-language Support
```
- English
- French
- Russian
- Spanish
- Japanese
- (12+ languages through staff)
```

#### Multi-currency Support
```
- Japanese Yen (JPY)
- US Dollar (USD)
- Real-time conversion
- Display prices in customer's preferred currency
```

#### Responsive Design
```
- Mobile-friendly
- Tablet optimization
- Desktop version
- Touch-friendly interface
```

#### Search Engine Optimization
```
- SEO-friendly URLs
- Meta tags
- Sitemap
- Rich snippets
- Schema markup
```

### Security Features

#### User Authentication
```
- Secure login
- Password encryption
- Session management
- Remember me functionality
- Password reset
- Email verification
```

#### Data Protection
```
- SSL/HTTPS
- Data encryption
- GDPR compliance
- Privacy policy
- Terms and conditions
- Cookie consent
```

#### Anti-fraud Measures
```
- Email verification
- Phone verification
- Payment verification
- Suspicious activity monitoring
- Warning notice (phishing prevention)
```

### Performance Features

#### Caching
```
- Browser caching
- Server-side caching
- Image optimization
- CDN for images
```

#### Database Optimization
```
- Indexed searches
- Query optimization
- Database sharding (for large inventory)
```

### Integration Features

#### Third-party Integrations
```
- Google Analytics
- Facebook Pixel
- DoubleClick
- Bullhorn
- Payment gateways
- Email service (SMTP)
- SMS gateway
- WhatsApp Business API
```

#### API Features
```
- RESTful API for partner integration
- Inventory sync API
- Order status API
- Tracking API
```

---

## 12. DATABASE SCHEMA OVERVIEW

### Core Tables

#### Users Table
```sql
- user_id (PK)
- email
- password_hash
- user_type (individual/dealer)
- first_name
- last_name
- country
- phone
- whatsapp
- address
- city
- postal_code
- language_preference
- currency_preference
- email_verified
- phone_verified
- status (active/inactive/suspended)
- created_at
- last_login
```

#### Vehicles Table
```sql
- vehicle_id (PK)
- stock_number
- make_id (FK)
- model_id (FK)
- year
- mileage
- mileage_unit (km/miles)
- engine_cc
- fuel_type
- transmission
- drive_type
- steering
- body_type
- color_exterior
- color_interior
- doors
- seats
- price_jpy
- price_usd
- discount_percentage
- original_price
- status (available/reserved/sold)
- location (yard location)
- stock_type (own/partner/exclusive)
- is_clearance (boolean)
- is_new_arrival (boolean)
- condition_grade
- auction_grade
- description
- features (JSON)
- created_at
- updated_at
- sold_at
```

#### Vehicle Images Table
```sql
- image_id (PK)
- vehicle_id (FK)
- image_url
- image_order
- is_primary (boolean)
- uploaded_at
```

#### Makes Table
```sql
- make_id (PK)
- make_name
- logo_url
- display_order
```

#### Models Table
```sql
- model_id (PK)
- make_id (FK)
- model_name
```

#### Auction Vehicles Table
```sql
- auction_vehicle_id (PK)
- auction_house
- auction_date
- auction_time
- lot_number
- make
- model
- year
- auction_grade
- starting_price
- estimated_price
- auction_sheet_url
- status (upcoming/live/completed)
- result (sold/unsold)
- winning_price
- created_at
```

#### Bids Table
```sql
- bid_id (PK)
- user_id (FK)
- auction_vehicle_id (FK)
- max_bid_amount
- bid_date
- auction_result (won/lost/unsold)
- actual_price_paid
- status (pending/active/completed/cancelled)
- agent_id (FK - employee who bid)
- created_at
```

#### Orders Table
```sql
- order_id (PK)
- user_id (FK)
- order_type (stock/auction/request)
- vehicle_id (FK - if stock)
- bid_id (FK - if auction)
- order_date
- status (pending_payment/paid/preparing/shipped/delivered)
- total_amount_jpy
- total_amount_usd
- payment_status
- invoice_number
- sales_manager_id (FK)
- destination_country
- destination_port
- marine_insurance (boolean)
- vehicle_inspection (boolean)
- warranty (boolean)
- created_at
- updated_at
```

#### Invoices Table
```sql
- invoice_id (PK)
- order_id (FK)
- invoice_number
- invoice_date
- due_date
- vehicle_price
- freight_charges
- insurance_charges
- inspection_charges
- warranty_charges
- total_amount
- currency
- status (draft/sent/paid/overdue/cancelled)
- pdf_url
- created_at
```

#### Payments Table
```sql
- payment_id (PK)
- order_id (FK)
- invoice_id (FK)
- payment_date
- amount
- currency
- exchange_rate
- payment_method
- transaction_reference
- bank_name
- status (pending/confirmed/failed)
- notes
- created_at
```

#### Security Deposits Table
```sql
- deposit_id (PK)
- user_id (FK)
- amount
- currency
- deposit_date
- status (active/applied/refunded/pending_refund)
- applied_to_order_id (FK - nullable)
- refund_date
- refund_reference
- created_at
```

#### Shipments Table
```sql
- shipment_id (PK)
- order_id (FK)
- vessel_name
- voyage_number
- loading_port
- discharge_port
- etd (estimated time of departure)
- eta (estimated time of arrival)
- actual_departure
- actual_arrival
- shipping_method (roro/container)
- container_number
- bl_number
- status (booked/loaded/in_transit/arrived/cleared)
- created_at
- updated_at
```

#### Documents Table
```sql
- document_id (PK)
- order_id (FK)
- document_type (invoice/bl/certificate/warranty/etc)
- document_name
- file_url
- upload_date
- courier_tracking (if applicable)
- received_by_customer (boolean)
- created_at
```

#### Inquiries Table
```sql
- inquiry_id (PK)
- user_id (FK - nullable if guest)
- vehicle_id (FK - nullable)
- name
- email
- phone
- country
- message
- inquiry_date
- status (new/contacted/quoted/won/lost)
- assigned_to (FK - employee)
- response
- created_at
- updated_at
```

#### Favorites Table
```sql
- favorite_id (PK)
- user_id (FK)
- vehicle_id (FK)
- created_at
```

#### Notifications Table
```sql
- notification_id (PK)
- user_id (FK)
- notification_type
- subject
- message
- is_read (boolean)
- created_at
- read_at
```

#### Notification Preferences Table
```sql
- preference_id (PK)
- user_id (FK)
- make_id (FK - nullable)
- model_id (FK - nullable)
- min_year
- max_year
- min_price
- max_price
- body_type
- fuel_type
- country
- created_at
```

#### Employees Table
```sql
- employee_id (PK)
- email
- password_hash
- first_name
- last_name
- role (sales/auction_agent/procurement/logistics/finance/support/admin)
- department
- languages (JSON array)
- countries_assigned (JSON array)
- phone
- whatsapp
- status (active/inactive)
- created_at
```

#### Countries Table
```sql
- country_id (PK)
- country_name
- country_code
- flag_url
- currency
- ports (JSON array)
- freight_rates (JSON)
- import_regulations (text)
- is_active (boolean)
```

#### Freight Rates Table
```sql
- freight_id (PK)
- origin_port
- destination_port
- vehicle_type
- rate_jpy
- rate_usd
- effective_from
- effective_to
```

#### Pricing Rules Table
```sql
- rule_id (PK)
- country_id (FK)
- service_type (insurance/inspection/warranty)
- calculation_method (percentage/fixed)
- value
- effective_from
- effective_to
```

#### Auction Houses Table
```sql
- auction_house_id (PK)
- name
- location
- auction_days (JSON - days of week)
- commission_rate
- account_number
- contact_person
- phone
- email
- notes
```

#### Customer Support Tickets Table
```sql
- ticket_id (PK)
- user_id (FK)
- subject
- message
- priority (low/medium/high/urgent)
- status (open/in_progress/resolved/closed)
- assigned_to (FK - employee)
- created_at
- updated_at
- resolved_at
```

#### Activity Log Table
```sql
- log_id (PK)
- user_id (FK - nullable)
- employee_id (FK - nullable)
- action_type
- description
- ip_address
- user_agent
- created_at
```

---

## KEY BUSINESS PROCESSES WORKFLOW

### Process 1: Stock Purchase Journey
```
1. Customer browses website
2. Applies filters (make, model, price, etc.)
3. Views vehicle details
4. Clicks "Inquiry" button
5. Fills inquiry form
6. [ERP] System creates inquiry record
7. [ERP] Assigns to sales manager (based on country/language)
8. [ERP] Sends email notification to sales manager
9. Sales manager contacts customer (WhatsApp/Email/Phone)
10. Negotiates price
11. [ERP] Creates proforma invoice
12. [ERP] Sends invoice via email
13. Customer receives invoice
14. Customer makes payment (bank/PayPal)
15. [ERP] Finance team confirms payment
16. [ERP] Marks order as paid
17. [ERP] Logistics team prepares vehicle
18. [ERP] Books vessel
19. [ERP] Prepares documents
20. [ERP] Ships vehicle
21. [ERP] Sends shipping notification to customer
22. [ERP] Couriers documents
23. Customer clears from port
24. [ERP] Marks order as delivered
25. [ERP] Requests customer feedback
```

### Process 2: Auction Bidding Journey
```
1. Customer registers on website
2. Makes security deposit (USD 1,000)
3. [ERP] Finance confirms deposit
4. [ERP] Activates bidding account
5. Customer browses auction inventory
6. Views auction sheets
7. Selects vehicle
8. Enters maximum bid
9. [ERP] Records proxy bid
10. [ERP] Assigns auction agent
11. Auction day: Agent attends auction
12. Agent bids using proprietary system
13. Auction completes (10-40 seconds)
14. [ERP] Agent enters result
15. [ERP] System sends email notification
16. If won:
    - [ERP] Generates invoice (bid + commission + freight)
    - Customer pays
    - [ERP] Picks up vehicle from auction
    - [ERP] Transports to yard
    - [ERP] Final inspection
    - [Same as stock purchase from step 18]
17. If lost:
    - Customer can bid on another vehicle
    - Or request deposit refund
```

### Process 3: Request for Vehicle
```
1. Customer submits request form
2. Specifies requirements (make, model, year, budget, features)
3. [ERP] Sales manager receives request
4. [ERP] Searches inventory (stock + auction + partners)
5. [ERP] Finds matching vehicles
6. Sends options to customer with photos/specs/prices
7. Customer selects preferred vehicle
8. [ERP] Secures vehicle (reserve from stock OR bid in auction)
9. [Continues as stock purchase OR auction process]
```

---

## ADDITIONAL FEATURES TO IMPLEMENT

### Customer-Facing

1. **Comparison Tool**
   - Compare up to 4 vehicles side-by-side
   - Specifications comparison
   - Price comparison
   - Feature comparison

2. **Loan Calculator**
   - Calculate monthly payments
   - Interest rates by country
   - Down payment options

3. **Import Cost Calculator**
   - Estimate import duties by country
   - Total landed cost calculation
   - Tax calculations

4. **Saved Searches**
   - Save search criteria
   - Auto-notify when matching vehicles added

5. **Vehicle History Report**
   - Previous auction history
   - Accident reports
   - Service records (if available)

6. **Video Tours**
   - 360-degree videos
   - Walk-around videos
   - Engine sound recordings

7. **Live Chat Support**
   - Real-time chat with sales managers
   - Multi-language support
   - File sharing capability

8. **Mobile App**
   - iOS and Android apps
   - Push notifications
   - Offline browsing
   - Quick inquiry

9. **Refer-a-Friend Program**
   - Referral tracking
   - Reward points
   - Discount codes

10. **Customer Reviews**
    - Vehicle reviews
    - Service reviews
    - Photo uploads by customers
    - Rating system

### Internal ERP

1. **AI-Powered Features**
   - Price prediction (market value estimation)
   - Demand forecasting
   - Automated vehicle matching
   - Chatbot for common queries

2. **Advanced Analytics**
   - Predictive analytics
   - Customer segmentation
   - Churn prediction
   - Lifetime value calculation

3. **Automated Workflows**
   - Auto-assignment of inquiries
   - Auto-generation of documents
   - Auto-reminders for follow-ups
   - Auto-currency conversion

4. **Mobile ERP App**
   - Field operations (vehicle inspection)
   - Photo uploads from yard
   - Real-time updates
   - Offline capability

5. **Vendor Portal**
   - Partner access to submit inventory
   - Commission tracking
   - Payment tracking
   - Performance reports

6. **Warranty Management System**
   - Warranty claim processing
   - Service center management
   - Warranty expiry tracking
   - Claim history

7. **Auction Integration**
   - API integration with auction houses
   - Auto-import of auction sheets
   - Auto-translation (Japanese to English)
   - Real-time bidding interface

8. **Document OCR**
   - Scan auction sheets
   - Extract data automatically
   - Reduce manual entry

9. **WhatsApp Integration**
   - WhatsApp Business API
   - Automated messages
   - Order updates via WhatsApp
   - Support ticket creation

10. **Quality Control System**
    - Pre-shipment inspection checklist
    - Photo documentation
    - Approval workflow
    - Discrepancy reporting

---

## TECHNOLOGY STACK RECOMMENDATIONS

### Frontend
```
- Framework: React.js or Next.js
- UI Library: Material-UI or Ant Design
- State Management: Redux or Context API
- Mobile: React Native
```

### Backend
```
- Framework: Node.js (Express) or Python (Django/FastAPI)
- API: RESTful + GraphQL (optional)
- Real-time: Socket.io or WebSockets
```

### Database
```
- Primary: PostgreSQL or MySQL
- Cache: Redis
- Search: Elasticsearch (for vehicle search)
- Document Storage: MongoDB (for logs, messages)
```

### File Storage
```
- Cloud Storage: AWS S3 or Google Cloud Storage
- CDN: CloudFlare or AWS CloudFront
```

### Payment
```
- PayPal SDK
- Bank integration API
- Currency converter API
```

### Communication
```
- Email: SendGrid or Amazon SES
- SMS: Twilio
- WhatsApp: WhatsApp Business API
```

### Authentication
```
- JWT tokens
- OAuth 2.0 (for social login)
- 2FA (optional)
```

### Deployment
```
- Containerization: Docker
- Orchestration: Kubernetes
- Cloud: AWS or Google Cloud
- CI/CD: GitHub Actions or GitLab CI
```

### Monitoring
```
- Error Tracking: Sentry
- Analytics: Google Analytics, Mixpanel
- Performance: New Relic or DataDog
- Logging: ELK Stack
```

---

## SECURITY CONSIDERATIONS

1. **Data Encryption**
   - Encrypt sensitive data at rest
   - Use HTTPS for all communications
   - Encrypt passwords (bcrypt)

2. **Access Control**
   - Role-based access control (RBAC)
   - Principle of least privilege
   - Session management

3. **Payment Security**
   - PCI DSS compliance
   - Secure payment gateway
   - Fraud detection

4. **Regular Audits**
   - Security audits
   - Code reviews
   - Penetration testing

5. **Backup & Recovery**
   - Daily database backups
   - Disaster recovery plan
   - Data redundancy

6. **GDPR Compliance**
   - Data privacy controls
   - Right to be forgotten
   - Data export functionality

---

## SCALABILITY CONSIDERATIONS

1. **Database Sharding**
   - Shard by country or region
   - Separate read/write databases

2. **Caching Strategy**
   - Cache frequently accessed data
   - Use CDN for images
   - Redis for session storage

3. **Load Balancing**
   - Distribute traffic across servers
   - Auto-scaling based on demand

4. **Microservices Architecture**
   - Separate services for:
     - User management
     - Vehicle inventory
     - Auction system
     - Payment processing
     - Shipping & logistics
     - Notification service

5. **Queue System**
   - Use message queues (RabbitMQ, Kafka)
   - For background jobs:
     - Email sending
     - PDF generation
     - Image processing
     - Data sync

---

## PERFORMANCE OPTIMIZATION

1. **Database Indexing**
   - Index frequently searched fields
   - Composite indexes for complex queries

2. **Image Optimization**
   - Compress images
   - Use WebP format
   - Lazy loading
   - Responsive images

3. **Code Optimization**
   - Minify CSS/JS
   - Code splitting
   - Tree shaking

4. **Server-Side Rendering**
   - For SEO-critical pages
   - Use Next.js for SSR

---

## PROJECT PHASES

### Phase 1: Core Website (3-4 months)
- User registration/login
- Vehicle listing and search
- Vehicle detail pages
- Inquiry system
- Basic CMS

### Phase 2: E-commerce (2-3 months)
- Shopping cart (though single-item)
- Invoice generation
- Payment integration
- Order tracking

### Phase 3: Auction System (3-4 months)
- Auction inventory
- Bidding system
- Auction sheet display
- Auction result notification

### Phase 4: Internal ERP - Sales & Finance (3-4 months)
- CRM
- Lead management
- Invoice system
- Payment tracking
- Financial reports

### Phase 5: Internal ERP - Logistics (2-3 months)
- Inventory management
- Shipping system
- Document management
- Vessel tracking

### Phase 6: Mobile Apps (3-4 months)
- Customer mobile app (iOS + Android)
- Employee mobile app

### Phase 7: Advanced Features (2-3 months)
- AI-powered recommendations
- Chatbot
- Advanced analytics
- WhatsApp integration

### Phase 8: Optimization & Scaling (Ongoing)
- Performance optimization
- Bug fixes
- Feature enhancements
- User feedback implementation

---

## CONCLUSION

This comprehensive analysis covers all aspects of Kobe Motor's business model. The system requires:

1. **Customer-facing website** with search, vehicle details, inquiry, and account management
2. **Auction platform** for bidding on Japanese car auctions
3. **Internal ERP** for managing sales, inventory, shipping, finance, and operations
4. **Payment system** for processing international payments
5. **Document management** for export documentation
6. **Multi-language and multi-currency** support
7. **Mobile applications** for both customers and employees
8. **Integration** with auction houses, payment gateways, and communication tools

The ERP should support:
- Sales managers (CRM, quotes, invoices)
- Auction agents (bidding, auction tracking)
- Procurement team (vehicle sourcing)
- Logistics team (shipping, documentation)
- Finance team (payments, accounting)
- Customer support (tickets, FAQs)
- Management (reports, analytics)

Key success factors:
- User-friendly interface
- Fast vehicle search
- Real-time inventory updates
- Transparent pricing
- Reliable auction system
- Timely communication
- Secure payments
- Efficient logistics
- Excellent customer service

This analysis should provide you with a complete blueprint for developing a similar platform and ERP system.