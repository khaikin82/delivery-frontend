import { useState } from "react";

const ORDER_STATUS_OPTIONS = [
  "",
  "CREATED",
  "ASSIGNED",
  "PICKED_UP",
  "IN_TRANSIT",
  "DELIVERED",
  "COMPLETED",
  "CANCELLED",
];

function AdminOrdersTable({ orders, onSelectOrder, onAssignOrder }) {
  const [statusFilter, setStatusFilter] = useState("");
  const [hasDeliveryStaffFilter, setHasDeliveryStaffFilter] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  // Lọc đơn hàng theo các filter đã chọn
  const filteredOrders = orders.filter((order) => {
    // Lọc trạng thái
    const matchesStatus = statusFilter ? order.status === statusFilter : true;

    // Lọc có người giao hay chưa
    const matchesHasDeliveryStaff =
      hasDeliveryStaffFilter === ""
        ? true
        : hasDeliveryStaffFilter === "yes"
        ? Boolean(order.deliveryStaffUsername)
        : !order.deliveryStaffUsername;

    // Lọc theo khoảng ngày tạo đơn
    const orderDate = new Date(order.createdAt);
    const matchesDateFrom = dateFrom ? orderDate >= new Date(dateFrom) : true;
    const matchesDateTo = dateTo
      ? orderDate <= new Date(dateTo + "T23:59:59")
      : true;

    return (
      matchesStatus &&
      matchesHasDeliveryStaff &&
      matchesDateFrom &&
      matchesDateTo
    );
  });

  const handleResetFilters = () => {
    setStatusFilter("");
    setHasDeliveryStaffFilter("");
    setDateFrom("");
    setDateTo("");
  };

  return (
    <div>
      {/* Bộ lọc */}
      <div className="mb-4 grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Lọc trạng thái */}
        <select
          className="border px-3 py-2 rounded w-full"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          {ORDER_STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {status === "" ? "Tất cả trạng thái" : status}
            </option>
          ))}
        </select>

        {/* Lọc có người giao hay chưa */}
        <select
          className="border px-3 py-2 rounded w-full"
          value={hasDeliveryStaffFilter}
          onChange={(e) => setHasDeliveryStaffFilter(e.target.value)}
        >
          <option value="">Tất cả đơn</option>
          <option value="yes">Có người giao</option>
          <option value="no">Chưa giao</option>
        </select>

        {/* Lọc từ ngày */}
        <input
          type="date"
          className="border px-3 py-2 rounded w-full"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
        />

        {/* Lọc đến ngày */}
        <input
          type="date"
          className="border px-3 py-2 rounded w-full"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
        />
      </div>

      {/* Nút reset */}
      <div className="flex justify-end mb-4">
        <button
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded cursor-pointer"
          onClick={handleResetFilters}
        >
          Đặt lại bộ lọc
        </button>
      </div>

      {/* Bảng đơn hàng */}
      <table className="w-full border-collapse border border-gray-300 text-sm">
        <thead>
          <tr className="bg-blue-300">
            <th className="border px-2 py-1">Mã đơn</th>
            <th className="border px-2 py-1">Người nhận</th>
            <th className="border px-2 py-1">Địa chỉ giao</th>
            <th className="border px-2 py-1">Địa chỉ lấy</th>
            <th className="border px-2 py-1">Mô tả</th>
            <th className="border px-2 py-1">Trạng thái</th>
            <th className="border px-2 py-1">Người giao</th>
            <th className="border px-2 py-1">Ngày tạo</th>
            <th className="border px-2 py-1">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.length === 0 ? (
            <tr>
              <td
                colSpan={9}
                className="border px-2 py-1 text-center text-gray-500"
              >
                Không tìm thấy đơn hàng nào phù hợp.
              </td>
            </tr>
          ) : (
            filteredOrders.map((order, index) => {
              const rowClass = index % 2 === 0 ? "bg-white" : "bg-blue-50";

              return (
                <tr key={order.orderCode} className={`${rowClass}`}>
                  <td className="border px-2 py-1">{order.orderCode}</td>
                  <td className="border px-2 py-1">{order.receiverName}</td>
                  <td className="border px-2 py-1">{order.receiverAddress}</td>
                  <td className="border px-2 py-1">{order.pickupAddress}</td>
                  <td className="border px-2 py-1">{order.description}</td>
                  <td className="border px-2 py-1">{order.status}</td>
                  <td className="border px-2 py-1">
                    {order.deliveryStaffUsername || "Chưa giao"}
                  </td>
                  <td className="border px-2 py-1">
                    {new Date(order.createdAt).toLocaleDateString("vi-VN", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </td>
                  <td className="border px-2 py-1 text-center space-x-2">
                    <button
                      className="text-blue-600 underline hover:text-blue-900 cursor-pointer"
                      onClick={() => onSelectOrder(order)}
                    >
                      Xem chi tiết
                    </button>
                    <button
                      className="text-green-600 underline hover:text-green-900 cursor-pointer"
                      onClick={() => onAssignOrder(order)}
                    >
                      Giao đơn
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminOrdersTable;
