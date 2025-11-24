# Debug Guide: Admin About Page Save Issue

## Issue
Clicking "Save Changes" on the Admin About page doesn't update the content.

## Debugging Steps

### Step 1: Check if Backend is Running
```bash
# Backend should be running on port 5000
curl http://localhost:5000/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "Capsort Backend API is running",
  "timestamp": "...",
  "environment": "development"
}
```

### Step 2: Test GET Endpoint (Public)
```bash
curl http://localhost:5000/api/about
```

Expected response:
```json
{
  "content": {
    "id": 1,
    "title": "About CapSort",
    "subtitle": "Capstone Archiving and Sorting System",
    "mission": "...",
    "contactEmail": "capsort@ustp.edu.ph",
    "updatedAt": "...",
    "createdAt": "..."
  },
  "status": 200
}
```

### Step 3: Check Browser Console
1. Open the Admin About page
2. Open browser DevTools (F12)
3. Go to Console tab
4. Look for:
   - "Fetch response:" log when page loads
   - "Saving content:" log when clicking Save
   - "Save response:" log after save attempt
   - Any error messages

### Step 4: Check Network Tab
1. Open DevTools Network tab
2. Click "Save Changes"
3. Look for PUT request to `/api/about`
4. Check:
   - Request Headers (should have Authorization: Bearer ...)
   - Request Payload (should have title, subtitle, mission, contactEmail)
   - Response Status (should be 200)
   - Response Data

### Step 5: Verify Authentication
```javascript
// Run in browser console on admin page
console.log('Token:', localStorage.getItem('authToken'));
```

If token is null or undefined, you need to login again.

### Step 6: Test PUT Endpoint Manually

#### Get your auth token:
1. Login as admin
2. Open browser console
3. Run: `localStorage.getItem('authToken')`
4. Copy the token

#### Test with curl:
```bash
curl -X PUT http://localhost:5000/api/about \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "Updated Title",
    "subtitle": "Updated Subtitle",
    "mission": "Updated mission statement",
    "contactEmail": "updated@ustp.edu.ph"
  }'
```

Expected response:
```json
{
  "message": "About content updated successfully",
  "content": {
    "id": 1,
    "title": "Updated Title",
    "subtitle": "Updated Subtitle",
    "mission": "Updated mission statement",
    "contactEmail": "updated@ustp.edu.ph",
    "updatedAt": "...",
    "createdAt": "..."
  },
  "status": 200
}
```

### Step 7: Check Database
```bash
cd backend
npx prisma studio
```

1. Open `AboutContent` table
2. Verify record exists
3. Check if `updatedAt` timestamp changes after save

## Common Issues & Solutions

### Issue 1: "Failed to update content - invalid response"
**Cause:** Backend response format doesn't match expected structure
**Solution:** Check console logs for actual response structure

### Issue 2: 401 Unauthorized
**Cause:** Missing or invalid auth token
**Solution:** 
1. Logout and login again
2. Check if token exists: `localStorage.getItem('authToken')`

### Issue 3: 403 Forbidden
**Cause:** User is not admin
**Solution:** Ensure you're logged in with admin account

### Issue 4: 400 Bad Request - "All fields are required"
**Cause:** One or more fields are empty
**Solution:** Ensure all fields have values before saving

### Issue 5: 400 Bad Request - "Invalid email format"
**Cause:** Contact email is not valid
**Solution:** Enter a valid email address (e.g., name@domain.com)

### Issue 6: Network Error
**Cause:** Backend is not running or wrong API URL
**Solution:**
1. Check if backend is running: `curl http://localhost:5000/health`
2. Check VITE_API_URL in frontend/.env

### Issue 7: CORS Error
**Cause:** Frontend and backend on different origins
**Solution:** Check backend CORS configuration in `src/index.js`

## Quick Fix Checklist

- [ ] Backend is running on port 5000
- [ ] Frontend is running on port 3000 (or configured port)
- [ ] Logged in as admin user
- [ ] Auth token exists in localStorage
- [ ] All form fields have values
- [ ] Email field has valid email format
- [ ] Browser console shows no errors
- [ ] Network tab shows PUT request succeeds (200 status)
- [ ] Database has AboutContent table
- [ ] Database record updates after save

## Testing the Fix

1. **Start Backend:**
   ```bash
   cd backend
   npm start
   ```

2. **Start Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Test Flow:**
   - Login as admin
   - Go to `/admin/about`
   - Click "Edit Content"
   - Change any field
   - Click "Save Changes"
   - Should see success toast
   - Refresh page - changes should persist

## Still Not Working?

If you've tried all the above and it's still not working:

1. **Check backend logs** for errors
2. **Share the console logs** from browser
3. **Share the network request/response** from DevTools
4. **Check if database migration ran** successfully

## Contact
If issue persists, provide:
- Browser console logs
- Network tab screenshot
- Backend terminal output
- Database schema verification
