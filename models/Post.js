import Sequelize from 'sequelize';
import db from '../config/database.js';

const Post = db.define('post', {
    titulo: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true // Esto asegura que el campo no esté vacío
        }
    },
    img: {
        type: Sequelize.STRING
    },
    descripcion: {
        type: Sequelize.STRING
    },
    likeCount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      dislikeCount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
}, {
    timestamps: false,
    tableName: 'posts'
}
);

export default Post;
