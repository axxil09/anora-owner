// 1. ADVANCED DEMO DATA SETUP
if (!localStorage.getItem('anora_v2_setup')) {
    const initialData = {
        sales: ['₹8.42L', '₹9.18L', '₹9.74L', '₹10.62L', '₹11.96L', '₹12.84L'],
        menu: [
            { id: 1, name: 'Truffle Chicken Burger', price: 329, offer: '' },
            { id: 2, name: 'Cappuccino', price: 189, offer: '10% OFF' },
            { id: 3, name: 'Iced Latte', price: 219, offer: '' }
        ],
        staff: [
            { id: 'ANR-01', name: 'Rahul Sharma', role: 'Senior Barista', salary: 22000, paid: false, attendance: 'Present' },
            { id: 'ANR-02', name: 'Aman Kumar', role: 'Head Chef', salary: 35000, paid: true, attendance: 'Present' },
            { id: 'ANR-03', name: 'Priya Singh', role: 'Cashier', salary: 18000, paid: false, attendance: 'Leave' },
            { id: 'ANR-04', name: 'Riya Verma', role: 'Waiter', salary: 15000, paid: false, attendance: 'Absent' }
        ],
        inventory: [
            { id: 'INV-1', item: 'Arabica Coffee Beans', qty: 2.5, unit: 'KG', max: 15, status: 'Low' },
            { id: 'INV-2', item: 'Full Cream Milk', qty: 42, unit: 'L', max: 50, status: 'Healthy' },
            { id: 'INV-3', item: 'Burger Buns', qty: 15, unit: 'Pcs', max: 100, status: 'Low' },
            { id: 'INV-4', item: 'Paper Cups (M)', qty: 850, unit: 'Pcs', max: 1000, status: 'Healthy' }
        ],
        recent_orders: [
            { id: '#ANR-1082', type: 'Dine In', amount: 1077, status: 'Preparing' },
            { id: '#ANR-1081', type: 'Takeaway', amount: 489, status: 'Ready' },
            { id: '#ANR-1080', type: 'Dine In', amount: 782, status: 'Completed' }
        ]
    };
    for (const [key, value] of Object.entries(initialData)) {
        localStorage.setItem(key, JSON.stringify(value));
    }
    localStorage.setItem('anora_v2_setup', 'true');
}

// 2. PREMIUM TOAST
function showToast(msg) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg> <span>${msg}</span>`;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// 3. DASHBOARD VIEW
function renderDashboard() {
    const orders = JSON.parse(localStorage.getItem('recent_orders'));
    document.getElementById('view-container').innerHTML = `
        <div class="fade-in">
            <div class="page-header">
                <div class="page-sub">Overview</div>
                <div class="page-title">Good Evening, Krishna.</div>
            </div>
            <div class="kpi-grid">
                <div class="card"><div class="kpi-title">Today's Sales</div><div class="kpi-val">₹48,920</div><div class="trend up"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg> +12.4% vs yesterday</div></div>
                <div class="card"><div class="kpi-title">Orders</div><div class="kpi-val">184</div><div class="trend up"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg> +8.2%</div></div>
                <div class="card"><div class="kpi-title">Avg Order Value</div><div class="kpi-val">₹266</div><div class="trend up"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg> +4.7%</div></div>
                <div class="card"><div class="kpi-title">Est. Profit</div><div class="kpi-val">₹17,842</div><div class="trend up"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg> +9.8%</div></div>
            </div>
            <div class="grid-2">
                <div class="card">
                    <div class="card-title">Revenue Growth (6 Months)</div>
                    <div style="height: 280px; width: 100%; position:relative;"><canvas id="salesChart"></canvas></div>
                </div>
                <div>
                    <div class="card" style="margin-bottom: 24px;">
                        <div class="card-title">Anora Smart Insights</div>
                        <div class="insight-item">
                            <div class="insight-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg></div>
                            <div class="insight-text">
                                <h4>Inventory Alert</h4>
                                <p>Arabica Coffee Beans & Burger Buns are critically low. Restock recommended today.</p>
                            </div>
                        </div>
                        <div class="insight-item">
                            <div class="insight-icon" style="color:var(--success)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg></div>
                            <div class="insight-text">
                                <h4>Sales Performance</h4>
                                <p>Truffle Chicken Burger generated the highest gross profit this week.</p>
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-title">Live Orders</div>
                        <table class="table">
                            <tbody>
                                ${orders.map(o => `
                                    <tr>
                                        <td><div style="font-weight:600">${o.id}</div><div style="font-size:11px;color:var(--text-muted)">${o.type}</div></td>
                                        <td style="font-weight:600; text-align:right;">₹${o.amount}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `;
    setTimeout(() => {
        const ctx = document.getElementById('salesChart');
        if (!ctx) return;
        const rawData = JSON.parse(localStorage.getItem('sales'));
        const numericData = rawData.map(val => parseFloat(val.replace('₹', '').replace('L', '')));
        if (window.myChart) window.myChart.destroy();
        window.myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['March', 'April', 'May', 'June', 'July', 'August'],
                datasets: [{
                    label: 'Revenue (Lakhs)',
                    data: numericData,
                    borderColor: '#713F46',
                    backgroundColor: 'rgba(113, 63, 70, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 4
                }]
            },
            options: {
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: { border: { display: false }, grid: { color: 'rgba(0,0,0,0.05)' } },
                    x: { grid: { display: false } }
                }
            }
        });
    }, 50);
}

