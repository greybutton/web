clean:
	rm -rf node_modules/
	rm -rf react-ui/node_modules/

compose:
	docker-compose up -d

compose-build:
	docker-compose build

compose-clean:
	docker-compose run --rm web make clean

compose-frontend-build:
	docker-compose run --rm web make frontend-build

compose-install:
	docker-compose run --rm web make install

compose-sh:
	docker-compose run --rm web sh

compose-test:
	docker-compose run --rm web yarn test

compose-test-coverage:
	docker-compose run --rm web yarn test -- --coverage

compose-test-watch:
	docker-compose run --rm web yarn test:watch

compose-up:
	docker-compose up

frontend-build:
	cd react-ui/ && yarn build

frontend-start:
	cd react-ui/ && yarn start

install:
	yarn install && cd react-ui/ && yarn install
