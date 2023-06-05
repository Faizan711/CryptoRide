import { client } from "../../../lib/sanity";

const changeTripDriver = async (req, res) => {
  try {
    const { tripId, driverId } = req.query; // Assuming tripId and driverId are provided as query parameters

    const mutation = {
      patch: {
        id: tripId,
        driver: {
          _type: "reference",
          _ref: driverId,
        },
      },
    };

    // Use the Sanity API to execute the mutation
    const response = await client.patch(tripId).set(mutation.patch).commit();
    //console.log("Driver set successfully:", response);

    res.status(200).send({ message: "Driver updated successfully" });
  } catch (err) {
    console.log("Error in updating document " + err);
    res
      .status(500)
      .send({ message: "Error updating driver", error: err.message });
  }
};

export default changeTripDriver;
