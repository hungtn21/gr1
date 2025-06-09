import { useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import * as XLSX from "xlsx";
import "../src/TIMES-normal";
export default function DataTable() {
  const [form, setForm] = useState({
    mssv: "",
    name: "",
    dob: "",
    email: "",
  });
  const [data, setData] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAdd = () => {
    if (form.mssv && form.name && form.dob && form.email) {
      setData([...data, form]);
      setForm({ mssv: "", name: "", dob: "", email: "" });
    } else {
      alert("Vui lòng điền đầy đủ thông tin!");
    }
  };

  const handleDelete = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  // Xuất file Excel
  const exportToExcel = () => {
    if (data.length === 0) {
      alert("Không có dữ liệu để xuất!");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(
      data.map((item, index) => ({
        STT: index + 1,
        MSSV: item.mssv,
        "Họ tên": item.name,
        "Ngày sinh": item.dob,
        Email: item.email,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Danh sách sinh viên");
    XLSX.writeFile(workbook, "danh_sach_sinh_vien.xlsx");
  };

  // Xuất file PDF
  const exportToPDF = () => {
    if (data.length === 0) {
      alert("Không có dữ liệu để xuất!");
      return;
    }

    const doc = new jsPDF();
    
    // Tiêu đề
    doc.setFont("TIMES", "normal");
    doc.setFontSize(16);
    doc.text("DANH SÁCH SINH VIÊN", 105, 15, { align: "center" });
    
    // Bảng dữ liệu
    const headers = [["STT", "MSSV", "Họ tên", "Ngày sinh", "Email"]];
    const pdfData = data.map((student, index) => [
      index + 1,
      student.mssv,
      student.name,
      student.dob,
      student.email,
    ]);

    autoTable(doc,{
    head: headers,
    body: pdfData,
    startY: 20,
    styles: {
        font: "TIMES",
        fontSize: 10,
        cellPadding: 3,
        valign: "middle",
    },
    headStyles: {
        font: "TIMES",
        fontStyle: "bold",
        fillColor: [22, 160, 133],
        textColor: 255,
    },
    bodyStyles: {
        font: "TIMES",
    },
    columnStyles: {
        0: { font: "TIMES" },
        1: { font: "TIMES" },
        2: { font: "TIMES" },
        3: { font: "TIMES" },
        4: { font: "TIMES" },
    },
    });

    doc.save("danh_sach_sinh_vien.pdf");
  };

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          gap: "16px",
          marginBottom: "10px",
          justifyContent: "flex-end",
        }}
      >
        <input
          type="text"
          name="mssv"
          placeholder="MSSV"
          value={form.mssv}
          onChange={handleChange}
          style={{ padding: "10px", width: "200px" }}
        />
        <input
          type="text"
          name="name"
          placeholder="Họ và tên"
          value={form.name}
          onChange={handleChange}
          style={{ padding: "10px", width: "200px" }}
        />
      </div>
      <div
        style={{
          display: "flex",
          gap: "16px",
          marginBottom: "10px",
          justifyContent: "flex-end",
        }}
      >
        <input
          type="date"
          name="dob"
          placeholder="Ngày sinh"
          value={form.dob}
          onChange={handleChange}
          style={{ padding: "10px", width: "200px" }}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          style={{ padding: "10px", width: "200px" }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "16px",
          marginBottom: "10px",
        }}
      >
        <button
          onClick={handleAdd}
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            padding: "12px 32px",
            border: "none",
            fontSize: "16px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Thêm
        </button>
        <button
          onClick={exportToExcel}
          style={{
            backgroundColor: "#28a745",
            color: "#fff",
            padding: "12px 32px",
            border: "none",
            fontSize: "16px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Xuất Excel
        </button>
        <button
          onClick={exportToPDF}
          style={{
            backgroundColor: "#dc3545",
            color: "#fff",
            padding: "12px 32px",
            border: "none",
            fontSize: "16px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Xuất PDF
        </button>
      </div>
      <table
        border="1"
        cellPadding="8"
        style={{ width: "100%", textAlign: "center" }}
      >
        <thead>
          <tr>
            <th>STT</th>
            <th>MSSV</th>
            <th>Họ tên</th>
            <th>Ngày sinh</th>
            <th>Email</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {data.map((student, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{student.mssv}</td>
              <td>{student.name}</td>
              <td>{student.dob}</td>
              <td>{student.email}</td>
              <td>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <button
                    onClick={() => handleDelete(index)}
                    style={{
                      backgroundColor: "#dc3545",
                      color: "#fff",
                      fontSize: "16px",
                      padding: "12px 32px",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    Xóa
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}