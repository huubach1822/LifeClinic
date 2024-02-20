const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('doctor', {
    ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'account',
        key: 'ID'
      }
    },
    Name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    DateOfBirth: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Phone: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Price: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Avatar: {
      type: DataTypes.BLOB,
      allowNull: true
    },
    Gender: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    ID_clinic: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'clinic',
        key: 'ID'
      }
    },
    ID_speciality: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'speciality',
        key: 'ID'
      }
    },
    ID_degree: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'degree',
        key: 'ID'
      }
    }
  }, {
    sequelize,
    tableName: 'doctor',
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
      {
        name: "ID_speciality",
        using: "BTREE",
        fields: [
          { name: "ID_speciality" },
        ]
      },
      {
        name: "ID_degree",
        using: "BTREE",
        fields: [
          { name: "ID_degree" },
        ]
      },
    ]
  });
};
