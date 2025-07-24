setup:
	@echo "Creating symlink: .env → api/.env"
	@if [ -L api/.env ] || [ -f api/.env ]; then \
		echo "Removing existing api/.env"; \
		rm -f api/.env; \
	fi
	ln -s ../.env api/.env
	docker compose down
	docker compose up -d