const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");

class User extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        userUuid: DataTypes.UUID,
        userName: DataTypes.STRING,
        password: DataTypes.STRING,
        email: DataTypes.STRING,
        Certificate: {
          type: DataTypes.ARRAY(DataTypes.STRING),
          allowNull: true,
        },
        dateRegistered: DataTypes.DATE,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        deletedAt:DataTypes.DATE,
      },
      {
        tableName: "User",
        sequelize,
        hooks: {
          beforeCreate: async (user) => {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          }
        },
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Certificate, {
      foreignKey: "userUuid",
      sourceKey: "userUuid",
    });
    this.hasMany(models.MediaRecord, {
      foreignKey: "ownerUuid",
      sourceKey: "userUuid",
    });
  }
}

module.exports = User;
