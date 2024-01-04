const Sequelize = require("sequelize");

class Certificate extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        CertificateNumber: DataTypes.INTEGER,
        userUid: DataTypes.STRING,
      },
      {
        tableName: "Certificate",
        sequelize,
        hooks: {},
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: "userUid",
      targetKey: "userUid",
    });
  }
}

module.exports = Certificate;
