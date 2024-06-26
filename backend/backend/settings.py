"""
Django settings for backend project.

Generated by 'django-admin startproject' using Django 4.2.7.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.2/ref/settings/
"""
import os
from pathlib import Path

JWT_SECRET = os.environ.get('JWT_SECRET')

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent
# == /Users/mmensing/Desktop/CODE/TRANSCENDENCE/TEST_ENVIRONMENT/backend


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-!l1#n)(q==6k0w3#*w92ilmkltpzf9d1ep4*39yiqz*$$z%ve^'

JWT_SECRET = os.environ.get('JWT_SECRET')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True
# -> prints (sensitive) data to the console, should not be readable by others

ALLOWED_HOSTS = [os.environ.get('CURRENT_HOST'), 'backend', 'localhost']

# Application definition
INSTALLED_APPS = [
    'daphne',  # HAS to be on top

    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'channels',
    # my created apps:
    'backend_app',

    # 'channels_redis'
    ]


# those are applied to all requests:
MIDDLEWARE = [

    'backend_app.middleware.cors.CorsMiddleware',  # custom middleware to enable cors policy

    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware'
]


# path to the urls.py file [all my endpoints]:
ROOT_URLCONF = 'backend.urls'

# before this:
CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels.layers.InMemoryChannelLayer',  # Use 'channels.layers.RedisChannelLayer' for production
    },
}

# CHANNEL_LAYERS = {
#     'default': {
#         'BACKEND': 'channels_redis.core.RedisChannelLayer',
#         'CONFIG': {
#             "hosts": [('127.0.0.1', 6379)],
#         },
#     },
# }


TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR/'templates'], # html pages to render / my folder in parent backend folder
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'

ASGI_APPLICATION = 'backend.asgi.application'

current_host = os.environ.get('CURRENT_HOST')
if current_host:
    current_host = 'https://' +  current_host
    CSRF_TRUSTED_ORIGINS = [current_host]
else:
    CSRF_TRUSTED_ORIGINS = []

DATABASES = {
    'default': {
        'ENGINE': os.environ.get('POSTGRES_ENGINE'),
        'NAME': os.environ.get('POSTGRES_DB'),
        'USER': os.environ.get('POSTGRES_USER'),
        'PASSWORD': os.environ.get('POSTGRES_PASSWORD'),
        'HOST': 'game_chat_db',
        'PORT': os.environ.get('POSTGRES_PORT')
    }
}

# DEFAULT:
# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',  # Use SQLite as the default database backend
#         'NAME': BASE_DIR / 'db.sqlite3',        # Database file name (SQLite-specific)
#     }
# }


# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

# comes from 'django.contrib.auth' Application:
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

# multiple languages define here!!

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/
# for frontend later:
STATIC_URL = 'static/'


MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')


# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
