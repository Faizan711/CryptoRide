export const tripSchema = {
  name: 'trips',
  type: 'document',
  title: 'Trips',
  fields: [
    {
      name: 'dropoff',
      type: 'string',
      title: 'Drop off',
    },
    {
      name: 'pickup',
      type: 'string',
      title: 'Pick up',
    },
    {
      name: 'rideCategory',
      type: 'string',
      title: 'Trip type',
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Booked(Awaiting Driver Confirmation)', value: 'booked'},
          {title: 'Waiting for Driver ', value: 'waiting'},
          {title: 'Ongoing', value: 'ongoing'},
          {title: 'Completed', value: 'completed'},
        ],
      },
    },
    {
      name: 'price',
      type: 'number',
      title: 'Trip price',
    },
    {
      name: 'rideTimestamp',
      type: 'datetime',
      title: 'Trip timestamp',
    },
    {
      name: 'passenger',
      type: 'reference',
      title: 'Passenger',
      to: [{type: 'users'}],
    },
  ],
}
