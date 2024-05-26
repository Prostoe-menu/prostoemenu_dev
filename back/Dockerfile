FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --upgrade pip && \
    pip install -r requirements.txt --no-cache-dir
COPY . .
RUN echo $(ls -lah /app) 
RUN python manage.py collectstatic --noinput