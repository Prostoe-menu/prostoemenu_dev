FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --upgrade pip && \
    pip install -r requirements.txt --no-cache-dir
RUN echo $(ls -lah)
COPY . .
RUN python manage.py collectstatic --noinput