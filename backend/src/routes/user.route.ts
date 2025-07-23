import express from 'express';
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Quản lý người dùng
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Lấy danh sách người dùng
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Danh sách người dùng
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: John Doe
 */
router.get('/', (req, res) => {
  res.json([
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' }
  ]);
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Tạo mới người dùng
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             required:
 *               - name
 *     responses:
 *       201:
 *         description: Người dùng đã được tạo
 */
router.post('/', (req, res) => {
  const { name } = req.body;
  res.status(201).json({ id: '3', name });
});

export default router;
