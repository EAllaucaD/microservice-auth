const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const authRoutes = require('./routes/authRoutes');
const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);

// Configurar Swagger
const swaggerDocument = YAML.load('./swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3003;

// Conectar a MongoDB
mongoose.connect('mongodb://mongo:27017/auth_service', { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(PORT, () => {
    console.log(`Auth service running on port ${PORT}`);
});
