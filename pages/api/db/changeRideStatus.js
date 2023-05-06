import { client } from "../../../lib/sanity"

const changeRideStatus = async (req, res) => {
    try {
      const response = await client.patch(req.query._id).set({status : req.query.status}).commit();
      //console.log("Updated Status " + response);
      res.status(200).send({ message: 'success' });
    } catch (err) {
      console.log("Error in updating Document " + err)
      res.status(500).send({ message: 'error', data: err.message });
    }
  }
  

export default changeRideStatus;