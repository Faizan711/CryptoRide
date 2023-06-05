import { client } from "../../../lib/sanity";

const checkRideStatus = async (req, res) => {
  try {
    const query = `*[_type == 'trips' && _id == "${req.query.id}"]{
        status
      }`;
    const response = await client.fetch(query);
    console.log(response);
    res.status(200).send({ message: "success", data: response });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "error", data: err.message });
  }
};

export default checkRideStatus;
