CREATE TABLE living_cost_profiles (
    lcp_id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    provice_id BIGINT NOT NULL,
    county_id BIGINT NOT NULL,
    profile_name VARCHAR(100) NOT NULL,
    base_income DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (provice_id) REFERENCES provices(provice_id),
    FOREIGN KEY (county_id) REFERENCES counties(county_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;