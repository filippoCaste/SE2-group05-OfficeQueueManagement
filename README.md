# Page "OQM" - Office queue Managment System

## React Client Application Routes

- Route `/`: it shows user page

## Main React Components

- `UserPage` : A page that shows the preview of the user page with its content
- `OfficePage`: A page that shows the preview of the office page with its content

## Server API
The server is built using Node.js and Express.js, which serves as a RESTful API for this application. The following endpoints are:

- `/api/services`:
    Returns a list of all services in the database.
    ```json
    [
        {
            "id": 1,
            "serviceName": "Account Management",
            "id_counter": 1
        },
        {
            "id": 2,
            "serviceName": "Shipping",
            "id_counter": 1
        }, ...
    ]
    ```
- `/api/counters`:
    Returns a list of all the counters in the database
    ```json
    [
        {
            "id_counter": 1,
            "userid": 0
        },
        {
            "id_counter": 2,
            "userid": 0
        }
    ]
    ```
- `/api/counters/:id`:
    Returns the counter according to its id
    ```json
    {
        "id_counter": 2,
        "userid": 0
    }    
    ``` 
- `/api/counters/available`: 
  Returns available counters from the database
  ```json
    [
        {
            "id_counter": 1,
            "userid": 0
        },
        {
            "id_counter": 2,
            "userid": 0
        }
    ]
  ```
- `/api/services/:id/services`:
  Returns 
  ```json
  [
    {
        "serviceid": 1,
        "servicename": "Account Management"
    }
  ]
  ```
- `/api/tickets/print/:serviceId`:
    `POST`, inserts a new ticket in the database, according to the service
- `/api/tickets/getAllTickets`:
    Returns a list of all the tickets in the database
  ```json
  [
    {
        "id": 1,
        "creationdate": "2023-10-21T12:00:21+02:00",
        "closeddate": "2023-10-21T12:34:21+02:00",
        "workerid": 3,
        "serviceid": 1
    },
    {
        "id": 2,
        "creationdate": "2023-10-22T08:50:29+02:00",
        "closeddate": "2023-10-22T09:10:29+02:00",
        "workerid": 1,
        "serviceid": 2
    }, ...
  ]
  ```
- `/api/tickets/noEnqueued/:serviceId`:
    Returns the number of all tickets related to service id.
    ```json
    1
    ```
- `/api/tickets/noServed/:serviceId`:
    Returns the number of tickets that have been already served.
    ```json
    1
    ```
- `/api/tickets/:serviceid`:
    Given a service id, this route returns the oldest associated open ticket that has not been served.
    ```json
    {
        "id": 4,
        "creationDate": "2023-10-25T17:34:52+02:00"
    }
    ```
