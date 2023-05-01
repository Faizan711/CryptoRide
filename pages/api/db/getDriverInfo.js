import { client } from "../../../lib/sanity";

const getDriverInfo = async (req, res) => {
  try {
    const query = `*[_type == "drivers" && _id=="${req.query.walletAddress}${req.query.phone}"]{
        name,phone,car_number,car_model,
        aadhar,address,
        walletAddress,
        "imageUrl": profileImage.asset->url
}`;
    const sanityResponse = await client.fetch(query);

    res.status(200).send({ message: "success", data: sanityResponse[0] });
  } catch (err) {
    console.log(err);
    res.status.send({ message: "error", data: err.message });
  }
};

export default getDriverInfo;