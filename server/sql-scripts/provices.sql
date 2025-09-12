CREATE TABLE provices (
    provice_id BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name_th VARCHAR(100) NOT NULL UNIQUE,
    name_en VARCHAR(100) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO provices (name_th, name_en) VALUES ("กรุงเทพมหานคร", "bangkok");