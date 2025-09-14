const db = require('../config/db');

async function createSubscription(userId, durationInDays) {
  const now = new Date();
  const end = new Date();
  end.setDate(now.getDate() + durationInDays);

  await db.execute(
    `INSERT INTO subscriptions (user_id, start_date, end_date, status) 
     VALUES (?, ?, ?, 'ativo')`,
    [userId, now, end]
  );
}

async function getSubscriptionByUserId(userId) {
  const [rows] = await db.execute(
    `SELECT * FROM subscriptions WHERE user_id = ? ORDER BY end_date DESC LIMIT 1`,
    [userId]
  );
  return rows[0];
}

async function expireSubscriptions(id) {
  await db.execute(
    `UPDATE subscriptions SET status = 'expirado' 
     WHERE user_id = ? `,[id]
  );
}

module.exports = {
  createSubscription,
  getSubscriptionByUserId,
  expireSubscriptions
};
