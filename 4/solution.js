import postgres from "postgres";

const config = {
  host: "127.0.0.1",
  user: "postgres",
  password: "",
  port: 5432,
};

// BEGIN (write your solution here)
const bookingRoom = async (user, roomNumber, price) => {
  const client = postgres(config);

  let userId, roomId, orderId;
  await client.begin(async (transaction) => {
    try {
      const userResult = await transaction`
        INSERT INTO users (username, phone)
        VALUES (${user.username}, ${user.phone}) RETURNING id;
      `;
      userId = userResult[0].id;

      const roomResult = await transaction`
        SELECT id
        FROM rooms
        WHERE room_number = ${roomNumber};
      `;

      if (roomResult.length === 0) {
        throw new Error(`Комната с номером ${roomNumber} не существует.`);
      }
      roomId = roomResult[0].id;

      const orderResult = await transaction`
        INSERT INTO orders (user_id, room_id, price)
        VALUES (${userId}, ${roomId}, ${price}) RETURNING id;
      `;
      orderId = orderResult[0].id;

      await transaction`
        UPDATE rooms
        SET status = 'reserved'
        WHERE id = ${roomId};
      `;

    } catch (error) {
      throw new Error('Бронирование невозможно: ' + error.message);
    }
  });

  return {
    userId,
    orderId,
  };
};


export default bookingRoom;
// END
