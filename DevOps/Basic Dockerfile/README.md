# Docker Hello Project

This project demonstrates how to build a **basic Docker image** using Alpine that prints a greeting message like **"Hello, Captain!"** — and optionally your custom name.

[Basic Dockerfile](https://roadmap.sh/projects/basic-dockerfile)

## Requirements

- Docker installed
- Basic familiarity with command line

## Files

- `Dockerfile` — contains the image instructions

## Dockerfile Example

```
FROM alpine:latest

ARG NAME=Captain
ENV NAME=$NAME

CMD ["sh", "-c", "echo Hello, $NAME!"]
```

## How to Build

Build the Docker image (default name is Captain):

```bash
docker build -t hello-captain .
```

Or pass a custom name:

```bash
docker build --build-arg NAME=name -t hello-name .
```

## How to Run

Run the image:

```bash
docker run hello-captain
# Output: Hello, Captain!
```

Or with the custom name:

```bash
docker run hello-name
# Output: Hello, name!
```

## Clean Up

```bash
docker rmi hello-captain hello-name
```

---

Made for practicing Docker fundamentals.
