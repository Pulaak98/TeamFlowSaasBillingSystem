********-------Phase1----------**********


## The Problem Understanding

The goal of this project is to build the billing system for TeamFlow, a team chat application. Each organization subscribes to a pricing plan that includes a monthly base price, a number of free team members, and a number of free credits. At the end of each billing period, the system calculates the organization's total bill based on its plan and actual usage.


## Billing Rule

Every organization is charged a monthly base price based on its subscription plan. This base price includes a fixed number of team members and a fixed number of credits.If the organization stays within these included limits, it only pays the base price.If either the number of active members or the credit usage exceeds the included limits, additional charges are added according to the following formula:

Total = Base Price
+ (Active Members − Included Members) × Extra Member Price
+ (Extra Credits ÷ 1000, rounded up) × Extra Credit Unit Price


## Workflow

ReactFrotend --> routes--> controller--> service--> repository--> databese--> repository--> service--> controller--> routes--> ReactFrontend


## Main Components

- React frontend for displaying billing information.
- Express.js REST API for handling requests.
- PostgreSQL database for storing organizations, members, usage, and invoices.
- Knex.js for database queries and migrations.
- Billing calculation service for generating invoice totals.
- Manual invoice generation endpoint.


Currently Everything seems clear if issues/qustestions arise i will discuss.


## Phase 2 - Database Design 

Completed:
- Designed the PostgreSQL database schema
- Created the following tables:
  - organizations
  - organization_members
  - credit_usage
  - invoices
- Added foreign key relationships
- Added database constraints:
  - UNIQUE (organization_id, reference_id)
  - UNIQUE (organization_id, billing_period_start, billing_period_end)
  - CHECK constraints for status and amount
- Connected PostgreSQL using Kysely
- Initialized the database using Docker and `init.sql`


## Phase 3

### REST API

- Organization Members
  - GET /organizations/:organizationId/members
  - POST /organizations/:organizationId/members

- Credit Usage
  - POST /organizations/:organizationId/credit-usage
  - Duplicate reference ID protection

- Billing
  - GET /organizations/:organizationId/billing/upcoming-invoice
  - GET /organizations/:organizationId/invoices

### Validation

- Zod request validation
- Duplicate reference ID prevention
- Organization existence validation
- Positive credit amount validation



## Phase 4 – Invoice Generation

Implemented invoice generation with a reusable billing calculator.

### Features

- Generate invoices using:
  - `POST /organizations/:organizationId/invoices/generate`
- Prevent duplicate invoices for the same billing period
- Store invoice breakdown as JSONB
- Shared billing calculation logic between preview and generation
- Console-based invoice email simulation
- Proper HTTP error responses using AppError

### Billing Formula

Total =
Base Price +
Extra Member Charges +
Extra Credit Charges



## Phase 5 – Billing Page

Built a simple Tailwind billing page at `/settings/billing`.

### Implemented

* Current plan and pricing
* Included members and credits
* Current billing period
* Active member count
* Credit usage
* Upcoming invoice preview
* Past invoices
* Real API data
* Loading and error states

### Important Changes

* Added `billing.service.ts` and billing API integration.
* Added billing TypeScript types and reusable billing components.
* Fixed PostgreSQL date/timezone handling so billing dates display correctly.
* Fixed PostgreSQL numeric values being returned as strings when displaying invoice amounts.
* Added invoice breakdown showing base price, extra member cost, and extra credit cost.
* Used Tailwind for a simple, clean UI.
* Member status remains managed through the backend/API; only `active` members count toward billing.

## Phase 6 – Automated Tests

Automated tests were added using Vitest.

Tested
Extra member charge calculation
Extra credit charge calculation with round-up
Full invoice calculation
Duplicate referenceId rejection
No overage when usage is within the included limits

The Acme Inc. calculation is verified as:

Base price       $99
Member overage   $30
Credit overage   $10
--------------------
Total            $139
Run Tests

From the backend directory:

npm test

Build check:

npm run build

Expected test result:

Test Files  2 passed
Tests       5 passed

## Phase 7 Added Readme


## Running the Project

Run the Project with Docker
1. Start everything

From the project root:

docker compose up --build

This starts:

PostgreSQL → localhost:5432
Backend → localhost:5000
Frontend → localhost:5173
2. Open the application

Frontend:

http://localhost:5173

Billing page:

http://localhost:5173/settings/billing

Backend API example:

http://localhost:5000/organizations/1/billing/upcoming-invoice
Stop the Project
docker compose down

To start again without rebuilding:

docker compose up

Rebuild after code/Dockerfile changes:

docker compose up --build

Do not use docker compose down -v unless you intentionally want to delete the PostgreSQL volume and database data.

Environment

The frontend uses:

VITE_API_URL=http://localhost:5000

Inside Docker, the backend connects to PostgreSQL using:

DB_HOST=postgres
DB_PORT=5432
DB_NAME=teamflow_billing
DB_USER=postgres
DB_PASSWORD=postgres
Database

PostgreSQL runs at the project root using Docker.

Database initialization is provided by:

database/init.sql

The database is persisted through the Docker volume:

postgres_data