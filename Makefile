.DEFAULT_GOAL := help
.PHONY: help
help: ## Show this help
	@egrep -h '\s##\s' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

start: ## Start the containers
	docker compose up -d

up: ## Start the containers
	docker compose up

down: ## Down the containers
	docker compose down

npm: ## Run npm install
	docker compose exec -u 1000:1000 -it node npm install

restart: stop start ## Restart the containers

migrate: ## Run the migrations
	docker compose exec -it node npm run db:migrate

b3-import-dividends: ## Import dividends from B3
	docker compose exec -it node npm run b3:import-dividends

b3-import-movements: ## Import movements from B3
	docker compose exec -it node npm run b3:import-movements

demo: ## Run the demo
	docker compose exec -it node npx tsx ./src/commands/DemoCommand.ts