const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('clinic', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Short_Description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Logo: {
      type: DataTypes.BLOB,
      allowNull: true
    },
    Address: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Latitude: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Longitude: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    ID_city: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'city',
        key: 'ID'
      }
    }
  }, {
    sequelize,
    tableName: 'clinic',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID" },
        ]
      },
      {
        name: "ID_city",
        using: "BTREE",
        fields: [
          { name: "ID_city" },
        ]
      },
    ]
  });
};
