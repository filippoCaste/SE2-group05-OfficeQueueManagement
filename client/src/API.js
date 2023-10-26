"use strict";
import dayjs from "dayjs";
const SERVER_URL = "http://localhost:3001/api";
// USER APIs
const login = async (credentials) => {
  try {
    const response = await fetch(SERVER_URL + "/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(credentials),
    });
    if (response.ok) {
      const user = await response.json();
      return user;
    } else {
      const errMessage = await response.json(); // {error:}
      throw errMessage;
    }
  } catch (error) {
    if (error.hasOwnProperty("error")) {
      throw error;
    } else {
      throw { error: "Cannot parse server response" };
    }
  }
};
const getUserInfo = async () => {
  try {
    const response = await fetch(SERVER_URL + "/sessions/current", {
      credentials: "include",
    });
    const user = await response.json();
    if (response.ok) {
      return user;
    } else {
      throw user;
    }
  } catch (error) {
    if (error.hasOwnProperty("error")) {
      throw error;
    } else {
      throw { error: "Cannot parse server response" };
    }
  }
};
const getUsers = async () => {
  try {
    const response = await fetch(SERVER_URL + "/users", {
      credentials: "include",
    });
    if (response.ok) {
      const users = await response.json();
      return users;
    } else {
      const errMessage = await response.json();
      throw errMessage;
    }
  } catch (error) {
    if (error.hasOwnProperty("error")) {
      throw error;
    } else {
      throw { error: "Cannot parse server response" };
    }
  }
};
const logout = async () => {
  try {
    const response = await fetch(SERVER_URL + "/sessions/current", {
      method: "DELETE",
      credentials: "include",
    });
    if (response.ok) {
      return null;
    } else {
      const errMessage = await response.json();
      throw errMessage;
    }
  } catch (error) {
    if (error.hasOwnProperty("error")) {
      throw error;
    } else {
      throw { error: "Cannot parse server response" };
    }
  }
};

// Tickets APIs
async function getAllServices() {
  // call  /api/services
  const response = await fetch(SERVER_URL + "/services");
  const services = await response.json();

  if (response.ok) {
    return services.map((e) => ({
      id: e.id,
      serviceName: e.serviceName,
      id_counter: e.id_counter,
    }));
  } else {
    throw services;
  }
}

async function getAllCounters() {
  // call  /api/counters
  const response = await fetch(SERVER_URL + "/counters");
  const counters = await response.json();

  if (response.ok) {
    return counters.map((e) => ({
      id: e.id_counter,
      userid: e.userid,
    }));
  } else {
    throw counters;
  }
}

async function getAvailableCounters() {
  // call  /api/counters
  const response = await fetch(SERVER_URL + "/counters/available");

  const counters = await response.json();

  if (response.ok) {
    return counters.map((e) => ({
      id: e.id_counter,
      userid: e.userid,
    }));
  } else {
    throw counters;
  }
}

async function getCounterById(id) {
  const response = await fetch(SERVER_URL + `/counters/${id}`);
  const question = await response.json();

  if (response.ok) {
    const e = question;
    return { id_counter: e.id_counter };
  } else {
    throw question;
  }
}
async function getServicesByCounterId(counterid) {
  const response = await fetch(SERVER_URL + `/counters/${counterid}/services`);
  const services = await response.json();
  if (response.ok) {
    return services.map((e) => ({
      serviceid: e.serviceid,
      servicename: e.servicename,
    }));
  } else {
    throw services;
  }
}

const getTickets = async () => {
  try {
    const response = await fetch(SERVER_URL + "/tickets", {
      credentials: "include",
    });
    if (response.ok) {
      const ticketsJson = await response.json();
      return ticketsJson;
      /*.map((p) => {
        const clientTicket = {
          id: p.id,
          title: p.title,
          authorid: p.authorid,
          author: p.author,
          creationDate: p.creationDate,
          publicationDate: p.publicationDate,
        };*/
      //return clientPage;
      //});
    } else {
      const errMessage = await response.json();
      throw errMessage;
    }
  } catch (error) {
    if (error.hasOwnProperty("error")) {
      throw error;
    } else {
      throw { error: "Cannot parse server response" };
    }
  }
};

