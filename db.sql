-- Create Advertisers Table
CREATE TABLE ADVERTISERS (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    contact_info TEXT,
    industry VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create TV Table
CREATE TABLE TV (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    channel_name VARCHAR(255) NOT NULL,
    channel_description TEXT,
    broadcast_region VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Radio Table
CREATE TABLE RADIO (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    channel_name VARCHAR(255) NOT NULL,
    channel_description TEXT,
    broadcast_region VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Panel Table
CREATE TABLE PANEL (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    location_name VARCHAR(255) NOT NULL,
    latitude DECIMAL(9,6),
    longitude DECIMAL(9,6),
    image BYTEA, -- to store image data
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Ad Contracts Table
CREATE TABLE AD_CONTRACTS (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    advertiser_id INT REFERENCES ADVERTISERS(id),
    start_date DATE,
    end_date DATE,
    total_ad_duration INT,
    ad_type VARCHAR(255),
    frequency INT,
    tv_id INT REFERENCES TV(id),
    radio_id INT REFERENCES RADIO(id),
    panel_id INT REFERENCES PANEL(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Ad Data Entries Table
CREATE TABLE AD_DATA_ENTRIES (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    ad_contract_id INT REFERENCES AD_CONTRACTS(id),
    start_time TIMESTAMP,
    end_time TIMESTAMP,
    ad_duration INT,
    channel VARCHAR(255),
    operator_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Ad Tracking Table
CREATE TABLE AD_TRACKING (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    ad_data_entry_id INT REFERENCES AD_DATA_ENTRIES(id),
    ad_start_time TIMESTAMP,
    ad_end_time TIMESTAMP,
    ad_duration INT,
    frequency INT,
    channel VARCHAR(255),
    region VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Reports Table
CREATE TABLE REPORTS (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id INT REFERENCES USERS(id),
    ad_contract_id INT REFERENCES AD_CONTRACTS(id),
    report_type VARCHAR(255),
    report_data TEXT,
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Users Table
CREATE TABLE USERS (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Audit Logs Table
CREATE TABLE AUDIT_LOGS (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    operator_id INT REFERENCES USERS(id),
    operation_type VARCHAR(255),
    details TEXT,
    performed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
