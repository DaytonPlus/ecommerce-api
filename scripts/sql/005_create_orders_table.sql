-- Verificar si el tipo de dato order_status existe
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'order_status') THEN
        CREATE TYPE order_status AS ENUM ('pending', 'processed', 'cancelled');
    END IF;
END $$;

-- Verificar si el tipo de dato shipping_status existe
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'shipping_status') THEN
        CREATE TYPE shipping_status AS ENUM ('pending', 'shipped', 'delivered');
    END IF;
END $$;

-- Crear la tabla orders si no existe
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    status order_status NOT NULL,
    shipping_address VARCHAR(255) NOT NULL,
    shipping_status shipping_status NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);