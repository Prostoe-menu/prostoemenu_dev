FROM python:3.11-slim
WORKDIR /app
COPY ./back/requirements.txt . 
RUN pip install --upgrade pip && \
    pip install -r requirements.txt --no-cache-dir
COPY ./back /app
RUN echo $(ls -lah /app) 
RUN cd /app
RUN python manage.py collectstatic --noinput
CMD ["gunicorn", "prostoemenu.wsgi:application", "--bind", "0.0.0.0:8000"]