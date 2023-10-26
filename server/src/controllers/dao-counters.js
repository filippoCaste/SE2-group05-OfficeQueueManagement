"use strict";

/* Data Access Object (DAO) module for accessing tickets data */

const db = require("../../db");

/**
 * @returns all the counters offered by the OfficeQueueManagement
 */
exports.getCounters = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM counters ; ";
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        const counters = rows.map((e) => {
          const c = Object.create(null);
          c.id_counter = e.id_counter;
          c.userid = e.userid;
          return c;
        });
        resolve(counters);
      }
    });
  });
};

/**
 * @returns all the counters offered available by the OfficeQueueManagement
 */

exports.getAvailableCounters = () => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * 
      FROM counters WHERE userid=0 ; `;
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        const counters = rows.map((e) => {
          const c = Object.create(null);
          c.id_counter = e.id_counter;
          c.userid = e.userid;
          return c;
        });

        resolve(counters);
      }
    });
  });
};

/**
 * @returns a counter by the id
 */

exports.getCounterById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM counters WHERE id_counter=?";
    db.get(sql, [id], (err, row) => {
      if (err) {
        reject(err);
        return;
      }
      if (row == undefined) {
        resolve({ error: "Counter not found." });
      } else {
        const counter = {
          id_counter: row.id_counter,
        };
        resolve(counter);
      }
    });
  });
};

exports.getTicketByCounterId = (counterid) => {
  return new Promise((resolve, reject) => {
    const sql = `
    SELECT t.id, t.creationdate
    FROM tickets AS t, (
			SELECT t1.serviceid, COUNT(*) AS queue_length
            FROM tickets AS t1, configurationService AS cs
            WHERE t1.counterid=0
			AND cs.serviceid=t1.serviceid
			AND cs.counterid=?
            GROUP BY t1.serviceid
            ORDER BY queue_length DESC
			LIMIT 1)
    WHERE t.closeddate IS NULL
    AND t.counterid = 0
    ORDER BY t.creationdate
    LIMIT 1;
    `;
    db.get(sql, [counterid], (err, ticket) => {
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
