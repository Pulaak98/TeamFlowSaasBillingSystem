# Technical Design

## 1. Overview

The TeamFlow Billing System follows a layered architecture. The frontend communicates with the backend through REST APIs. The backend processes business logic, interacts with the database using Kysely, and returns JSON responses.

---

## 2. Technology Stack

### Frontend

- React
- TypeScript
- Tailwind CSS
- Fetch API

### Backend

- Node.js
- Express.js
- TypeScript
- Kysely
- PostgreSQL
- Zod

---

## 3. System Architecture

```
React Frontend
        │
        ▼
 REST API Routes
        │
        ▼
  Controllers
        │
        ▼
   Services
        │
        ▼
 Repositories
        │
        ▼
     Kysely
        │
        ▼
  PostgreSQL
```

---

## 4. Project Structure

### Backend

```
src/

├── config/
├── controllers/
├── db/
├── middleware/
├── repositories/
├── routes/
├── services/
├── types/
├── utils/
└── server.ts
```

### Frontend

```
src/

├── components/
├── pages/
├── services/
├── types/
└── App.tsx
```

---

## 5. Database Design

### organizations

Stores organization information and billing plan.

Column | Type

id | uuid 
name | varchar 
base_price | decimal 
included_members | integer
included_credits | integer 
extra_member_price | decimal 
extra_credit_price | decimal 
billing_start_date | date 
created_at | timestamp 

---

### organization_members

Stores team members.

| Column | Type 

id | uuid 
organization_id | uuid 
name | varchar 
status | active / inactive 
created_at | timestamp 

---

### credit_usage

Stores credit usage events.

Column | Type |

id | uuid 
organization_id | uuid
amount | integer
source | varchar
reference_id | varchar
created_at | timestamp

Constraint

Unique:

(organization_id, reference_id)

---

### invoices

Stores generated invoices.

Column | Type 

id | uuid 
organization_id | uuid 
billing_start | date 
billing_end | date 
breakdown | json 
total | decimal 
created_at | timestamp 

Constraint

Unique:

(organization_id, billing_start, billing_end)

---

## 6. Database Relationships

- One organization can have many members.
- One organization can have many credit usage records.
- One organization can have many invoices.
- Each member belongs to one organization.
- Each credit usage record belongs to one organization.
- Each invoice belongs to one organization.

---

## 7. Billing Calculation

The invoice is calculated using the following steps:

1. Load organization billing plan.
2. Count active members.
3. Calculate member overage.
4. Sum credit usage for the billing period.
5. Calculate credit overage.
6. Calculate invoice total.
7. Save invoice.

Formula


Invoice Total

=

Base Price

+

(Extra Members × Extra Member Price)

+

(Ceiling(Extra Credits / 1000) × Extra Credit Price)


---

## 8. Validation Rules

### Organization Members

- Name is required.
- Status must be active or inactive.

### Credit Usage

- Amount must be greater than zero.
- Reference ID is required.
- Duplicate reference IDs are rejected.

### Invoice

- Only one invoice can exist for an organization within the same billing period.

---

## 9. Error Handling

The API returns appropriate HTTP status codes.

Examples

- 400 Bad Request
- 404 Not Found
- 409 Conflict
- 500 Internal Server Error

Validation errors return descriptive messages.