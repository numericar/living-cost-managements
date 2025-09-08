CREATE TABLE counties (
    county_id BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    provice_id BIGINT NOT NULL,
    name_th VARCHAR(100) NOT NULL UNIQUE,
    name_en VARCHAR(100) NOT NULL UNIQUE,
    living_cost_avarage DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (provice_id) REFERENCES provices(provice_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;