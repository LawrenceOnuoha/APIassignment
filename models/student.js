const Sequelize = require('sequelize');
const config = require('./../config');

const Student = config.define('student', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    section: {
        type: Sequelize.STRING,
        allowNull: false
    },
    gpa: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    nationality: {
        type: Sequelize.STRING,
        allowNull: true
    },
}, {timestamps: false});

module.exports = Student;