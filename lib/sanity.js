import { createClient } from "@sanity/client"

export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: 'crypto_ride',
  apiVersion: 'v1',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})