// 4. INVENTORY VIEW
function renderInventory() {
    const inv = JSON.parse(localStorage.getItem('inventory'));
    document.getElementById('view-container').innerHTML = `
        <div class="fade-in">
            <div class="page-header">
                <div class="page-sub">Stock & Suppliers</div>
                <div class="page-title">Inventory Management</div>
            </div>
            <div class="card">
                <div class="card-title" style="display:flex; justify-content:space-between; align-items:center;">
                    Current Stock Levels
                    <button class="btn btn-outline btn-small" onclick="showToast('Feature locked in demo mode')">+ Add Item</button>
                </div>
                <table class="table">
                    <thead><tr><th>Item Name</th><th>Current Stock</th><th>Capacity Limit</th><th>Status</th><th>Action</th></tr></thead>
                    <tbody class="searchable">
                        ${inv.map(i => {
                            const percent = (i.qty / i.max) * 100;
                            const barColor = percent < 25 ? 'var(--danger)' : 'var(--success)';
                            return `
                            <tr>
                                <td><strong style="font-size:14px;">${i.item}</strong><br><span style="font-size:11px;color:gray">ID: ${i.id}</span></td>
                                <td style="width: 25%;">
                                    <div style="font-weight:600;">${i.qty} ${i.unit}</div>
                                    <div class="stock-bar"><div class="stock-fill" style="width: ${percent}%; background: ${barColor}"></div></div>
                                </td>
                                <td style="color:var(--text-muted)">${i.max} ${i.unit}</td>
                                <td><span class="badge ${i.status.toLowerCase()}">${i.status}</span></td>
                                <td><button class="btn btn-small" onclick="restock('${i.id}')">Restock</button></td>
                            </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// 5. STAFF VIEW
function renderStaff() {
    const staff = JSON.parse(localStorage.getItem('staff'));
    document.getElementById('view-container').innerHTML = `
        <div class="fade-in">
            <div class="page-header">
                <div class="page-sub">People & Payroll</div>
                <div class="page-title">Staff Operations</div>
            </div>
            <div class="grid-half">
                <div class="card">
                    <div class="card-title">Today's Attendance</div>
                    <table class="table">
                        <thead><tr><th>Employee</th><th>Mark Status</th><th>Current</th></tr></thead>
                        <tbody class="searchable">
                            ${staff.map(s => `
                                <tr>
                                    <td><strong style="font-size:13px;">${s.name}</strong><br><span style="font-size:10px;color:gray">${s.role}</span></td>
                                    <td>
                                        <select onchange="updateAttendance('${s.id}', this.value)" style="padding:4px; font-size:11px; border-radius:4px; border:1px solid var(--border);">
                                            <option value="Present" ${s.attendance==='Present'?'selected':''}>Present</option>
                                            <option value="Absent" ${s.attendance==='Absent'?'selected':''}>Absent</option>
                                            <option value="Leave" ${s.attendance==='Leave'?'selected':''}>Leave</option>
                                        </select>
                                    </td>
                                    <td><span class="badge ${s.attendance.toLowerCase()}">${s.attendance}</span></td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
                <div class="card">
                    <div class="card-title">Salary Clearance (August)</div>
                    <table class="table">
                        <thead><tr><th>Employee</th><th>Payable Amount</th><th>Action</th></tr></thead>
                        <tbody class="searchable">
                            ${staff.map(s => `
                                <tr>
                                    <td style="font-weight:600;">${s.name}</td>
                                    <td style="font-weight:700;">₹${s.salary}</td>
                                    <td>
                                        ${!s.paid ? `<button class="btn btn-small" onclick="paySalary('${s.id}')">Pay Now</button>` : `<span style="color:var(--success);font-size:11px;font-weight:700;">✓ PAID</span>`}
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

// 6. SETTINGS VIEW (Menu)
function renderSettings() {
    const menu = JSON.parse(localStorage.getItem('menu'));
    document.getElementById('view-container').innerHTML = `
        <div class="fade-in">
            <div class="page-header">
                <div class="page-sub">System Management</div>
                <div class="page-title">Menu Pricing & Offers</div>
            </div>
            <div class="grid-2">
                <div class="card">
                    <div class="card-title">Add / Update Item</div>
                    <form onsubmit="saveMenu(event)">
                        <input type="hidden" id="menu-id" value="">
                        <div class="form-group"><label>Item Name</label><input type="text" id="menu-name" required placeholder="e.g. Garlic Bread"></div>
                        <div class="grid-half" style="gap:16px;">
                            <div class="form-group"><label>Price (₹)</label><input type="number" id="menu-price" required></div>
                            <div class="form-group"><label>Special Offer</label><input type="text" id="menu-offer" placeholder="e.g. Buy 1 Get 1"></div>
                        </div>
                        <button type="submit" class="btn" style="width:100%">Save to Menu</button>
                    </form>
                </div>
                <div class="card" style="max-height: 500px; overflow-y:auto;">
                    <div class="card-title">Current Menu</div>
                    <table class="table">
                        <thead><tr><th>Item</th><th>Price</th><th>Offer</th><th></th></tr></thead>
                        <tbody class="searchable">
                            ${menu.map(m => `
                                <tr>
                                    <td style="font-weight:600">${m.name}</td><td>₹${m.price}</td><td style="color:var(--terracotta);font-weight:600;font-size:11px;">${m.offer || '-'}</td>
                                    <td style="text-align:right;"><button class="btn btn-outline btn-small" onclick="editMenu(${m.id}, '${m.name}', ${m.price}, '${m.offer}')">Edit</button></td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

// --- INTERACTIVE LOGIC ---

function restock(id) {
    let inv = JSON.parse(localStorage.getItem('inventory'));
    let item = inv.find(i => i.id === id);
    item.qty = item.max;
    item.status = 'Healthy';
    localStorage.setItem('inventory', JSON.stringify(inv));
    showToast(`${item.item} has been restocked to full capacity.`);
    renderInventory();
}

function updateAttendance(id, status) {
    let staff = JSON.parse(localStorage.getItem('staff'));
    let emp = staff.find(s => s.id === id);
    emp.attendance = status;
    localStorage.setItem('staff', JSON.stringify(staff));
    showToast(`${emp.name} marked as ${status}`);
    renderStaff();
}

function paySalary(id) {
    let staff = JSON.parse(localStorage.getItem('staff'));
    let emp = staff.find(s => s.id === id);
    emp.paid = true;
    localStorage.setItem('staff', JSON.stringify(staff));
    showToast(`Salary of ₹${emp.salary} paid to ${emp.name}`);
    renderStaff();
}

function saveMenu(e) {
    e.preventDefault();
    const id = document.getElementById('menu-id').value;
    const name = document.getElementById('menu-name').value;
    const price = document.getElementById('menu-price').value;
    const offer = document.getElementById('menu-offer').value;
    let menu = JSON.parse(localStorage.getItem('menu'));
    if (id) {
        let item = menu.find(m => m.id == id);
        item.name = name;
        item.price = price;
        item.offer = offer;
        showToast(`Price updated for ${name}`);
    } else {
        menu.unshift({ id: Date.now(), name, price, offer });
        showToast(`${name} added to Menu`);
    }
    localStorage.setItem('menu', JSON.stringify(menu));
    renderSettings();
}

function editMenu(id, name, price, offer) {
    document.getElementById('menu-id').value = id;
    document.getElementById('menu-name').value = name;
    document.getElementById('menu-price').value = price;
    document.getElementById('menu-offer').value = offer;
}

// GLOBAL SEARCH
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('global-search').addEventListener('input', function(e) {
        const query = e.target.value.toLowerCase();
        document.querySelectorAll('.searchable tr').forEach(row => {
            row.style.display = row.innerText.toLowerCase().includes(query) ? '' : 'none';
        });
    });
});

// ROUTING
function navigate(page, el) {
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    el.classList.add('active');
    if (page === 'dashboard') renderDashboard();
    if (page === 'inventory') renderInventory();
    if (page === 'staff') renderStaff();
    if (page === 'settings') renderSettings();
}

// Start with Dashboard
document.addEventListener('DOMContentLoaded', () => {
    renderDashboard();
});