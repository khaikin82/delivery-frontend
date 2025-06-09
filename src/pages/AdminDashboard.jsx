import { useEffect, useState } from "react";
import adminAPI from "../api/adminApi";
import AdminOrdersTable from "../components/AdminOrdersTable";
import AdminStaffTable from "../components/AdminStaffTable";
import AssignStaffModal from "../components/AssignStaffModal";
import OrderDetailModal from "../components/OrderDetailModal";
import Modal from "../components/Modal";

function AdminDashboard() {
  const [selectedTab, setSelectedTab] = useState("orders"); // NEW state tab
  const [orders, setOrders] = useState([]);
  const [staffList, setStaffList] = useState([]); // NEW state staff list
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [assignModalVisible, setAssignModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await adminAPI.getOrders();
      console.log(1);
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStaff = async () => {
    setLoading(true);
    try {
      const data = await adminAPI.getDeliveryStaff();
      console.log(2);
      setStaffList(data);
    } catch (error) {
      console.error("Error fetching staff:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedTab === "orders") {
      fetchOrders();
    } else if (selectedTab === "staff") {
      fetchStaff();
    }
  }, [selectedTab]);

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
        <button
          onClick={() => setSelectedTab("orders")}
          className={`px-4 py-2 rounded ${
            selectedTab === "orders"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          Đơn hàng
        </button>
        <button
          onClick={() => setSelectedTab("staff")}
          className={`px-4 py-2 rounded cursor-pointer ${
            selectedTab === "staff"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          Nhân viên
        </button>
      </div>

      {/* Tab content */}
      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : selectedTab === "orders" ? (
        <AdminOrdersTable
          orders={orders}
          onSelectOrder={handleViewDetailClick}
          onAssignOrder={handleAssignClick}
        />
      ) : (
        <AdminStaffTable staffList={staffList} />
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
