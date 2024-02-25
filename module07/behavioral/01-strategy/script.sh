docker run \
  --name postgres \
  -e POSTGRES_USER=renato \
  -e POSTGRES_PASSWORD="admin123" \
  -e POSTGRES_DB=heroes \
  -p 5432:5432 \
  -d \
  postgres

docker exec -it postgres psql --username renato --dbname heroes
CREATE TABLE warriors(id serial PRIMARY KEY, name VARCHAR (255) NOT NULL);

# mongodb
docker run \
  --name mongodb \
  -e MONGO_INITDB_ROOT_USERNAME=renato \
  -e MONGO_INITDB_ROOT_PASSWORD=admin123 \
  -p 27017:27017 \
  -d \
  mongo:4