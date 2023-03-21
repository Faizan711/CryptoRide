import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'Crypto-Ride-BlockChain',

  projectId: 'szd0y19j',
  dataset: 'crypto_ride',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
