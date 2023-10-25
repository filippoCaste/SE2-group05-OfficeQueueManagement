"use strict";

/* Data Access Object (DAO) module for accessing tickets data */

const db = require('../../db');



/**
 * @returns all the services offered by the OfficeQueueManagement
 */
exports.getServices = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM services ; ";
        db.all(sql, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                const services = rows.map((e) => {
                    const s = Object.create(null);
                    s.id = e.id;
                    s.serviceName = e.servicename;
                    return s;
                });
                resolve(services);
            }
        });
    });
}

exports.getServicesByCounterId = (counterid) => {
  return new Promise((resolve, reject) => {
      const sql = "SELECT serviceid, servicename FROM configurationService AS cs, services AS s WHERE counterid= ? AND serviceid= s.id ; ";
      db.all(sql,[counterid], (err, rows) => {
          if (err) {
              reject(err);
          } else {
              const services = rows.map((e) => {
                  const s = Object.create(null);
                  s.serviceid = e.serviceid;
                  s.servicename = e.servicename;
                  return s;
              });

              resolve(services);
          }
      });
  });
}

