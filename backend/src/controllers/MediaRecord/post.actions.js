const models = require("../../models");
const crypto = require("crypto");
const fs = require("fs");
const formidable = require("formidable");
const User = models.User;
const MediaRecord = models.MediaRecord;

async function createNewMediaRecord(req, res) {
  const userUuid = req.params.uuid;
  const { hash, contentType } = req.body;

  try {
    const existingRecord = await MediaRecord.findOne({
      where: { hash },
      include: [
        {
          model: User,
          attributes: ["userName"],
        },
      ],
    });


    if (existingRecord) {
      console.log("Duplicate file detected");
      return res.status(409).json({
        message: "Duplicate file detected",
        ownerName: existingRecord.User.userName,
      });
    }

    const newRecord = await MediaRecord.create({
      ownerUuid: userUuid,
      hash: hash,
      contentType: contentType,
    });

    res.status(201).json({ message: "File uploaded successfully", newRecord });
  } catch (error) {
    console.error("Error in createNewMediaRecord:", error);
    res.status(500).send("Error processing file upload");
  }
}

module.exports = {
  createNewMediaRecord,
};
