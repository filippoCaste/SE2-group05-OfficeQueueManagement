# Page "OQM" - Office queue Managment System

## React Client Application Routes

- Route `/`: it shows user page

## Main React Components

- `UserPage` : A page that shows the preview of the user page with its content
- `OfficePage`: A page that shows the preview of the office page with its content

## Server API
The server is built using Node.js and Express.js, which serves as a RESTful API for this application. The following endpoints are:

- `/api/tickets`: ??
- `/api/noEnqueued/:serviceId`:
    Returns the number of all tickets related to service id.
    ```json
    1
    ```
- `/api/noServed/:serviceId`:
    Returns the number of tickets that have been already served.
    ```json
    1
    ```
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
            "value_number": 10
        },
        {
            "id_counter": 2,
            "value_number": 20
        }
    ]
    ```
- `/api/counters/:id`:
    Returns the counter according to its id
    ```json
    {
        "id_counter": 2,
        "value_number": 20
    }    
    ``` 
- `/api/printTicket/:serviceId`:
    `POST`, inserts a new ticket in the database, according to the service
- `/api/getAllTickets`:
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
- `/api/tickets/:serviceid`:

    ```
    
    ```