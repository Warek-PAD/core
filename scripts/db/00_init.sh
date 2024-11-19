#!/bin/bash

set -e

cat >> "${PGDATA}"/pg_hba.conf << EOF
host replication ${REPLICATION_USER} 0.0.0.0/0 scram-sha-256
EOF

cat >> "${PGDATA}"/postgresql.conf << EOF
wal_level = replica
max_wal_senders = 3
max_replication_slots = 3
hot_standby = on
EOF

pg_ctl restart -D "${PGDATA}"

psql -U "${POSTGRES_USER}" -d "${POSTGRES_DB}" << EOF
CREATE USER ${REPLICATION_USER} WITH REPLICATION ENCRYPTED PASSWORD '${REPLICATION_PASSWORD}';
SELECT pg_create_physical_replication_slot('replication_slot_1');
SELECT pg_create_physical_replication_slot('replication_slot_2');
SELECT pg_create_physical_replication_slot('replication_slot_3');
EOF
