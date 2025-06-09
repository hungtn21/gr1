import React, { useState } from "react";

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
  console.log("new");
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
                      backgroundColor: "#007bff",
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
