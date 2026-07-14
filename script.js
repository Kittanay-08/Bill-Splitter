// 1. ดึง Elements จาก HTML มาเก็บไว้ในตัวแปรเพื่อรอใช้งาน
const billForm = document.getElementById('billForm');
const totalBillInput = document.getElementById('totalBill');
const peopleCountInput = document.getElementById('peopleCount');
const serviceChargeSelect = document.getElementById('serviceCharge');
const resultContainer = document.getElementById('resultContainer');

// 2. ผูก Event Listener เข้ากับ Form เมื่อมีการกด Submit 
billForm.addEventListener('submit', function (event) {
    // ป้องกันการรีเฟรชหน้าจอของฟอร์มตามค่าเริ่มต้นของ Browser
    event.preventDefault();

    // 3. ดึงค่าจากอินพุตแปลงเป็นตัวเลข (ดึงค่า .value แล้วเปลี่ยนเป็นตัวเลขด้วย Number() หรือ parseFloat())
    const totalBill = Number(totalBillInput.value);
    const peopleCount = Number(peopleCountInput.value);
    const serviceChargePercent = Number(serviceChargeSelect.value);

    // 4. Validation ตรวจสอบความถูกต้องเพื่อป้องกันโปรแกรมพัง (Defensive Programming)
    if (totalBill <= 0 || peopleCount <= 0) {
        alert('กรุณากรอกข้อมูลตัวเลขที่มากกว่า 0 ด้วยครับ');
        return; // สั่งหยุดทำงานทันทีถ้าเงื่อนไขไม่ผ่าน
    }

    // 5. ขั้นตอนการคำนวณทางคณิตศาสตร์
    const serviceChargeTotal = totalBill * (serviceChargePercent / 100); // หาจำนวนเงิน Service Charge ทั้งหมด
    const netTotalBill = totalBill + serviceChargeTotal;                // ยอดรวมบิล + Service Charge
    
    // คำนวณยอดต่อคนแยกตามสัดส่วน
    const billPerPerson = totalBill / peopleCount;
    const servicePerPerson = serviceChargeTotal / peopleCount;
    const totalPerPerson = netTotalBill / peopleCount;

    // 6. แสดงผลลัพธ์ด้วย Template Literal 
    resultContainer.innerHTML = `
        <div class="result-item">
            <span>ค่าอาหารต่อคน:</span>
            <strong>${billPerPerson.toFixed(2)} บาท</strong>
        </div>
        <div class="result-item">
            <span>Service Charge ต่อคน (${serviceChargePercent}%):</span>
            <strong>${servicePerPerson.toFixed(2)} บาท</strong>
        </div>
        <div class="result-total">
            <span>จ่ายทั้งหมดต่อคน:</span>
            <span class="highlight">${totalPerPerson.toFixed(2)} บาท</span>
        </div>
    `;

    // 7. เอาคลาส hidden ออกเพื่อเปิดแสดงผลลัพธ์ที่คำนวณได้บนหน้าจอ
    resultContainer.classList.remove('hidden');
});