const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('blog', {
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
    Date: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Image: {
      type: DataTypes.BLOB,
      allowNull: true
    },
    ID_account: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'account',
        key: 'ID'
      }
    }
  }, {
    sequelize,
    tableName: 'blog',
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
        name: "ID_account",
        using: "BTREE",
        fields: [
          { name: "ID_account" },
        ]
      },
    ]
  });
};
