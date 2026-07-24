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