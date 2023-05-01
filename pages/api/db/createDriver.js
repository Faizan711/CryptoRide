import { client } from "../../../lib/sanity";

const createDriverInSanity = async (req, res) => {
  try {
    const driverDoc = {
      _type: "drivers",
      _id: req.body.walletAddress+Number(req.body.phone),
      name: req.body.name,
      phone: Number(req.body.phone),
      walletAddress: req.body.walletAddress,
      address: req.body.address,
      aadhar: Number(req.body.aadhar),
      car_number: req.body.car_number,
      car_model: {
        _key:req.body.car_number,
        _ref:req.body.car_model,
        _type: "reference",
      },
    };
    //console.log(driverDoc)
    await client.createIfNotExists(driverDoc);
    res.status(200).send({ message: "success" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "error", data: err.message });
  }
};

export default createDriverInSanity;