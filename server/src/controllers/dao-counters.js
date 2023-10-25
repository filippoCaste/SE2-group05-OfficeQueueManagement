"use strict";

/* Data Access Object (DAO) module for accessing tickets data */

const db = require('../../db');
const serviceDao = require("./dao-services"); // module for accessing the user table in the DB

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
                    const c = Object.create(counter);
                    c.id_counter = e.id_counter;
                    c.userid = e.userid;
                    return c;
                });
                resolve(counters);
            }
        });
    });
}


/**
 * @returns all the counters offered by the OfficeQueueManagement
 */
exports.getAvailableCounters = () => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM counters WHERE userid=0;";
      db.all(sql, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          const counters = rows.map((e) => {
            const c = Object.create(null); // Corrected object creation
            c.id_counter = e.id_counter;
            return c;
          });
          resolve(counters);
        }
      });
    });
  }
  



/**
 * @returns a counter by the id
 */
exports.getCounterById = (id) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM counters WHERE id_counter=?';
      db.get(sql, [id], (err, row) => {
        if (err) 
        {
          reject(err);
          return;
        }
        if (row == undefined) 
        {
          resolve({error: 'Counter not found.'});
        } 
        else 
        {
          const counter = 
          { 
            id_counter: row.id_counter, 
          };
          resolve(counter);
        }
      });
    });
  };