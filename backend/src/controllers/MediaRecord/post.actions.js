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

    const certificateNumber = generateUniqueCertificateNumber();

    const newCertificate = await Certificate.create({
      CertificateNumber: certificateNumber,
      userUuid: userUuid,
    });

    const user = await User.findOne({ where: { userUuid } });
    console.log("Fetched user:", user);

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
