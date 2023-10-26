import { useState, useEffect } from 'react';

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';

import API from './../API';

function createData(service, ticketId, estimatedTime) {
  return { service, ticketId, estimatedTime };
}

const queueRows = [
  createData('Frozen yoghurt', 159, 6.0),
  createData('Ice cream sandwich', 237, 9.0),
  createData('Eclair', 262, 16.0),
  createData('Cupcake', 305, 3.7),
  createData('Gingerbread', 356, 16.0),
];

function QueueTable(props) {
  return (
    <TableContainer component={Paper}>
      {typeof props.counterTickets}
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Service</TableCell>
            <TableCell>Ticket #</TableCell>
            <TableCell>~ Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.counterTickets.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.servicename}
              </TableCell>
              <TableCell align="right">{row.id}</TableCell>
              <TableCell align="right">?</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function CounterCard(props) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Counter #{props.counterInfo.counterNum}
          <br />
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          services:
          <br />
          {props.counterInfo.services.map((s) => (
            <Chip label={s} />
          ))}
        </Typography>
        <Typography variant="body2">
          Currently serving:{' '}
          <Chip
            label={'#' + props.counterInfo.currentlyServing}
            color="primary"
          />
        </Typography>
        <QueueTable counterTickets={props.counterInfo.tickets} />
      </CardContent>
    </Card>
  );
}

function CountersBord() {
  const [countersData, setCountersData] = useState([]);

  useEffect(() => {
    API.getCountersDetails().then((groupedCounters) => {
      console.log(groupedCounters);
      const temp = [];
      let groupedTickets;

      API.getAllTickets().then((t) => {
        groupedTickets = t.reduce(function (r, a) {
          r[a.counterid] = r[a.counterid] || [];
          r[a.counterid].push(a);
          return r;
        }, Object.create(null));

        Object.entries(groupedCounters).map(([key, value]) => {
          const services = [];
          value.map((c) => {
            services.push(c.servicename);
          });

          temp.push({
            counterNum: key,
            services,
            currentlyServing: 135,
            tickets: groupedTickets[key] ? groupedTickets[key] : [],
          });
        });

        console.log(temp);
        setCountersData(temp);
      });
    });
  }, []);
  // const countersData = [
  //   {
  //     counterNum: 1,
  //     services: ['Account Management', 'Shipping'],
  //     currentlyServing: 135,
  //   },
  //   {
  //     counterNum: 2,
  //     services: ['Shipping'],
  //     currentlyServing: 124,
  //   },
  //   {
  //     counterNum: 3,
  //     services: ['Payment', 'Other operations'],
  //     currentlyServing: 182,
  //   },
  // ];

  return (
    <>
      <Grid container spacing={2}>
        {countersData.map((c) => (
          <Grid item md={4}>
            <CounterCard counterInfo={c} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default CountersBord;
