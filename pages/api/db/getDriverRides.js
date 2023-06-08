import { client } from "../../../lib/sanity";

const getDriverRides = async (req, res) => {
  try {
    //console.log(req.query)
    const ride_query =`*[_type == 'rides' && _id == '${req.query.car_model}']`
    const ride_reponse = await client.fetch(ride_query);
    //console.log(ride_reponse)
    const query = `*[_type == 'trips' && status == 'booked' && rideCategory == '${ride_reponse[0].title}']`;
    const response = await client.fetch(query);
    //console.log(response);
    res.status(200).send({ message: "success", data: response });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "error", data: err.message });
  }
};

export default getDriverRides;