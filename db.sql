CREATE TABLE cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    user_id INT,
    name VARCHAR(255) NOT NULL,
    price DOUBLE NOT NULL,
    quantity INT NOT NULL,
    image VARCHAR(500),
    selected_size VARCHAR(50),
    category VARCHAR(100),
    is_reservation BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE products (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    original_price DECIMAL(10,2) DEFAULT NULL,
    category VARCHAR(255) DEFAULT NULL,
    rating DECIMAL(2,1) DEFAULT 0,
    image VARCHAR(500) DEFAULT NULL
    description TEXT DEFAULT NULL,
    sizes JSON DEFAULT NULL COMMENT 'JSON object: {"S":10,"M":5,"L":3}',
    quantity INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE orders (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NULL,
    order_number VARCHAR(50) NOT NULL UNIQUE,
    full_name VARCHAR(255) NOT NULL,
    student_id VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    pickup_date DATE NOT NULL,
    pickup_time VARCHAR(50) NOT NULL,
    special_instructions TEXT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    status ENUM('pending','confirmed','ready','completed','cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE order_items (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT UNSIGNED NOT NULL,
    product_id BIGINT UNSIGNED NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    product_image VARCHAR(500) DEFAULT NULL,
    quantity INT NOT NULL,
    selected_size VARCHAR(10) NULL,
    price DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    is_reservation BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    avatar VARCHAR(500) DEFAULT NULL,
    password VARCHAR(255) NOT NULL,
    student_id VARCHAR(50) UNIQUE COMMENT 'For student users',
    role ENUM('admin', 'staff', 'customer') DEFAULT 'customer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;




-- ========================================
-- MTC BOOKSTORE DATABASE SCHEMA
-- Complete SQL script for all tables
-- ========================================

-- 1. USERS TABLE
CREATE TABLE users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    email_verified_at TIMESTAMP NULL,
    password VARCHAR(255) NOT NULL,
    student_id VARCHAR(50) NULL UNIQUE,
    phone VARCHAR(20) NULL,
    avatar VARCHAR(255) NULL,
    role ENUM('admin', 'staff', 'customer') DEFAULT 'customer',
    is_active BOOLEAN DEFAULT TRUE,
    remember_token VARCHAR(100) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. PRODUCTS TABLE
CREATE TABLE products (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    original_price DECIMAL(10,2) DEFAULT NULL,
    category VARCHAR(255) DEFAULT NULL,
    rating DECIMAL(2,1) DEFAULT 0,
    image VARCHAR(500) DEFAULT NULL,
    description TEXT DEFAULT NULL,
    sizes JSON DEFAULT NULL COMMENT 'JSON object: {"S":10,"M":5,"L":3}',
    quantity INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_category (category),
    INDEX idx_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- 3. CARTS TABLE
CREATE TABLE carts (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NULL COMMENT 'NULL for guest carts, uses session',
    session_id VARCHAR(255) NULL COMMENT 'For guest users',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_user_id (user_id),
    INDEX idx_session_id (session_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. CART ITEMS TABLE
CREATE TABLE cart_items (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    cart_id BIGINT UNSIGNED NOT NULL,
    product_id BIGINT UNSIGNED NOT NULL,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    quantity INT NOT NULL,
    image VARCHAR(500),
    selected_size VARCHAR(50),
    category VARCHAR(100),
    is_reservation BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_cart_id (cart_id),
    INDEX idx_product_id (product_id),
    FOREIGN KEY (cart_id) REFERENCES carts(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. ORDERS TABLE
CREATE TABLE orders (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NULL,
    order_number VARCHAR(50) NOT NULL UNIQUE,
    full_name VARCHAR(255) NOT NULL,
    student_id VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    pickup_date DATE NOT NULL,
    pickup_time VARCHAR(50) NOT NULL,
    special_instructions TEXT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    status ENUM('pending','confirmed','ready','completed','cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_order_number (order_number),
    INDEX idx_user_id (user_id),
    INDEX idx_student_id (student_id),
    INDEX idx_status (status),
    INDEX idx_pickup_date (pickup_date),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. ORDER ITEMS TABLE
CREATE TABLE order_items (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT UNSIGNED NOT NULL,
    product_id BIGINT UNSIGNED NOT NULL,
    name VARCHAR(255) NOT NULL,
    image VARCHAR(500) DEFAULT NULL,
    quantity INT NOT NULL,
    selected_size VARCHAR(10) NULL,
    category VARCHAR(100),
    price DECIMAL(10,2) NOT NULL,
    is_reservation BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_order_id (order_id),
    INDEX idx_product_id (product_id),
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- 7. CONTACT MESSAGES TABLE
CREATE TABLE contact_messages (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(500) NOT NULL,
    message TEXT NOT NULL,
    status ENUM('unread', 'read') DEFAULT 'unread',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- SAMPLE DATA INSERTS
-- ========================================

-- Insert sample admin user (password: 'password' - hashed with bcrypt)
INSERT INTO users (name, email, password, role, is_active) VALUES
('Admin User', 'admin@mtc.edu.ph', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin', TRUE);

-- Insert sample products (Uniforms)
INSERT INTO products (name, price, original_price, category, rating, image, description, sizes, quantity) VALUES
('Nursing Shirt', 350.00, NULL, 'Uniform', 4.8, '/img/uniforms/uniform_nursing.png', 'Professional nursing uniform shirt - breathable fabric, comfortable for long shifts.', '{"XS":10,"S":15,"M":20,"L":20,"XL":15,"XXL":10}', 90),
('Accountancy Shirt', 320.00, NULL, 'Uniform', 4.6, '/img/uniforms/uniform_accountancy.png', 'Professional business attire for accountancy students.', '{"XS":8,"S":12,"M":15,"L":15,"XL":12,"XXL":8}', 70),
('Senior High School Shirt', 280.00, NULL, 'Uniform', 4.7, '/img/uniforms/uniform_shs.png', 'Comfortable daily wear uniform for senior high school students.', '{"XS":15,"S":20,"M":25,"L":25,"XL":20,"XXL":15}', 120);

-- Insert sample textbooks
INSERT INTO products (name, price, original_price, category, rating, image, description, sizes, quantity) VALUES
('Basic Physics Textbook', 650.00, 750.00, 'Textbook', 4.9, '/img/textbooks/textbook_physics.jpg', 'Comprehensive physics textbook covering fundamental concepts and applications.', NULL, 50),
('Anatomy & Physiology', 720.00, 850.00, 'Textbook', 4.8, '/img/textbooks/textbooks_anatomy.jpg', 'Essential anatomy and physiology guide for nursing and health science students.', NULL, 40);

-- Insert sample stationery
INSERT INTO products (name, price, original_price, category, rating, image, description, sizes, quantity) VALUES
('Tytana Notebook', 85.00, 100.00, 'Stationery', 4.7, '/img/stationary/stationary_notebook.png', 'Premium quality notebook with lined pages and Tytana branding.', NULL, 200),
('Tytana Ballpen', 35.00, 45.00, 'Stationery', 4.5, '/img/stationary/stationary_ballpen.png', 'Smooth-writing ballpen with comfortable grip.', NULL, 300);

-- Insert sample accessories
INSERT INTO products (name, price, original_price, category, rating, image, description, sizes, quantity) VALUES
('Tytana Lanyard', 75.00, 95.00, 'Accessories', 4.8, '/img/accessories/accessories_lanyard.png', 'Durable lanyard with Tytana logo and secure clip.', NULL, 150),
('Tytana Pin', 45.00, 60.00, 'Accessories', 4.6, '/img/accessories/accessories_pin.png', 'Collectible pin with official Tytana design.', NULL, 200);

-- Insert sample merchandise
INSERT INTO products (name, price, original_price, category, rating, image, description, sizes, quantity) VALUES
('Tytana Tote Bag', 380.00, 450.00, 'Merchandise', 4.9, '/img/merchandise/merchandise_totebag.png', 'Spacious and durable tote bag with Tytana branding, perfect for books and supplies.', NULL, 75);
