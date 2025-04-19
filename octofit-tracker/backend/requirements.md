# Requirements Documentation

This document provides a description of each dependency listed in the `requirements.txt` file for the OctoFit Tracker backend.

## Dependencies

### Django==4.1
Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design. It is used to build the backend of the application.

### djangorestframework==3.14.0
Django REST Framework (DRF) is a powerful and flexible toolkit for building Web APIs. It is used to create RESTful APIs for the application.

### django-allauth==0.51.0
Django Allauth is an integrated set of Django applications addressing authentication, registration, account management, and third-party (social) account authentication.

### django-cors-headers==4.5.0
Django CORS Headers is a Django app for handling the server headers required for Cross-Origin Resource Sharing (CORS). It allows the backend to handle requests from different origins.

### dj-rest-auth
DJ-REST-Auth provides a set of REST API endpoints for handling user authentication tasks such as login, logout, password reset, and registration.

### djongo==1.3.6
Djongo is a connector for using MongoDB as the database backend for Django. It allows Django to interact with MongoDB.

### pymongo==3.12
PyMongo is a Python driver for MongoDB. It provides tools for interacting with MongoDB databases.

### sqlparse==0.2.4
Sqlparse is a non-validating SQL parser for Python. It is used internally by Django for SQL formatting.

### stack-data==0.6.3
Stack Data provides utilities for extracting and formatting stack frames and tracebacks. It is useful for debugging.

### sympy==1.12
SymPy is a Python library for symbolic mathematics. It is used for mathematical computations and symbolic algebra.

### tenacity==9.0.0
Tenacity is a general-purpose retrying library for Python. It is used to implement retry logic in the application.

### terminado==0.18.1
Terminado is a Tornado websocket backend for the Xterm.js terminal emulator. It is used for terminal-based interactions.

### threadpoolctl==3.5.0
Threadpoolctl is a Python library for controlling thread pools in libraries that rely on native thread pools, such as NumPy.

### tinycss2==1.3.0
TinyCSS2 is a low-level CSS parser and generator for Python. It is used for handling CSS-related tasks.

### tornado==6.4.1
Tornado is a Python web framework and asynchronous networking library. It is used for handling asynchronous tasks.

### traitlets==5.14.3
Traitlets is a lightweight Python library for configuring and managing attributes in Python classes. It is used for configuration management.

### types-python-dateutil==2.9.0.20240906
This package provides type hints for the `python-dateutil` library, which is used for parsing and formatting dates.

### typing_extensions==4.9.0
Typing Extensions provides backported and experimental type hints for Python. It is used for type checking.

### tzdata==2024.2
Tzdata provides time zone data for Python applications. It is used for handling time zones.

### uri-template==1.3.0
Uri-Template is a Python library for parsing and expanding URI templates. It is used for working with URIs.

### urllib3==2.2.3
Urllib3 is a powerful HTTP library for Python. It is used for making HTTP requests.

### wcwidth==0.2.13
Wcwidth is a Python library for determining the number of terminal column cells a string occupies. It is used for terminal-based applications.

### webcolors==24.8.0
Webcolors is a Python library for working with color names and values defined by the HTML and CSS specifications.

### webencodings==0.5.1
Webencodings is a Python library for handling character encodings used in web development.

### websocket-client==1.8.0
WebSocket-Client is a Python library for interacting with WebSocket servers. It is used for real-time communication.
