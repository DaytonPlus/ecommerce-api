-- Verificar si el tipo de dato cancellation_status existe
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'cancellation_status') THEN
        CREATE TYPE cancellation_status AS ENUM ('pending', 'approved', 'rejected');
    END IF;
END $$;

-- Crear la tabla cancellation_requests si no existe
CREATE TABLE IF NOT EXISTS cancellation_requests (
    id SERIAL PRIMARY KEY,
    order_id INT NOT NULL,
    user_id INT NOT NULL,
    reason TEXT NOT NULL,
    status cancellation_status NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);