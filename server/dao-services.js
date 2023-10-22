"use strict";

/* Data Access Object (DAO) module for accessing tickets data */

const db = require("./db");

const service = { id: NaN, serviceName: "none"};

const counter = { id_counter: NaN, value_number: NaN};


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
                    const s = Object.create(service);
                    s.id = e.id;
                    s.serviceName = e.servicename;
                    s.id_counter= e.id_counter;
                    return s;
                });
                resolve(services);
            }
        });
    });
}

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
                    c.value_number = e.value_number;
                    return c;
                });
                resolve(counters);
            }
        });
    });
}
