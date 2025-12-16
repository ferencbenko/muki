-- Seed data for Muki E-Commerce
-- Sample products inspired by smart home/security products (nuki.io style)

INSERT INTO products (name, description, price, image_url, stock) VALUES
('Smart Lock Pro', 'Premium smart lock with Bluetooth and Wi-Fi connectivity. Control access from anywhere with the mobile app.', 299.00, 'https://images.unsplash.com/photo-1558002038-1055907df827?w=400', 25),
('Smart Lock 3.0', 'Third generation smart lock with improved battery life and faster response time.', 249.00, 'https://images.unsplash.com/photo-1597070424954-63cc02f9c809?w=400', 40),
('Keypad', 'Wireless keypad accessory for easy PIN code access to your smart lock.', 79.00, 'https://images.unsplash.com/photo-1614267119073-8b2cc6d8b995?w=400', 60),
('Bridge', 'Connect your smart lock to the internet for remote access and control.', 99.00, 'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=400', 35),
('Fob', 'Compact key fob for convenient one-touch access to your smart lock.', 39.00, 'https://images.unsplash.com/photo-1582139329536-e7284fece509?w=400', 100),
('Opener', 'Smart door opener for automatic door opening with integrated intercom.', 349.00, 'https://images.unsplash.com/photo-1585758942688-d0ec0be51031?w=400', 20),
('Smart Door Sensor', 'Monitor door status and receive notifications when doors are opened or closed.', 49.00, 'https://images.unsplash.com/photo-1558002038-1055907df827?w=400', 75),
('Power Pack', 'Extended battery pack for uninterrupted smart lock operation.', 59.00, 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400', 50),
('Smart Lock Bundle', 'Complete bundle: Smart Lock Pro, Bridge, Keypad, and 2 Fobs.', 449.00, 'https://images.unsplash.com/photo-1558002038-1055907df827?w=400', 15),
('Universal Cylinder', 'Compatible cylinder for easy installation of smart locks on any door.', 89.00, 'https://images.unsplash.com/photo-1582719471137-c3967ffb1c42?w=400', 45),
('Wall Mount', 'Elegant wall mounting solution for Bridge and smart home accessories.', 29.00, 'https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=400', 80),
('Smart Lock Mini', 'Compact smart lock solution perfect for smaller doors and cabinets.', 149.00, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', 55);

-- Optional: Sample user for testing (password would be hashed in real implementation)
-- Password: "Test123!" hashed with bcrypt
INSERT INTO users (email, password_hash, first_name, last_name) VALUES
('demo@muki.io', '$2b$10$XQWvVLs0fKiWJ0PmEOB8.uLKBNlKGp8TyK6YH5MjlQXqWzJmGHJ0C', 'Demo', 'User');
