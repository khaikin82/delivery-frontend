import { useState } from "react";
import OrdersTable from "./OrdersTable";

function MyOrders({ orders, loading, onReload, onSelectOrder }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const ORDER_STATUS_OPTIONS = [
    "CREATED",
    "ASSIGNED",
    "PICKED_UP",
    "IN_TRANSIT",
    "DELIVERED",
    "COMPLETED",
    "CANCELLED",
  ];

  // Hàm filter đơn hàng
  const filteredOrders = orders.filter((order) => {
    const matchesOrderCode = order.orderCode
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter ? order.status === statusFilter : true;

    const orderDate = new Date(order.createdAt);
    const matchesDateFrom = dateFrom ? orderDate >= new Date(dateFrom) : true;
    const matchesDateTo = dateTo
      ? orderDate <= new Date(dateTo + "T23:59:59")
      : true;

    return (
      matchesOrderCode && matchesStatus && matchesDateFrom && matchesDateTo
    );
  });

  const handleResetFilters = () => {
    setSearchTerm("");
    setStatusFilter("");
    setDateFrom("");
    setDateTo("");
  };

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Danh sách đơn hàng của tôi</h2>

      {/* Bộ lọc */}
      <div className="mb-4 grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Tìm kiếm mã đơn */}
        <input
          type="text"
          className="border px-3 py-2 rounded w-full"
          placeholder="Tìm kiếm theo Mã đơn..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Lọc trạng thái */}
        <select
          className="border px-3 py-2 rounded w-full"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">Tất cả trạng thái</option>
          {ORDER_STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
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

      {/* Nút thao tác */}
      <div className="flex justify-end space-x-2 mb-4">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer"
          onClick={onReload}
        >
          Làm mới dữ liệu
        </button>
        <button
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded cursor-pointer"
          onClick={handleResetFilters}
        >
          Đặt lại bộ lọc
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <p>Đang tải danh sách đơn hàng...</p>
      ) : filteredOrders.length === 0 ? (
        <p>Không tìm thấy đơn hàng nào phù hợp.</p>
      ) : (
        <OrdersTable orders={filteredOrders} onSelectOrder={onSelectOrder} />
      )}
    </div>
  );
}

export default MyOrders;
