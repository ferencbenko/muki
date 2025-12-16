-- Seed data for Muki E-Commerce

INSERT INTO products (name, description, price, image_url, stock) VALUES
('Smart Lock Pro', 'Premium smart lock with Bluetooth and Wi-Fi connectivity. Control access from anywhere with the mobile app.', 299, '/images/products/nuki-pro-white.webp', 10),
('Keypad', 'Wireless keypad accessory for easy PIN code access to your smart lock.', 79, '/images/products/nuki-keypad.webp', 1),
('Bridge', 'Connect your smart lock to the internet for remote access and control.', 99, '/images/products/nuki-bridge.webp', 0),
('Fob', 'Compact key fob for convenient one-touch access to your smart lock.', 39, '/images/products/nuki-fob.webp', 100),
('Opener', 'Smart door opener for automatic door opening with integrated intercom.', 349, '/images/products/nuki-opener.webp', 20),
('Smart Door Sensor', 'Monitor door status and receive notifications when doors are opened or closed.', 49, '/images/products/nuki-door-sensor.webp', 75),
('Power Pack', 'Extended battery pack for uninterrupted smart lock operation.', 59, '/images/products/nuki-power-pack_white.webp', 50),
('Universal Cylinder', 'Compatible cylinder for easy installation of smart locks on any door.', 89, '/images/products/nuki-universal-cylinder.webp', 45);

-- Optional: Sample user for testing (password would be hashed in real implementation)
-- Password: "Test123!" hashed with bcrypt
INSERT INTO users (email, password_hash, first_name, last_name) VALUES
('demo@muki.io', '$2b$10$XQWvVLs0fKiWJ0PmEOB8.uLKBNlKGp8TyK6YH5MjlQXqWzJmGHJ0C', 'Demo', 'User');
