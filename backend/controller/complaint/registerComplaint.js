const user = require("../../model/user");
const Complaint = require("../../model/complainant");
const PersonSchema = require("../../model/person");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;

exports.register = async (req, res) => {
  try {
    const { VictimArray, AccusedArray, WitnessArray, IncidentDetails, userId } =
      req.body;

    const evidences = req.files
      ? Object.values(req.files).map((file) => file)
      : [];
    console.log(123);
    console.log(evidences);

    console.log(evidences);

    const createPersonArray = async (personArray) => {
      const personIds = [];
      for (const personData of personArray) {
        const newPerson = new PersonSchema(personData);
        await newPerson.save();
        personIds.push(newPerson._id);
      }
      return personIds;
    };

    const parsedVictimArray = JSON.parse(VictimArray);
    const parsedAccusedArray = JSON.parse(AccusedArray);
    const parsedWitnessArray = JSON.parse(WitnessArray);
    const parsedIncidentDetails = JSON.parse(IncidentDetails);

    const VictimIds = await createPersonArray(parsedVictimArray);
    const AccusedIds = await createPersonArray(parsedAccusedArray);
    const WitnessIds = await createPersonArray(parsedWitnessArray);

    const uploadedUrls = await Promise.all(
      evidences.map((file) => {
        return new Promise((resolve, reject) => {
          cloudinary.uploader.upload_large(
            file.tempFilePath,
            { resource_type: "auto" },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                console.log(result);
                resolve(result.secure_url);
              }
            }
          );
        });
      })
    );

    console.log(uploadedUrls);

    let filedBy = null;
    if (userId) {
      filedBy = new mongoose.Schema.Types.ObjectId(userId);
    }

    let firId;
    let isUnique = false;

    while (!isUnique) {
      firId = Math.floor(Math.random() * 10000);
      const existingRecord = await Complaint.findOne({ firId });

      if (!existingRecord) {
        isUnique = true;
      }
    }

    const newComplaint = await Complaint.create({
      VictimIds: VictimIds.map((id) => new mongoose.Schema.Types.ObjectId(id)),
      AccusedIds: AccusedIds.map(
        (id) => new mongoose.Schema.Types.ObjectId(id)
      ),
      WitnessIds: WitnessIds.map(
        (id) => new mongoose.Schema.Types.ObjectId(id)
      ),
      IncidentDetails: parsedIncidentDetails,
      filedBy,
      Evidence: uploadedUrls,
      firId,
    });

    if (userId) {
      await user.updateOne(
        { _id: userId },
        {
          $addToSet: {
            filedComplaints: new mongoose.Schema.Types.ObjectId(
              newComplaint._id
            ),
          },
        }
      );
    }

    res.status(200).json({
      message: "Complaint Filed Successfully",
    });
  } catch (err) {
    console.error("Error registering complaint:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
