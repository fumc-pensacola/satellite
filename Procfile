web: node api/index.js
test: ember test --server
mock: ember server
dev: ember server --proxy http://localhost:8080 --environment server-development & node api/index.js
debug: ember server --proxy http://localhost:8080 --environment server-development & node-debug -p 3000 api/index.js
