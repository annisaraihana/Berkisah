FROM python:3.10.10-slim-bullseye

ENV PYTHONUNBUFFERED 1
WORKDIR /build

# Create venv, add it to path and install requirements
RUN python -m venv /venv
ENV PATH="/venv/bin:$PATH"

COPY Backend Backend
RUN apt-get update && apt-get install libpq-dev python-dev -y

RUN pip install torch --index-url https://download.pytorch.org/whl/cpu
RUN pip install -r ./Backend/requirements.txt

# Create new unprivileged user
# Create new user to run app process as unprivilaged user
RUN addgroup --gid 1001 --system berkisah && \
    adduser --gid 1001 --shell /bin/false --disabled-password --uid 1001 berkisah

RUN chown -R berkisah:berkisah /build

# Switch to unprivileged user
USER berkisah

# switch to app directory
WORKDIR /build/Backend

# Run python app
CMD ["python", "main.py"]

# Expose port 8000
EXPOSE 8000



