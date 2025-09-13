CREATE TABLE living_cost_items (
    lci_id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    lcp_id BIGINT NOT NULL,
    cover_photo_id BIGINT NOT NULL,
    item_name VARCHAR(100) NOT NULL,
    money_type TINYINT UNSIGNED NOT NULL,
    money DECIMAL(10,2) NOT NULL,
    item_type TINYINT UNSIGNED NOT NULL,
    is_main_living TINYINT(1) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cover_photo_id) REFERENCES item_photos(photo_id),
    FOREIGN KEY (lcp_id) REFERENCES living_cost_profiles(lcp_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;