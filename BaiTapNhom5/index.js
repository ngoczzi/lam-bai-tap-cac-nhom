require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// MW: Logger - ghi [time] METHOD /path ra console
app.use((req, res, next) => {
    const time = new Date().toISOString();
    console.log(`[${time}] ${req.method} ${req.path}`);
    next();
});

// Middleware để parse body dạng JSON
app.use(express.json());

// STATIC: phục vụ file tĩnh trong thư mục public
app.use(express.static(path.join(__dirname, 'public')));

// MW: checkAge - kiểm tra tuổi
const checkAge = (req, res, next) => {
    // Lấy tuổi từ query (cho GET) hoặc body (cho POST)
    const age = req.query.age || req.body.age;
    
    if (!age || isNaN(age) || parseInt(age) < 18) {
        return res.status(400).json({ error: 'Tuổi phải từ 18 trở lên hoặc không được cung cấp.' });
    }
    
    req.validatedAge = parseInt(age);
    next();
};

// GET /api/info - gắn middleware checkAge
app.get('/api/info', checkAge, (req, res) => {
    const name = req.query.name;
    const age = req.validatedAge;
    
    if (!name) {
        return res.status(400).json({ error: 'Tên không được để trống.' });
    }
    
    res.json({
        name: name,
        age: age,
        message: `Chào mừng ${name}! Cảm ơn bạn đã xác nhận bạn ${age} tuổi.`
    });
});

let autoIncrementId = 1;

// POST /api/register - validate dữ liệu đầu vào
app.post('/api/register', (req, res) => {
    const { name, age, email } = req.body;
    
    if (!name || !age || !email) {
        return res.status(400).json({ error: 'Tên, tuổi và email không được để trống.' });
    }
    
    // Tạo thông tin người dùng với ID tự tăng
    const userInfo = {
        id: autoIncrementId++,
        name,
        age: parseInt(age),
        email,
        message: 'Đăng ký thành công!'
    };
    
    res.json(userInfo);
});

app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
