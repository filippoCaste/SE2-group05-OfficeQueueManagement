"use strict";
/* Data Access Object (DAO) module for accessing tickets data */
const db = require("./db");
const dayjs = require("dayjs");
/*
 * API: tickets
 */
// This function retrieves the whole list of tickets from the database.
exports.getTickets = () => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT p.id AS ticketNumber,p.creationdate, p.closeddate WHERE p.workerid= u.id;  ";
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
      }
      const tickets = rows.map((e) => {
        const ticket = Object.assign({}, e, {
          creationDate: e.creationdate,
          closedDate: e.closeddate,
        });
        delete ticket.creationdate; // removing lowercase
        delete ticket.closeddate; // removing lowercase
        return ticket;
      });
      const sortedtickets = [...tickets].sort(sortByCreationDate);
      // WARNING: if implemented as if(filters[filter]) returns true also for filter = 'constructor' but then .filterFunction does not exists
      resolve(sortedtickets);
    });
  });
};

/**
 * @returns the number of tickets that *are in the queue*, according to the serviceId
 */
exports.getNumberOfEnqueuedTicketsPerService = (serviceId) => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT COUNT(DISTINCT id) AS cnt FROM tickets WHERE workerid=0 AND serviceid=? GROUP BY id; ";
    db.get(sql, [serviceId], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row.cnt);
      }
    });
  });
};
/**
 * @returns the number of tickets that have been *served*, according to the serviceId
 */
exports.getNumberOfServedTicketsPerService = (serviceId) => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT COUNT(DISTINCT id) AS cnt FROM tickets WHERE closeddate<>'NULL' AND serviceid=? GROUP BY id; ";
    db.get(sql, [serviceId], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row.cnt);
      }
    });
  });
};
/**
 * @returns the ticket belonging to specified service
 */

exports.getticketByService = (serviceId) => {
  return new Promise((resolve, reject) => {
    const sql = `
    SELECT id, creationdate
    FROM tickets
    WHERE closeddate IS NULL
      AND workerid= 0
      AND serviceid = ?
    ORDER BY creationdate
    LIMIT 1;
    `;
    db.get(sql, [serviceId], (err, ticket) => {
      if (err) {
        reject(err);
      } else if (ticket === undefined) {
        resolve({ error: "ticket not available" });
      } else {
        const ticketObject = {
          id: ticket.id,
          creationDate: ticket.creationdate,
        };
        resolve(ticketObject); // Resolve the Promise with the ticketObject
      }
    });
  });
};

