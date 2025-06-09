// components/AdminStaffTable.js
function DeliveryStaffTable({ staffList }) {
  return (
    <table className="w-full border">
      <thead>
        <tr className="bg-gray-200">
          <th className="py-2 px-4 border">Username</th>
          <th className="py-2 px-4 border">Full Name</th>
          <th className="py-2 px-4 border">Email</th>
          <th className="py-2 px-4 border">Phone</th>
        </tr>
      </thead>
      <tbody>
        {staffList.map((staff, index) => {
          const rowClass = index % 2 === 0 ? "bg-white" : "bg-gray-100";

          return (
            <tr key={staff.username} className={`${rowClass}`}>
              <td className="py-2 px-4 border">{staff.username}</td>
              <td className="py-2 px-4 border">{staff.fullName}</td>
              <td className="py-2 px-4 border">{staff.email}</td>
              <td className="py-2 px-4 border">{staff.phone}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default DeliveryStaffTable;
