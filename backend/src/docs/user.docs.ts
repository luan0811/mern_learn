/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: Tên người dùng
 *         email:
 *           type: string
 *           format: email
 *           description: Email người dùng
 *         password:
 *           type: string
 *           description: Mật khẩu người dùng
 *         role:
 *           type: string
 *           enum: [user, admin]
 *           default: user
 *           description: Vai trò của người dùng
 *       example:
 *         username: "john_doe"
 *         email: "john@example.com"
 *         password: "password123"
 *         role: "user"
 *     UserResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         user:
 *           $ref: '#/components/schemas/User'
 *       example:
 *         message: "User created successfully"
 *         user:
 *           username: "john_doe"
 *           email: "john@example.com"
 *           role: "user"
 *
 * /api/v1/user/AdminCreateUser:
 *   post:
 *     summary: Tạo người dùng mới (Admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Tạo người dùng thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       400:
 *         description: Lỗi validation hoặc người dùng đã tồn tại
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: "Email already exists"
 *       401:
 *         description: Không có quyền truy cập
 *       403:
 *         description: Không có quyền admin */