import { useState, useEffect } from "react";
import userAPI from "../api/userApi";
import Modal from "../components/Modal";
import CreateOrderForm from "../components/CreateOrderForm";
import MyOrders from "../components/MyOrders";
import OrderDetailModal from "../components/OrderDetailModal";

function CustomerDashboard() {
  const [tab, setTab] = useState("create"); // "create" | "myOrders"
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = async () => {
    setLoadingOrders(true);
    try {
      const res = await userAPI.getMyOrders();
      setOrders(res);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    if (tab === "myOrders") {
      fetchOrders();
    }
  }, [tab]);

  return (
    <div className="p-8 max-w-5xl mx-auto pt-1">
      <h1 className="text-3xl font-bold mb-2">Customer Dashboard</h1>
      <p className="mb-6 text-gray-700">
        Welcome to your Customer Dashboard. You can place orders and track their
        status here.
      </p>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded cursor-pointer ${
            tab === "create"
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => setTab("create")}
        >
          Tạo đơn hàng
        </button>
        <button
          className={`px-4 py-2 rounded cursor-pointer ${
            tab === "myOrders"
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => setTab("myOrders")}
        >
          Đơn hàng của tôi
        </button>
      </div>

      {/* Nội dung từng tab */}
      {tab === "create" && (
        <div className="bg-white p-6 rounded shadow-md">
          <CreateOrderForm
            onSuccess={(message) => {
              setModalMessage(message);
              setModalVisible(true);

              if (tab === "myOrders") {
                fetchOrders();
              }
            }}
          />
        </div>
      )}

      {tab === "myOrders" && (
        <MyOrders
          orders={orders}
          loading={loadingOrders}
          onReload={fetchOrders}
          onSelectOrder={setSelectedOrder}
        />
      )}

      {/* Modal thông báo */}
      <Modal
        visible={modalVisible}
        message={modalMessage}
        onClose={() => setModalVisible(false)}
      />

      {/* Modal chi tiết order */}
      {selectedOrder && (
        <Modal
          visible={true}
          message={<OrderDetailModal order={selectedOrder} />}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
}

export default CustomerDashboard;
