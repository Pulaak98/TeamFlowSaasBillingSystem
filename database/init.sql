CREATE TABLE organizations ( 
    id SERIAL PRIMARY KEY, 
    name VARCHAR(255) NOT NULL, 
    base_price DECIMAL(10,2) NOT NULL, 
    included_members INTEGER NOT NULL CHECK (included_members >= 0), 
    included_credits INTEGER NOT NULL CHECK (included_credits >= 0), 
    extra_member_price DECIMAL(10,2) NOT NULL, 
    extra_credit_price DECIMAL(10,2) NOT NULL, 
    billing_start_date DATE NOT NULL, 
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP 
    );

CREATE TABLE organization_members (
    id SERIAL PRIMARY KEY, 
    organization_id INTEGER NOT NULL REFERENCES organizations(id) ON DELETE CASCADE, 
    full_name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, 
    status VARCHAR(20) NOT NULL CHECK(status IN ('active','inactive')), 
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP 
    );

CREATE TABLE credit_usage ( 
    id SERIAL PRIMARY KEY, 
    organization_id INTEGER NOT NULL REFERENCES organizations(id) ON DELETE CASCADE, 
    amount INTEGER NOT NULL CHECK(amount > 0), 
    source VARCHAR(100) NOT NULL, reference_id VARCHAR(255) NOT NULL, 
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    UNIQUE(organization_id, reference_id) 
    );


CREATE TABLE invoices ( 
    id SERIAL PRIMARY KEY, 
    organization_id INTEGER NOT NULL REFERENCES organizations(id) ON DELETE CASCADE, 
    billing_period_start DATE NOT NULL, billing_period_end DATE NOT NULL, 
    breakdown JSONB NOT NULL, 
    total_amount DECIMAL(10,2) NOT NULL, 
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    UNIQUE( organization_id, billing_period_start, billing_period_end ) 
    );