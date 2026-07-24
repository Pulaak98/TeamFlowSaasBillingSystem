# API Specification

## Base URL

```
/api
```

---

# 1. Get Organization Members

### Endpoint

```
GET /organizations/:organizationId/members
```

### Description

Returns all members of an organization.

### Path Parameters

| Parameter      | Type | Description     |
| -------------- | ---- | --------------- |
| organizationId | UUID | Organization ID |

### Success Response

**200 OK**

```json
[
  {
    "id": "uuid",
    "name": "John Doe",
    "status": "active"
  }
]
```

### Error Responses

| Status | Description            |
| ------ | ---------------------- |
| 404    | Organization not found |

---

# 2. Create Organization Member

### Endpoint

```
POST /organizations/:organizationId/members
```

### Request Body

```json
{
  "name": "John Doe",
  "status": "active"
}
```

### Success Response

**201 Created**

```json
{
  "message": "Member created successfully."
}
```

### Validation

- Name is required.
- Status must be `active` or `inactive`.

### Error Responses

| Status | Description            |
| ------ | ---------------------- |
| 400    | Validation failed      |
| 404    | Organization not found |

---

# 3. Record Credit Usage

### Endpoint

```
POST /organizations/:organizationId/credit-usage
```

### Request Body

```json
{
  "amount": 500,
  "source": "ai-summary",
  "referenceId": "usage-123"
}
```

### Success Response

**201 Created**

```json
{
  "message": "Credit usage recorded successfully."
}
```

### Validation

- Amount must be greater than zero.
- Reference ID is required.

### Error Responses

| Status | Description            |
| ------ | ---------------------- |
| 400    | Invalid request        |
| 404    | Organization not found |
| 409    | Duplicate reference ID |

---

# 4. Upcoming Invoice

### Endpoint

```
GET /organizations/:organizationId/billing/upcoming-invoice
```

### Description

Returns the estimated invoice for the current billing period.

### Success Response

**200 OK**

```json
{
  "basePrice": 99,
  "memberCharge": 30,
  "creditCharge": 10,
  "total": 139
}
```

### Error Responses

| Status | Description            |
| ------ | ---------------------- |
| 404    | Organization not found |

---

# 5. Invoice History

### Endpoint

```
GET /organizations/:organizationId/invoices
```

### Description

Returns all generated invoices for an organization.

### Success Response

**200 OK**

```json
[
  {
    "id": "uuid",
    "billingStart": "2026-07-12",
    "billingEnd": "2026-08-11",
    "total": 139
  }
]
```

### Error Responses

| Status | Description            |
| ------ | ---------------------- |
| 404    | Organization not found |

---

# 6. Generate Invoice

### Endpoint

```
POST /organizations/:organizationId/invoices/generate
```

### Description

Generates an invoice for the current billing period.

### Success Response

**201 Created**

```json
{
  "message": "Invoice generated successfully."
}
```

### Error Responses

| Status | Description                                    |
| ------ | ---------------------------------------------- |
| 404    | Organization not found                         |
| 409    | Invoice already exists for this billing period |