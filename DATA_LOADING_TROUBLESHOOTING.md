# 🔍 Data Loading Troubleshooting Guide

## ✅ **What Should Be Working**

Your app has:
- ✅ Mock appointments data (6 items) in `src/services/mockAppointments.js`
- ✅ Mock cases data (5 items) in `src/services/mockCases.js`
- ✅ AppContext properly loading data
- ✅ All components using AppContext correctly
- ✅ AppProvider wrapping the entire app

## 🔧 **Troubleshooting Steps**

### **Step 1: Hard Refresh the Browser**
The most common issue is browser caching.

**Windows/Linux:**
- Press `Ctrl + Shift + R` or `Ctrl + F5`

**Mac:**
- Press `Cmd + Shift + R`

**Or manually:**
1. Open DevTools (F12)
2. Right-click the refresh button
3. Select "Empty Cache and Hard Reload"

---

### **Step 2: Clear Browser Storage**
1. Open DevTools (F12)
2. Go to "Application" tab (Chrome) or "Storage" tab (Firefox)
3. Click "Clear site data" or "Clear storage"
4. Refresh the page

---

### **Step 3: Check Console for Errors**
1. Open DevTools (F12)
2. Go to "Console" tab
3. Look for any red error messages
4. If you see errors, note them down

---

### **Step 4: Verify Data is Loading**
1. Open DevTools (F12)
2. Go to "Console" tab
3. Type this and press Enter:
```javascript
localStorage.clear()
```
4. Refresh the page
5. Login again
6. Check if data appears

---

### **Step 5: Check Network Tab**
1. Open DevTools (F12)
2. Go to "Network" tab
3. Refresh the page
4. Look for any failed requests (red items)
5. Check if JavaScript files are loading

---

## 🎯 **Expected Behavior After Login**

### **Dashboard Should Show:**
- **Stats Cards**: 
  - Total Appointments: 6
  - Active Cases: 3
  - Total Clients: 156
  - Pending Tasks: 7

- **Recent Appointments Section**:
  - Should list 4 upcoming appointments
  - Dates: Dec 17, 18, 19, 20

- **Active Cases Section**:
  - Should list 3 active cases
  - Employment Discrimination Case
  - Contract Dispute Resolution
  - Personal Injury Claim

### **Appointments Page Should Show:**
- **Stats**: Total: 6, Confirmed: 4, Pending: 2, Today: 2
- **List**: 6 appointments with client names
- **Filters**: Working search and status filter

### **Cases Page Should Show:**
- **Stats**: Total: 5, Active: 3, Pending: 1, Closed: 1
- **List**: 5 cases with details
- **Progress bars** for each case

### **Calendar Should Show:**
- Appointments on Dec 17, 18, 19, 20, 23
- Click on dates to see appointment details

---

## 🐛 **Common Issues and Fixes**

### **Issue 1: "Cannot read property of undefined"**
**Fix**: Hard refresh the browser (Ctrl + Shift + R)

### **Issue 2: Data shows 0 everywhere**
**Fix**: 
1. Clear localStorage: `localStorage.clear()` in console
2. Refresh page
3. Login again

### **Issue 3: Page is blank/white**
**Fix**:
1. Check console for errors
2. Restart dev server:
   - Stop: Ctrl + C in terminal
   - Start: `npm run dev`
3. Hard refresh browser

### **Issue 4: Old data showing**
**Fix**:
1. Clear browser cache
2. Clear localStorage
3. Hard refresh

---

## 🔍 **Manual Verification**

### **Check if Mock Data Exists:**
Open browser console and run:
```javascript
// This should return 6 appointments
fetch('/src/services/mockAppointments.js')
  .then(r => r.text())
  .then(console.log)
```

### **Check if AppContext is Working:**
1. Add this temporarily to Dashboard.jsx (line 15):
```javascript
console.log('Appointments:', getUpcomingAppointments())
console.log('Cases:', getActiveCases())
console.log('Stats:', getAppointmentStats())
```
2. Check console for output
3. Should see arrays with data

---

## 🚀 **Quick Fix: Restart Everything**

If nothing works, do a complete restart:

1. **Stop the dev server**: Ctrl + C in terminal

2. **Clear browser completely**:
```javascript
// In browser console
localStorage.clear()
sessionStorage.clear()
```

3. **Close browser completely**

4. **Restart dev server**:
```bash
npm run dev
```

5. **Open fresh browser window**

6. **Go to** http://localhost:5000

7. **Login** with demo@example.com / password

8. **Check Dashboard** - should see data now

---

## 📊 **Verify Data Files**

### **Check mockAppointments.js:**
```bash
# Should show 6 appointments
grep -c "id:" src/services/mockAppointments.js
```

### **Check mockCases.js:**
```bash
# Should show 5 cases
grep -c "id:" src/services/mockCases.js
```

---

## 🎯 **If Still Empty After All Steps**

### **Option 1: Check File Integrity**
Run these commands in terminal:
```bash
# Check if files exist
ls -la src/services/mockAppointments.js
ls -la src/services/mockCases.js

# Check file sizes (should not be 0)
wc -l src/services/mockAppointments.js
wc -l src/services/mockCases.js
```

### **Option 2: Verify Imports**
Check `src/context/AppContext.jsx` line 2-3:
```javascript
import mockAppointments from '../services/mockAppointments'
import mockCases from '../services/mockCases'
```

Should be exactly like this (no `.js` extension needed).

### **Option 3: Check Browser Compatibility**
- Try a different browser (Chrome, Firefox, Edge)
- Make sure JavaScript is enabled
- Disable browser extensions temporarily

---

## ✅ **Success Checklist**

After fixing, you should see:

- [ ] Dashboard shows 6 total appointments
- [ ] Dashboard shows 3 active cases
- [ ] Appointments page lists 6 appointments
- [ ] Cases page lists 5 cases
- [ ] Calendar shows appointments on dates
- [ ] Reports show charts and stats
- [ ] No console errors
- [ ] All pages load quickly

---

## 📞 **Still Having Issues?**

If data is still not showing after all these steps:

1. **Take a screenshot** of:
   - The empty dashboard
   - Browser console (F12 → Console tab)
   - Network tab (F12 → Network tab)

2. **Check these specific things**:
   - What URL are you on? (should be localhost:5000)
   - Are you logged in? (should see user name in top right)
   - Any red errors in console?
   - Any failed network requests?

3. **Try this debug code**:
   Open console and paste:
```javascript
// Check if data exists
import('./src/services/mockAppointments.js').then(m => {
  console.log('Appointments loaded:', m.default)
})
```

The data IS in the files and the code IS correct. The issue is almost certainly browser caching or a need to restart the dev server.

**Most likely fix: Hard refresh (Ctrl + Shift + R) and clear localStorage!**