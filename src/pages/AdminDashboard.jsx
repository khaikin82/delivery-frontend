import { useEffect, useState } from "react";
import adminAPI from "../api/adminApi";
import AdminOrdersTable from "../components/AdminOrdersTable";
import AdminStaffTable from "../components/AdminStaffTable";
import AssignStaffModal from "../components/AssignStaffModal";
import OrderDetailModal from "../components/OrderDetailModal";
import Pagination from "../components/Pagination";
import Modal from "../components/Modal";
import usePaginatedData from "../hooks/usePaginatedData";

function AdminDashboard() {
  const pageSize = 10;

  const [selectedTab, setSelectedTab] = useState("orders");
  const {
    data: orders,
    page: orderPage,
    setPage: setOrderPage,
    totalPages: orderTotalPages,
    loading: loadingOrders,
    refetch: fetchOrders,
  } = usePaginatedData(adminAPI.getOrders, [selectedTab === "orders"]);

  const {
    data: staffList,
    page: staffPage,
    setPage: setStaffPage,
    totalPages: staffTotalPages,
    loading: loadingStaff,
    refetch: fetchStaff,
  } = usePaginatedData(adminAPI.getDeliveryStaff, [selectedTab === "staff"]);

  // Modals & selected order state
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [assignModalVisible, setAssignModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);

  const handleAssignClick = (order) => {
    setSelectedOrder(order);
    setAssignModalVisible(true);
  };

  const handleViewDetailClick = (order) => {
    setSelectedOrder(order);
    setDetailModalVisible(true);
  };

  const handleAssignStaff = async (staffUsername) => {
    if (!selectedOrder) {
      console.error("No order selected for assigning staff");
      return;
    }

    try {
      await adminAPI.assignOrderToStaff(selectedOrder.orderCode, staffUsername);
      setAssignModalVisible(false);
      setSelectedOrder(null);
      fetchOrders();
      alert("Giao đơn thành công!");
    } catch (error) {
      console.error("Error assigning staff:", error);
      alert("Giao đơn thất bại, vui lòng thử lại.");
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Tab buttons */}
      <div className="mb-6 flex space-x-4">
        {["orders", "staff"].map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`px-4 py-2 rounded cursor-pointer ${
              selectedTab === tab
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            {tab === "orders" ? "Đơn hàng" : "Nhân viên"}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {selectedTab === "orders" ? (
        <>
          <AdminOrdersTable
            orders={orders}
            onSelectOrder={handleViewDetailClick}
            onAssignOrder={handleAssignClick}
            currentPage={orderPage}
            pageSize={pageSize}
          />
          <Pagination
            currentPage={orderPage}
            totalPages={orderTotalPages}
            onPageChange={setOrderPage}
          />
        </>
      ) : (
        <>
          <AdminStaffTable
            staffList={staffList}
            currentPage={staffPage}
            pageSize={pageSize}
          />
          <Pagination
            currentPage={staffPage}
            totalPages={staffTotalPages}
            onPageChange={setStaffPage}
          />
        </>
      )}

      {assignModalVisible && (
        <AssignStaffModal
          visible={assignModalVisible}
          onClose={() => {
            setAssignModalVisible(false);
            setSelectedOrder(null);
          }}
          onAssign={handleAssignStaff}
        />
      )}

      {detailModalVisible && (
        <Modal
          visible={true}
          message={<OrderDetailModal order={selectedOrder} />}
          onClose={() => {
            setDetailModalVisible(false);
            setSelectedOrder(null);
          }}
        />
      )}
    </div>
  );
}

export default AdminDashboard;