/*
// This function retrieves the whole list of tickets from the database.
exports.getPublicatedtickets = () => {
  return new Promise((resolve, reject) => {  //comparison is made based on the lexicographic order 
    const sql = 'SELECT p.id,u.id AS authorid,u.username AS author, p.title, p.creationdate, p.publicationdate FROM tickets AS p, users AS u WHERE p.publicationdate!= "" AND p.authorid = u.id AND p.publicationdate <= "'+ dayjs().format("YYYY-MM-DD")+'";';
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
      }
      const tickets = rows.map((e) => {
        const ticket = Object.assign({}, e, { creationDate: e.creationdate, publicationDate: e.publicationdate });
        delete ticket.creationdate; // removing lowercase 
        delete ticket.publicationdate; // removing lowercase
        return ticket;
      });
      const sortedtickets = [...tickets].sort(sortByPublicationDate);
      resolve(sortedtickets);
    });
  });
};
// This function retrieves tickets and the associated userid
exports.getticketsByUserId = (userid) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT p.id, u.username AS author, p.title, p.creationdate, p.publicationdate
      FROM tickets AS p, users AS u
      WHERE p.authorid = u.id AND u.id = ?;
    `;
    db.all(sql, [userid], (err, rows) => {
      if (err) {
        reject(err);
      } else if (rows.length === 0) {  // lenght of the array 0 thus return []
        resolve({error:"no tickets found"});
      } else {
        const tickets = rows.map((e) => {
          // WARNING: the database returns only lowercase fields. So, to be compliant with the client-side, we convert "publicationdate" to the camelCase version ("publicationDate").
          const ticket = Object.assign({}, e, { creationDate: e.creationdate, publicationDate: e.publicationdate }); // adding camelcase "publicationDate"
          delete ticket.creationdate; // removing lowercase 
          delete ticket.publicationdate; // removing lowercase
          return ticket;
        });
        resolve(tickets);
      }
    });
  });
};
  
// This function retrieves a ticket given its id and the associated contents
exports.getticketById = (ticketid) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT p.id, u.id AS authorid, p.title, p.creationdate, p.publicationdate
      FROM tickets AS p, users AS u
      WHERE p.id = ? AND p.authorid = u.id;
    `;
    db.get(sql, [ticketid], (err, ticket) => {
      if (err) {
        reject(err);
      } else if (ticket === undefined) {
        resolve({ error: "ticket not found" });
      } else {
        const ticketObject = {
          id: ticket.id,
          authorid: ticket.authorid,
          title: ticket.title,
          creationDate: ticket.creationdate,
          publicationDate: ticket.publicationdate,
          contents: []
        };
        contentDao.getContentsByticketId(ticket.id)
          .then((contents) => {
            if (contents.length === 0) {
              resolve({ error: "ticket has no contents" });
            } else {
              const orderedContentsByPosition = contents.sort((a, b) => a.position - b.position);
              ticketObject.contents = orderedContentsByPosition;
              resolve(ticketObject);
            }
          })
          .catch((err) => {
            reject(err);
          });
      }
    });
  });
};
  
// This function create a ticket given its properties, autogenerated id and lastID automatically retrieved from the db
exports.createticket = (ticket) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO tickets (title, authorid, creationDate, publicationDate) VALUES (?, ?, ?, ?)';
    db.run(sql, [ticket.title, ticket.authorid, ticket.creationDate, ticket.publicationDate], function (err) {
      if (err) {
        reject(err);
        return;
      }
      const ticketId = this.lastID; // id of the newly inserted ticket
      Promise.all(
        ticket.contents.map((content) => {
          return contentDao.createContent(content, ticketId); // Call createContent function for each content
        })
      )
        .then(() => {
          // Fetch the newly created ticket with contents from the database
          resolve(exports.getticketById(ticketId));
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
};
// This function updates an existing ticket given its id and adding new properties
exports.updateticket = (ticketid, ticket) => {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE tickets SET title = ?, authorid = ?, creationDate = ?, publicationDate = ? WHERE id = ?';
    db.run(sql, [ticket.title, ticket.authorid, ticket.creationDate, ticket.publicationDate, ticketid], function (err) {
      if (err) {
        reject(err);
        return;
      }
      if (this.changes !== 1) {
        resolve({ error: 'No ticket was updated.' });
        return;
      }
      contentDao.getContentsByticketId(ticketid)
            .then((oldContents) => {
              const oldContentsCopy =[...oldContents];
              if (oldContentsCopy.length === 0) {
                resolve({ error: "ticket has no contents" });
              } else {
                const newContents = ticket.contents;
                // Compare old and new contents
                const createPromises = [];
                const updatePromises = [];
                const deletePromises = [];
                // Check for new contents and update existing ones
                newContents.forEach((newContent) => {
                  const foundIndex = oldContentsCopy.findIndex((oldContent) => oldContent.id === newContent.id);
                  if (foundIndex === -1) {
                    // New content, create it
                    createPromises.push(contentDao.createContent(newContent, ticketid));
                  } else {
                    // Existing content, update it
                    updatePromises.push(contentDao.updateContent(newContent));
                    // Remove the updated content from the oldContentsCopy array
                    oldContentsCopy.splice(foundIndex, 1);
                  }
                });
                // Delete remaining old contents
                oldContentsCopy.forEach((oldContent) => {
                  deletePromises.push(contentDao.deleteContent(oldContent.id));
                });
                // Perform the necessary operations
                return Promise.all([...createPromises, ...updatePromises, ...deletePromises]);
              }
            })
            .then(() => {
              resolve(exports.getticketById(ticketid));  // Return the corrected ticket
            })
            .catch((error) => {
              reject(error);
            });
    });
  });
};
// This function deletes an existing ticket given its id.
exports.deleteticket = (ticketid) => {
  return contentDao.deleteContentsByticketId(ticketid)
    .then(() => {
      return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM tickets WHERE id = ?';
        db.run(sql, [ticketid], function (err) {
          if (err) {
            reject(err);
          }
          if (this.changes !== 1)
            resolve({ error: 'No ticket deleted.' });
          else
            resolve();
        });
        });
      })
    .catch((error) => {
      reject(error);
    });
};
const sortByPublicationDate = (ticketA, ticketB) => {
  const dateA = dayjs(ticketA.publicationDate);
  const dateB = dayjs(ticketB.publicationDate);
  // Handle the case where publicationDate is an empty string
  if (dateA.isValid() && !dateB.isValid()) {
    return -1;
  } else if (!dateA.isValid() && dateB.isValid()) {
    return 1;
  }
  if (dateA.isBefore(dateB)) {
    return -1;
  } else if (dateA.isAfter(dateB)) {
    return 1;
  }
  return 0;
};
*/
