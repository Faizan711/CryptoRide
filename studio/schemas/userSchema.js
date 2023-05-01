export const userSchema = {
    name: 'users',
    type: 'document',
    title: 'Users',
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
        name: 'walletAddress',
        type: 'string',
        title: 'Wallet Address',
      },
      {
        name: 'profileImage',
        type: 'image',
        title: 'Profile Image',
      },
    ],
  }