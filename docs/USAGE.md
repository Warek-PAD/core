## How to launch

- Make sure you have created .env file and populate it according to .env.example
- Run `docker compose -f docker-compose.dev.yml up -d --build` for testing non-scaled, individual microservices
  OR `docker compose -f docker-compose.prod.yml up -d --build` for testing scaled microservices
- Access service discovery dashboard at http://localhost:5000
- Access gateway api definition at http://localhost:7000/api/docs