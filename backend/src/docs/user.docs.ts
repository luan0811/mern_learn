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
 *         description: Không có quyền admin
 *
 * /api/v1/user/AdminGetAllUsers:
 *   get:
 *     summary: Lấy danh sách tất cả người dùng (Admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lấy danh sách người dùng thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *             example:
 *               - email: "john@example.com"
 *                 role: "user"
 *               - email: "admin@example.com"
 *                 role: "admin"
 *       400:
 *         description: Lỗi khi lấy dữ liệu
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: "Error fetching users"
 *       401:
 *         description: Không có quyền truy cập
 *       403:
 *         description: Không có quyền */