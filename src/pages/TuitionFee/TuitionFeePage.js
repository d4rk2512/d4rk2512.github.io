import { useState, useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import Header from "../../Layout/Header";
import { studentIdsAtom, studentByIdAtom } from "../../store/atom/student";
import { tutitionFeeById } from "../../store/atom/tutitionFee";
import { studentMonthlyFeesSelector } from "../../store/computed";

export default function TuitionFeePage() {
  const studentIds = useRecoilValue(studentIdsAtom);
  const allFees = useRecoilValue(studentMonthlyFeesSelector);

  const studentsWithFees = studentIds.filter(
    (id) => allFees[id] && Object.keys(allFees[id]).length > 0
  );

  return (
    <div>
      <Header />
      <h1>Học phí</h1>
      {studentsWithFees.length === 0 ? (
        <p style={{ color: "#999" }}>
          Chưa có dữ liệu học phí. Hãy điểm danh trước.
        </p>
      ) : (
        studentsWithFees.map((id) => (
          <StudentFeeSection key={id} id={id} />
        ))
      )}
    </div>
  );
}

function StudentFeeSection({ id }) {
  const student = useRecoilValue(studentByIdAtom(id));
  const allFees = useRecoilValue(studentMonthlyFeesSelector);
  const [paidData, setPaidData] = useRecoilState(tutitionFeeById(id));

  const studentFees = allFees[id] || {};
  const months = Object.keys(studentFees).sort();

  const updatePaid = (month, amount) => {
    setPaidData((prev) => ({
      ...prev,
      [month]: {
        ...(prev?.[month] || {}),
        total: studentFees[month],
        paid: amount,
      },
    }));
  };

  const totalOwed = months.reduce((sum, m) => sum + studentFees[m], 0);
  const totalPaid = months.reduce(
    (sum, m) => sum + (paidData?.[m]?.paid || 0),
    0
  );

  return (
    <div
      style={{
        marginBottom: 24,
        border: "1px solid #ccc",
        padding: 16,
        borderRadius: 8,
      }}
    >
      <h3 style={{ marginTop: 0 }}>
        {student?.name}{" "}
        <span style={{ fontSize: 14, fontWeight: "normal", color: totalOwed - totalPaid > 0 ? "red" : "green" }}>
          (Còn thiếu: {(totalOwed - totalPaid).toLocaleString()}đ)
        </span>
      </h3>
      <table border="1" cellPadding="8" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Tháng</th>
            <th>Tổng phí</th>
            <th>Đã nộp</th>
            <th>Còn thiếu</th>
            <th>Cập nhật</th>
          </tr>
        </thead>
        <tbody>
          {months.map((month) => (
            <MonthFeeRow
              key={month}
              month={month}
              total={studentFees[month]}
              paid={paidData?.[month]?.paid || 0}
              onUpdatePaid={(amount) => updatePaid(month, amount)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MonthFeeRow({ month, total, paid, onUpdatePaid }) {
  const [editPaid, setEditPaid] = useState(paid);
  const displayMonth = `${month.substring(0, 4)}/${month.substring(4, 6)}`;
  const remaining = total - paid;

  useEffect(() => {
    setEditPaid(paid);
  }, [paid]);

  return (
    <tr>
      <td>{displayMonth}</td>
      <td>{total.toLocaleString()}đ</td>
      <td>
        <input
          type="number"
          value={editPaid}
          min={0}
          max={total}
          onChange={(e) => setEditPaid(Number(e.target.value))}
          style={{ width: 90 }}
        />
        đ
      </td>
      <td style={{ color: remaining > 0 ? "red" : "green" }}>
        {remaining.toLocaleString()}đ
      </td>
      <td>
        <button onClick={() => onUpdatePaid(editPaid)}>Lưu</button>
      </td>
    </tr>
  );
}
