# Software Requirements Specification (SRS)

## 1. Introduction

### 1.1 Project Name

TeamFlow SaaS Billing System

### 1.2 Introduction

This project implements the billing system for TeamFlow, a SaaS team chat application. The system manages organizations, their members, credit usage, and monthly invoices. It calculates billing based on the organization's subscription plan and actual usage during a billing period.

---

## 2. Purpose

The purpose of this system is to:

- Store organization billing plans.
- Track active team members.
- Record credit usage.
- Calculate monthly invoices.
- Prevent duplicate usage records and duplicate invoices.
- Provide APIs for viewing billing information.

---

## 3. Scope

The system includes:

- Organization management
- Team member management
- Credit usage tracking
- Invoice calculation
- Invoice history
- Upcoming invoice preview

The system does not include:

- Payment gateway integration
- User authentication
- Email delivery (optional)
- Subscription upgrades or cancellations

---

## 4. Overall Description

Each organization subscribes to a pricing plan.

A plan contains:

- Monthly base price
- Included members
- Included credits
- Extra member price
- Extra credit price

At the end of each billing period, the system calculates the invoice based on the organization's active members and credit usage.

Only active members are counted for billing.

Credit overages are billed in units of 1,000 credits, rounded up to the nearest whole unit.

---

## 5. Functional Requirements

The system shall:

- Create and manage organizations.
- Add and retrieve organization members.
- Record credit usage events.
- Reject duplicate credit usage using reference IDs.
- Calculate upcoming invoices.
- Generate monthly invoices.
- Prevent duplicate invoices for the same billing period.
- Display invoice history.

---

## 6. Non-Functional Requirements

- RESTful API
- PostgreSQL database
- Kysely query builder
- TypeScript implementation
- Input validation
- Database constraints for data integrity
- Clear error messages
- Simple and readable user interface

---

## 7. Business Rules

The invoice is calculated using:

Total =
Base Price

- Member Overage
- Credit Overage

Member Overage:

Extra Members =
Active Members − Included Members

Member Charge =
Extra Members × Extra Member Price

Credit Overage:

Extra Credits =
Credits Used − Included Credits

Credit Billing Units =
Round Up(Extra Credits / 1000)

Credit Charge =
Credit Billing Units × Extra Credit Price

Invoice Total =
Base Price + Member Charge + Credit Charge

---

## 8. Assumptions

- Each organization has one subscription plan.
- Billing periods are one month long.
- Only active members are billable.
- Credit usage belongs to one organization.
- Invoice generation is triggered manually.
- Duplicate credit usage is prevented using a unique reference ID.
- Duplicate invoices are prevented using a unique billing period.
