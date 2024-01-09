const Sequelize = require("sequelize");

class Certificate extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        CertificateNumber: DataTypes.STRING,
        userUuid: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        deletedAt:DataTypes.DATE,
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
      foreignKey: "userUuid",
      targetKey: "userUuid",
    });
  }
}

module.exports = Certificate;
