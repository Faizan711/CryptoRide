import { client } from '../../../lib/sanity'

const query = `
*[_type=="rides"]{
  "service": title,
  "iconUrl": icon.asset->url,
  _id,
  priceMultiplier,
  orderById
}|order(orderById asc)
`

const getRideTypes = async (req, res) => {
  try {
    //console.log('Client : ',client);
    const sanityResponse = await client.fetch(query)

    //console.log("Rides:",sanityResponse)

    res.status(200).send({ message: 'success', data: sanityResponse })
  } catch (error) {
    res.status(500).send({ message: 'error', data: error.message })
  }
}

export default getRideTypes