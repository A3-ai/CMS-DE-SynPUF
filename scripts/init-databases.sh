#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE DATABASE auth_db;
    CREATE DATABASE rfp_db;
    CREATE DATABASE vendor_db;
    CREATE DATABASE eval_db;
    CREATE DATABASE analytics_db;

    GRANT ALL PRIVILEGES ON DATABASE auth_db TO postgres;
    GRANT ALL PRIVILEGES ON DATABASE rfp_db TO postgres;
    GRANT ALL PRIVILEGES ON DATABASE vendor_db TO postgres;
    GRANT ALL PRIVILEGES ON DATABASE eval_db TO postgres;
    GRANT ALL PRIVILEGES ON DATABASE analytics_db TO postgres;
EOSQL

echo "Databases created successfully"
