"use strict";

/* Data Access Object (DAO) module for accessing tickets data */

const db = require('../../db');

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
}



/**
 * @returns all the counters offered available by the OfficeQueueManagement
 */

exports.getAvailableCounters = () => {
  console.log("her")
  return new Promise((resolve, reject) => {
      const sql = `SELECT * 
      FROM counters WHERE userid=0 ; `;
      db.all(sql, (err, rows) => {
          if (err) {
              reject(err);
          } else {
            console.log("her1")
              const counters = rows.map((e) => {
                  const c = Object.create(null);
                  c.id_counter = e.id_counter;
                  c.userid = e.userid;
                  return c;
              });
              console.log("here")
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

