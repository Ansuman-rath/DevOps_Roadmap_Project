# 🚢 Docker Hello Project

This project demonstrates how to build a **basic Docker image** using Alpine that prints a greeting message like **"Hello, Captain!"** — and optionally your custom name.

## 🧾 Requirements

- Docker installed
- Basic familiarity with command line

## 🛠 Files

- `Dockerfile` — contains the image instructions

## 🧱 Dockerfile Example

```
FROM alpine:latest

ARG NAME=Captain
ENV NAME=$NAME

CMD ["sh", "-c", "echo Hello, $NAME!"]
```

## 🚀 How to Build

Build the Docker image (default name is Captain):

```bash
docker build -t hello-captain .
```

Or pass a custom name:

```bash
docker build --build-arg NAME=Ansuman -t hello-ansuman .
```

## ▶️ How to Run

Run the image:

```bash
docker run hello-captain
# Output: Hello, Captain!
```

Or with the custom name:

```bash
docker run hello-ansuman
# Output: Hello, Ansuman!
```

## 💡 Notes

- The `ARG` keyword lets you pass variables at build time.
- The `ENV` keyword makes the variable available at runtime.
- The `CMD` uses `sh -c` to evaluate the variable properly.

## 🧼 Clean Up

```bash
docker rmi hello-captain hello-ansuman
```

---

Made for practicing Docker fundamentals.