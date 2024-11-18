document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("sidebar");
  const menuToggle = document.getElementById("menu-toggle");
  const closeBtn = document.getElementById("close-btn");
  const dataTableBody = document.getElementById("data-table-body");

  // فتح السايدبار عند النقر على زر ☰
  menuToggle.addEventListener("click", () => {
    sidebar.classList.add("active");
    localStorage.setItem("isMenuOpen", "true");
  });

  // غلق السايدبار عند النقر على زر ×
  closeBtn.addEventListener("click", () => {
    sidebar.classList.remove("active");
    localStorage.setItem("isMenuOpen", "false");
  });

  // إضافة البيانات إلى الأرشيف مع التاريخ
  function addDataToArchive(predictedInfo, value) {
    const currentDate = new Date().toLocaleString(); // الحصول على التاريخ والوقت الحالي
    const archiveData = JSON.parse(localStorage.getItem("dataArchive")) || [];

    // إضافة البيانات الجديدة إلى الأرشيف
    archiveData.push({ predictedInfo, value, date: currentDate });
    localStorage.setItem("dataArchive", JSON.stringify(archiveData));
  }

  // عرض البيانات في الجدول
  function displayData() {
    const archiveData = JSON.parse(localStorage.getItem("dataArchive")) || [];
    dataTableBody.innerHTML = ""; // مسح البيانات القديمة من الجدول

    // إضافة كل صف من البيانات إلى الجدول
    archiveData.forEach((data) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${data.predictedInfo}</td>
        <td>${data.value}</td>
        <td>${data.date}</td>
      `;
      dataTableBody.appendChild(row);
    });
  }

  // استدعاء الدالة لعرض البيانات عند تحميل الصفحة
  displayData();
});
