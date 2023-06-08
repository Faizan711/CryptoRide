export const driverSchema = {
    name: 'drivers',
    type: 'document',
    title: 'Drivers',
    fields: [
      {
        name: 'name',
        type: 'string',
        title: 'Name',
      },
      {
        name: 'phone',
        type: 'number',
        title: 'Phone'
      },
      {
        name: 'address',
        type: 'string',
        title: 'Address',
      },
      {
        name: 'walletAddress',
        type: 'string',
        title: 'Wallet Address',
      },
      {
        name: 'profileImage',
        type: 'image',
        title: 'Profile Image',
      },
      {
        name:'aadhar',
        type: 'number',
        title: 'Aadhar Number'
      },
      {
        name:'car_number',
        type:'string',
        title:'Car Number'
      },
      {
        name: 'car_model',
        type: 'reference',
        title: 'Car Model',
        to: [{ type: 'rides' }],
      }
    ],
  }