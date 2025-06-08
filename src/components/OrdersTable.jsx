function OrdersTable({ orders, onSelectOrder }) {
  return (
    <table className="w-full border-collapse border border-gray-300 text-sm">
      <thead>
        <tr className="bg-gray-100">
          <th className="border px-2 py-1">Mã đơn</th>
          <th className="border px-2 py-1">Mô tả</th>
          <th className="border px-2 py-1">Người nhận</th>
          <th className="border px-2 py-1">Địa chỉ giao</th>
          <th className="border px-2 py-1">Trạng thái</th>
          <th className="border px-2 py-1">Ngày tạo</th>
          <th className="border px-2 py-1">Hành động</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.orderCode}>
            <td className="border px-2 py-1">{order.orderCode}</td>
            <td className="border px-2 py-1">{order.description}</td>
            <td className="border px-2 py-1">{order.receiverName}</td>
            <td className="border px-2 py-1">{order.deliveryAddress}</td>
            <td className="border px-2 py-1">{order.status}</td>
            <td className="border px-2 py-1">
              {new Date(order.createdAt).toLocaleString()}
            </td>
            <td className="border px-2 py-1 text-center">
              <button
                className="text-blue-600 underline hover:text-blue-800"
                onClick={() => onSelectOrder(order)}
              >
                Xem chi tiết
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default OrdersTable;
