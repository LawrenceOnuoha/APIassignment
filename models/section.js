const Sequelize = require('sequelize');
const config = require('../config');

const Section = config.define('section', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    }

}, {timestamps: false});

module.exports = Section;