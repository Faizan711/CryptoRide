import { client } from "../../../lib/sanity";

const getRideDriver = async (req, res) => {
  try {
    const { id } = req.query; // Assuming you have a query parameter 'id' to identify the specific trip

    // Fetch the trip document from Sanity
    const query = `*[_type == "trips" && _id == "${id}"][0]`;
    const result = await client.fetch(query);

    // Check if the trip document exists and has a driver reference
    if (result) {
      if (result.driver) {
        // Fetch the driver document based on the reference
        const driverQuery = `*[_type == "drivers" && _id == "${result.driver._ref}"][0]`;
        const driver = await client.fetch(driverQuery);

        res.status(200).json(driver);
      } else {
        res.status(404).json({ message: "Driver not found for the specified trip" });
      }
    } else {
      res.status(404).json({ message: "Trip not found" });
    }
  } catch (error) {
    console.error("Error retrieving driver details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default getRideDriver;