const Sequelize = require("sequelize");

class MediaRecord extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        mediaId: DataTypes.INTEGER,
        mediaUid: DataTypes.UUID,
        ownerUuid: DataTypes.STRING,
        hash: DataTypes.STRING,
        contentType: DataTypes.STRING,
        dateRegistered: DataTypes.DATE,
      },
      {
        tableName: "MediaRecord",
        sequelize,
        hooks: {},
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'ownerUuid', targetKey: 'userUid' });
  }
}

module.exports = MediaRecord;
