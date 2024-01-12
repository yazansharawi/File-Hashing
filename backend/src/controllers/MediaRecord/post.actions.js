const models = require("../../models");
const User = models.User;
const MediaRecord = models.MediaRecord;
const Certificate = models.Certificate;

async function createNewMediaRecord(req, res) {
  const userUuid = req.params.uuid;
  const { hash, contentType } = req.body;

  try {
    const existingRecord = await MediaRecord.findOne({
      where: { hash },
    });

    const user = await User.findOne({ where: { userUuid } });

    if (existingRecord) {
      let sameUser = false;
      let existingHolder = null;
      let uuid = existingRecord.dataValues.ownerUuid;
      console.log("Duplicate file detected");
      if (user.userUuid === existingRecord.dataValues.ownerUuid) {
        sameUser = true;
      } else {
        existingHolder = await User.findOne({ where: { userUuid: uuid } });
      }
      return res.status(409).json({
        message: "Duplicate file detected",
        ownerName: sameUser
          ? "Already Registered By You"
          : existingHolder.userName,
      });
    }

    const newRecord = await MediaRecord.create({
      ownerUuid: userUuid,
      hash: hash,
      contentType: contentType,
    });

    const certificateNumber = generateUniqueCertificateNumber();
    const newCertificate = await Certificate.create({
      CertificateNumber: certificateNumber,
      userUuid: userUuid,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    let certificates = user.Certificate ? JSON.parse(user.Certificate) : [];

    certificates.push(certificateNumber.toString());
    await User.update(
      { Certificate: JSON.stringify(certificates) },
      { where: { userUuid: userUuid } }
    );

    res.status(201).json({
      message: "File uploaded successfully",
      newRecord,
      newCertificate,
    });
  } catch (error) {
    console.error("Error in createNewMediaRecord:", error);
    res.status(500).send("Error processing file upload");
  }
}

function generateUniqueCertificateNumber() {
  return new Date().getTime();
}

module.exports = {
  createNewMediaRecord,
};
