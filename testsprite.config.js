module.exports = {
  // Application configuration
  app: {
    name: "Expense Tracker",
    url: "http://localhost:5173",
    type: "react"
  },
  
  // Test configuration
  tests: {
    // Test scenarios to cover
    scenarios: [
      {
        name: "Add Income Entry",
        description: "Test adding a new income entry to the expense tracker",
        steps: [
          "Navigate to the expense tracker",
          "Click on the entry form",
          "Fill in amount, description, category, and select Income type",
          "Submit the form",
          "Verify the entry appears in the list",
          "Verify the balance updates correctly"
        ]
      },
      {
        name: "Add Expense Entry", 
        description: "Test adding a new expense entry to the expense tracker",
        steps: [
          "Navigate to the expense tracker",
          "Click on the entry form", 
          "Fill in amount, description, category, and select Expense type",
          "Submit the form",
          "Verify the entry appears in the list",
          "Verify the balance updates correctly"
        ]
      },
      {
        name: "Filter Entries by Category",
        description: "Test filtering entries by different categories",
        steps: [
          "Navigate to the expense tracker",
          "Add multiple entries with different categories",
          "Use the category filter dropdown",
          "Select a specific category",
          "Verify only entries from that category are displayed"
        ]
      },
      {
        name: "Filter Entries by Type",
        description: "Test filtering entries by Income/Expense type",
        steps: [
          "Navigate to the expense tracker", 
          "Add both income and expense entries",
          "Use the type filter dropdown",
          "Select 'Income' filter",
          "Verify only income entries are displayed",
          "Select 'Expense' filter", 
          "Verify only expense entries are displayed"
        ]
      },
      {
        name: "Edit Entry",
        description: "Test editing an existing entry",
        steps: [
          "Navigate to the expense tracker",
          "Add an entry",
          "Click edit on the entry",
          "Modify the entry details",
          "Save the changes",
          "Verify the updated entry appears correctly"
        ]
      },
      {
        name: "Delete Entry",
        description: "Test removing an entry",
        steps: [
          "Navigate to the expense tracker",
          "Add an entry",
          "Click delete on the entry",
          "Verify the entry is removed from the list",
          "Verify the balance updates correctly"
        ]
      },
      {
        name: "Theme Toggle",
        description: "Test switching between light and dark themes",
        steps: [
          "Navigate to the expense tracker",
          "Verify current theme (light or dark)",
          "Click the theme toggle button",
          "Verify the theme changes",
          "Verify all UI elements are visible in new theme"
        ]
      },
      {
        name: "Data Persistence",
        description: "Test that data persists after page refresh",
        steps: [
          "Navigate to the expense tracker",
          "Add several entries",
          "Refresh the page",
          "Verify all entries are still present",
          "Verify balance calculations are correct"
        ]
      }
    ],
    
    // UI elements to test
    elements: {
      selectors: {
        entryForm: "form",
        amountInput: "input[type='number']",
        descriptionInput: "input[placeholder*='description' i]",
        categorySelect: "select",
        typeSelect: "select[name='type']",
        submitButton: "button[type='submit']",
        entryList: "[data-testid='entry-list']",
        balanceDisplay: ".text-xl.font-semibold",
        themeToggle: ".theme-switch",
        categoryFilter: "select:nth-of-type(1)",
        typeFilter: "select:nth-of-type(2)",
        editButton: "button[title='Edit']",
        deleteButton: "button[title='Delete']"
      }
    }
  },
  
  // Browser configuration
  browser: {
    headless: false,
    viewport: {
      width: 1280,
      height: 720
    }
  },
  
  // Reporting configuration
  reporting: {
    generateReport: true,
    reportPath: "./test-reports",
    includeScreenshots: true
  }
};