const getTicketByServiceId = async (serviceId) => {
  try {
    if (serviceId === null) {
      throw { error: "id is not a number" };
    }
    if (!Number.isInteger(Number(serviceId)) || Number(serviceId) < 1) {
      throw { error: "id must be well formatted" };
    }
    const response = await fetch(SERVER_URL + `/tickets/${serviceId}`, {
      credentials: "include",
    });
    if (response.ok) {
      const page = await response.json();
      return page;
    } else {
      const errMessage = await response.json();
      throw errMessage;
    }
  } catch (error) {
    if (error.hasOwnProperty("error")) {
      throw error;
    } else {
      throw { error: "Cannot parse server response" };
    }
  }
};

const getTicketByCounterId = async (counterid) => {
  try {
    if (counterid === null) {
      throw { error: "id is not a number" };
    }
    if (!Number.isInteger(Number(counterid)) || Number(counterid) < 1) {
      throw { error: "id must be well formatted" };
    }
    const response = await fetch(
      SERVER_URL + `/counters/${counterid}/tickets`,
      {
        credentials: "include",
      }
    );
    if (response.ok) {
      const ticket = await response.json();
      return ticket;
    } else {
      const errMessage = await response.json();
      throw errMessage;
    }
  } catch (error) {
    if (error.hasOwnProperty("error")) {
      throw error;
    } else {
      throw { error: "Cannot parse server response" };
    }
  }
};

/**
 * Prints the new ticket generated according to the requested service in the database (no return)
 */
const printTicketByServiceId = async (serviceId) => {
  try {
    if (serviceId === null) {
      throw { error: "service id is not a number" };
    }
    if (!Number.isInteger(Number(serviceId)) || Number(serviceId) < 1) {
      throw { error: "service id must be well formatted" };
    }
    const response = await fetch(SERVER_URL + `/tickets/print/${serviceId}`, {
      method: "POST",
      credentials: "include",
    });
    if (response.ok) {
      return true;
    } else {
      const errMessage = await response.json();
      throw errMessage;
    }
  } catch (error) {
    if (error.hasOwnProperty("error")) {
      throw error;
    } else {
      throw { error: "Cannot parse server response" };
    }
  }
};

const setOperatingTicket = async (counter, ticket) => {
  try {
    if (!counter || !ticket)
      throw { error: "counter or ticket is not well formatted" };

    const response = await fetch(SERVER_URL + "/tickets/" + ticket.id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        counterid: counter.id,
        ticketid: ticket.id,
      }),
    });

    if (!response.ok) {
      const errMessage = await response.json();
      throw errMessage;
    } else {
      const ticket = await response.json();
      return ticket;
    }
  } catch (error) {
    if (error.hasOwnProperty("error")) {
      throw error;
    } else {
      throw { error: "Cannot parse server response" };
    }
  }
};

const getAllTickets = async () => {
  try {
    const response = await fetch(SERVER_URL + `/tickets/getAllTickets`, {
      method: "GET",
    });
    if (response.ok) {
      const tickets = await response.json();
      return tickets;
    } else {
      const errMessage = await response.json();
      throw errMessage;
    }
  } catch (error) {
    if (error.hasOwnProperty("error")) {
      throw error;
    } else {
      throw { error: "Cannot parse server response" };
    }
  }
};

const API = {
  login,
  logout,
  getUserInfo,
  getUsers,
  getTickets,
  getAllServices,
  getAllCounters,
  getTicketByServiceId,
  getCounterById,
  printTicketByServiceId,
  getAllTickets,
  getAvailableCounters,
  getTicketByCounterId,
  getServicesByCounterId,
  setOperatingTicket,
};

export default API;
