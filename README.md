# Parts Inventory Management Take-Home Assignment

A React-based web application for managing parts inventory with TypeScript, featuring a clean interface for adding, viewing, and persisting parts data.

## Project Overview

This application provides a comprehensive parts inventory management system built with modern web technologies. Users can add new parts with validation, view the current inventory in a table format, delete unwanted parts, and save their inventory to localStorage for persistence.

The application features:
- **React with TypeScript** for type-safe component development
- **Mock API layer** simulating real backend interactions
- **Form validation** ensuring data integrity
- **Toast notifications** for user feedback
- **Responsive design** with clean, modern styling
- **localStorage persistence** for data retention

## Your Tasks

### 1. Fix the Bug
**Issue:** The save functionality shows "Save successful!" but data doesn't actually persist when you refresh the page.

**Expected outcome:** Users should be able to save their inventory and have it reload when they refresh the page or return to the application.

### 2. Implement the following features:
**Choose and implement from the following options:**

- **Deletion functionality**: Add the ability to delete parts from the inventory
- **Pagination controls**: Add controls for navigating large inventories  
- **Dynamic sorting**: Implement sorting capabilities by name, quantity, or price
- **Audit trail**: Add tracking of when parts were added to the inventory

### 3. Update README
Document your implementation:
- Describe the bug you fixed and your solution approach
- Detail each new feature you implemented with usage instructions
- Update the "How to Run" section if needed
- Add any new dependencies or setup requirements

### 4. Summary
Write a brief summary including:
- Overview of the bug fix and your debugging process
- Description of implemented features and technical decisions
- Challenges encountered and how you overcame them
- Next steps you would take to further improve the application
- Any assumptions made during development

## How to Run

### Prerequisites
- Node.js (version 16 or higher)
- npm (comes with Node.js)

### Installation & Setup
1. Clone or download this repository
2. Navigate to the project directory
3. Install dependencies:
   ```bash
   npm install
   ```

### Development
Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is occupied).

### Building for Production
Create a production build:
```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/
│   ├── PartForm.tsx      # Form component for adding new parts
│   └── PartList.tsx      # Table component for displaying parts
├── App.tsx               # Main application component
├── main.tsx              # Application entry point
├── types.ts              # TypeScript type definitions
├── api.ts                # Mock API functions (contains the bug)
└── index.css             # Application styles
```

## Technical Stack

- **Frontend Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** Custom CSS with responsive design
- **Notifications:** react-toastify
- **State Management:** React useState hooks
- **Data Persistence:** localStorage (mock backend)

---

**Good luck with the implementation! We're excited to see your approach to debugging, feature development, and code organization.**
___________

**MY ANSWERS:**

**Describe the bug you fixed and your solution approach:**
The saveParts function in api.ts was trying to save part instead of parts to localStorage. Since part was undefined, the data wasn’t actually saved. Additionally, the try/catch block swallowed any errors, so the app would show a “Save successful” toast even though nothing persisted. I fixed the bug by correcting the variable name to parts when calling JSON.stringify and updating the catch block to reject the promise instead of silently resolving, ensuring errors are reported properly. After the fix, adding a part and saving it correctly persists the data in localStorage, and the app now behaves reliably.

**Detail each new feature you implemented with usage instructions:**
Deletion: Added a handleDeletePart function in App.tsx that filters out a part by its id and updates the state. The PartList component renders a “Delete” button for each part that calls this function. After deletion, the updated list is saved to localStorage and a toast notifies the user. Click the “Delete” button next to any part in the table to remove it from inventory.

Pagination: Added currentPage state and itemsPerPage in App.tsx. Parts are sliced to show only the current page which contains at most 5 elements or parts. Pagination controls (“Previous” / “Next”) allow the user to navigate through pages. Use the “Previous” and “Next” buttons below the parts table to navigate between pages when more than 5 parts exists.

Dynamic Sorting: Added sortKey and sortOrder state in App.tsx. Clicking on the appropriate table headers or the sort control buttons in the top left next to the "Sort By" header updates the sorting state. The PartList column headers display an arrow indicator for the active sort column to distinguish and sort between ascending or descending. You can also sort ascending/descending by clicking the Asc/Desc button in the top left next to the Sort By header. Parts are sorted in ascending or descending order based on the selected key (name, quantity, or price). 

Audit Trail (Timestamp): Each part now has an addedAt timestamp set when added. PartList displays this timestamp in a new “Added At” column. This provides a simple audit trail in the form of (date, time) showing when each part was added. 

**Update the "How to Run" section if needed**:
N/A - instructions given work as expected.

**Add any new dependencies or setup requirements**:
N/A

**Write a brief summary including: Overview of the bug fix and your debugging process, Description of implemented features and technical decisions, Challenges encountered and how you overcame them, Next steps you would take to further improve the application, Any assumptions made during development**:
During development, I identified a critical bug in the saveParts function where the nonexistent variable part was being stringified instead of the actual parts array. This caused the app to silently fail to persist inventory changes, even though the success toast appeared. My debugging process involved tracing handleSaveParts, inspecting localStorage, and reviewing the API code, which led to correcting the variable and implementing proper error handling. I implemented four major features: Deletion (users can remove parts; state and localStorage update immediately with a toast notification), Pagination (parts are displayed five per page with “Previous”/“Next” controls), Dynamic Sorting (users can sort by name, quantity, or price in ascending or descending order, with visual indicators), and Audit Trail (each part stores an addedAt timestamp, displayed in the table for tracking additions). Technical decisions included leveraging React state hooks to manage sorting, pagination, and saving/loading from localStorage, as well as maintaining separation of concerns by keeping PartList and PartForm modular. Challenges included understanding the interaction between App and the API, implementing front-end functionality efficiently despite my primary experience being elsewhere, ensuring persistence after deletions, dynamically sorting while paginating, and consistently formatting timestamps and currency. I addressed these challenges by carefully structuring sorted and paginated arrays, testing localStorage operations end-to-end, and consulting documentation and AI tools such as ChatGPT for accelerated learning and validation of edge cases. Next steps to improve the app could include adding edit functionality, adding and removing multiple parts at once, validating input fields more robustly, and using a backend API for multi-user persistence, and making the UI more conduive with branding and aesthetics. The assumptions I made were that LocalStorage would be sufficient for persistence in this single-user prototype, that parts added always have valid name, quantity, and price values, and that pagination of 5 items per page is acceptable for usability in the current single-user-interface.
