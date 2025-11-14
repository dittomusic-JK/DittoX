# Google Sheets Competition Logger Setup

## Step 1: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it: **"Ditto X 25 Comp Entries"**
4. In the first row, add these headers:
   - A1: **Timestamp**
   - B1: **Full Name**
   - C1: **Email**
   - D1: **Form Name**

## Step 2: Create Google Apps Script

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete any existing code
3. Paste this code:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Get form data
    var name = e.parameter.name || '';
    var email = e.parameter.email || '';
    var timestamp = e.parameter.timestamp || new Date().toISOString();
    var formName = e.parameter.form_name || 'Ditto X 25 Comp Entries';
    
    // Append row to sheet
    sheet.appendRow([timestamp, name, email, formName]);
    
    // Return success
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'success',
      'row': sheet.getLastRow()
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'error',
      'error': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return doPost(e);
}
```

4. Click **Save** (💾 icon)
5. Name your project: "Ditto X Comp Logger"

## Step 3: Deploy as Web App

1. Click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ → Select **Web app**
3. Settings:
   - **Description:** "Ditto X 25 Competition Logger"
   - **Execute as:** Me (your email)
   - **Who has access:** Anyone
4. Click **Deploy**
5. **Copy the Web App URL** - it looks like:
   ```
   https://script.google.com/macros/s/AKfycby.../exec
   ```

## Step 4: Update Form with URL

1. Open `public/Signup-form.html`
2. Find line 497:
   ```html
   action="YOUR_GOOGLE_APPS_SCRIPT_URL_HERE"
   ```
3. Replace with your actual URL:
   ```html
   action="https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"
   ```

## Step 5: Test It

1. Deploy your app to Vercel
2. Fill out the signup form with test data
3. Check your Google Sheet - you should see a new row with:
   - Timestamp (when submitted)
   - Full Name (from form)
   - Email (from form)
   - Form Name: "Ditto X 25 Comp Entries"

## Troubleshooting

### No data appearing?
- Check the Apps Script execution logs: Apps Script → Executions
- Make sure the deployment is set to "Anyone" can access
- Try re-deploying as a new version

### Getting errors?
- Check browser console for errors
- Make sure the URL is correct and includes `/exec` at the end
- Verify the sheet has the correct headers

## Privacy Note

The Name field is NOT sent to the Ditto API - it's only logged to your Google Sheet for competition purposes. This keeps it separate from their user database.

## Export Data

To export entries:
1. Open your Google Sheet
2. **File** → **Download** → **CSV** or **Excel**
3. Use this for drawing winners!

---

**Need help?** Check the Apps Script execution logs for any errors.
