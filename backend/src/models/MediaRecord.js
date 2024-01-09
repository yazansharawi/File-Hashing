const Sequelize = require("sequelize");

class MediaRecord extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        mediaUuid: DataTypes.UUID,
        ownerUuid: DataTypes.UUID,
        hash: DataTypes.STRING,
        contentType: DataTypes.STRING,
        dateRegistered: DataTypes.DATE,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        deletedAt: DataTypes.DATE,
      },
      {
        tableName: "MediaRecord",
        sequelize,
        hooks: {},
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: "ownerUuid",
      targetKey: "userUuid",
    });
  }
}

module.exports = MediaRecord;
