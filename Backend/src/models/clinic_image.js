const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('clinic_image', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Image: {
      type: DataTypes.BLOB,
      allowNull: true
    },
    ID_clinic: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'clinic',
        key: 'ID'
      }
    }
  }, {
    sequelize,
    tableName: 'clinic_image',
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
        name: "ID_clinic",
        using: "BTREE",
        fields: [
          { name: "ID_clinic" },
        ]
      },
    ]
  });
};
