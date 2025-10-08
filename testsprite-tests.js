// TestSprite-style automated tests for Expense Tracker
// This simulates what TestSprite would do with AI-powered test generation

class ExpenseTrackerTests {
  constructor() {
    this.testResults = [];
    this.currentTest = null;
  }

  async runAllTests() {
    console.log('🧪 Starting TestSprite-style automated testing for Expense Tracker...');
    
    const tests = [
      { name: 'Add Income Entry', fn: () => this.testAddIncomeEntry() },
      { name: 'Add Expense Entry', fn: () => this.testAddExpenseEntry() },
      { name: 'Filter by Category', fn: () => this.testFilterByCategory() },
      { name: 'Filter by Type', fn: () => this.testFilterByType() },
      { name: 'Theme Toggle', fn: () => this.testThemeToggle() },
      { name: 'Data Persistence', fn: () => this.testDataPersistence() },
      { name: 'Balance Calculations', fn: () => this.testBalanceCalculations() },
      { name: 'Entry Management', fn: () => this.testEntryManagement() }
    ];

    for (const test of tests) {
      await this.runTest(test.name, test.fn);
    }

    this.generateReport();
  }

  async runTest(name, testFunction) {
    console.log(`\n📋 Running test: ${name}`);
    this.currentTest = name;
    const startTime = Date.now();
    
    try {
      await testFunction();
      const duration = Date.now() - startTime;
      this.testResults.push({
        name,
        status: 'PASSED',
        duration,
        error: null
      });
      console.log(`✅ ${name} - PASSED (${duration}ms)`);
    } catch (error) {
      const duration = Date.now() - startTime;
      this.testResults.push({
        name,
        status: 'FAILED',
        duration,
        error: error.message
      });
      console.log(`❌ ${name} - FAILED (${duration}ms): ${error.message}`);
    }
  }

  async testAddIncomeEntry() {
    // Test adding an income entry
    console.log('  → Testing income entry addition...');
    
    // Fill out the form
    await this.fillForm({
      description: 'Test Salary',
      amount: '5000.00',
      category: 'Salary',
      type: 'Income'
    });

    // Submit the form
    await this.submitForm();

    // Verify entry appears in list
    await this.waitForEntry('Test Salary');
    
    // Verify balance updates
    const balance = await this.getBalance();
    if (parseFloat(balance) !== 5000.00) {
      throw new Error(`Expected balance 5000.00, got ${balance}`);
    }
  }

  async testAddExpenseEntry() {
    // Test adding an expense entry
    console.log('  → Testing expense entry addition...');
    
    await this.fillForm({
      description: 'Test Grocery',
      amount: '150.50',
      category: 'Food',
      type: 'Expense'
    });

    await this.submitForm();
    await this.waitForEntry('Test Grocery');
    
    // Balance should be 5000 - 150.50 = 4849.50
    const balance = await this.getBalance();
    if (parseFloat(balance) !== 4849.50) {
      throw new Error(`Expected balance 4849.50, got ${balance}`);
    }
  }

  async testFilterByCategory() {
    // Test filtering by category
    console.log('  → Testing category filter...');
    
    // Add another entry with different category
    await this.fillForm({
      description: 'Test Transport',
      amount: '50.00',
      category: 'Transport',
      type: 'Expense'
    });
    await this.submitForm();

    // Filter by Food category
    await this.selectFilter('category', 'Food');
    
    // Should only show the grocery entry
    const entries = await this.getVisibleEntries();
    if (entries.length !== 1 || !entries[0].includes('Test Grocery')) {
      throw new Error(`Expected 1 Food entry, got ${entries.length} entries: ${entries.join(', ')}`);
    }

    // Reset filter
    await this.selectFilter('category', 'All');
  }

  async testFilterByType() {
    // Test filtering by type
    console.log('  → Testing type filter...');
    
    // Filter by Income
    await this.selectFilter('type', 'Income');
    const incomeEntries = await this.getVisibleEntries();
    if (incomeEntries.length !== 1 || !incomeEntries[0].includes('Test Salary')) {
      throw new Error(`Expected 1 Income entry, got ${incomeEntries.length}`);
    }

    // Filter by Expense
    await this.selectFilter('type', 'Expense');
    const expenseEntries = await this.getVisibleEntries();
    if (expenseEntries.length !== 2) {
      throw new Error(`Expected 2 Expense entries, got ${expenseEntries.length}`);
    }

    // Reset filter
    await this.selectFilter('type', 'All');
  }

  async testThemeToggle() {
    // Test theme switching
    console.log('  → Testing theme toggle...');
    
    const themeButton = document.querySelector('.theme-switch');
    if (!themeButton) {
      throw new Error('Theme toggle button not found');
    }

    // Get initial theme
    const initialTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    
    // Toggle theme
    themeButton.click();
    
    // Verify theme changed
    const newTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    if (newTheme === initialTheme) {
      throw new Error('Theme did not change after toggle');
    }

    // Toggle back
    themeButton.click();
    const finalTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    if (finalTheme !== initialTheme) {
      throw new Error('Theme did not return to original state');
    }
  }

  async testDataPersistence() {
    // Test data persistence by refreshing page
    console.log('  → Testing data persistence...');
    
    const entriesBefore = await this.getVisibleEntries();
    const balanceBefore = await this.getBalance();
    
    // Refresh page
    window.location.reload();
    
    // Wait for page to reload and data to load
    await this.waitForPageLoad();
    
    const entriesAfter = await this.getVisibleEntries();
    const balanceAfter = await this.getBalance();
    
    if (entriesBefore.length !== entriesAfter.length) {
      throw new Error(`Entry count changed after refresh: ${entriesBefore.length} → ${entriesAfter.length}`);
    }
    
    if (parseFloat(balanceBefore) !== parseFloat(balanceAfter)) {
      throw new Error(`Balance changed after refresh: ${balanceBefore} → ${balanceAfter}`);
    }
  }

  async testBalanceCalculations() {
    // Test balance calculations
    console.log('  → Testing balance calculations...');
    
    // Clear all entries first
    await this.clearAllEntries();
    
    // Add test entries
    await this.addTestEntries();
    
    // Verify calculations
    const balance = parseFloat(await this.getBalance());
    const income = parseFloat(await this.getIncome());
    const expense = parseFloat(await this.getExpense());
    
    const expectedBalance = income - expense;
    if (Math.abs(balance - expectedBalance) > 0.01) {
      throw new Error(`Balance calculation error: ${balance} ≠ ${income} - ${expense}`);
    }
  }

  async testEntryManagement() {
    // Test editing and deleting entries
    console.log('  → Testing entry management...');
    
    // Test editing
    const editButtons = document.querySelectorAll('button[title="Edit"]');
    if (editButtons.length > 0) {
      editButtons[0].click();
      
      // Wait for edit modal
      await this.waitForModal();
      
      // Modify entry
      const descriptionInput = document.querySelector('input[placeholder*="description" i]');
      if (descriptionInput) {
        descriptionInput.value = 'Modified Entry';
      }
      
      // Save changes
      const saveButton = document.querySelector('button[type="submit"]');
      if (saveButton) {
        saveButton.click();
      }
      
      // Verify modification
      await this.waitForEntry('Modified Entry');
    }
    
    // Test deletion
    const deleteButtons = document.querySelectorAll('button[title="Delete"]');
    if (deleteButtons.length > 0) {
      const entriesBefore = await this.getVisibleEntries();
      deleteButtons[0].click();
      
      // Wait for deletion
      await this.waitForEntryCount(entriesBefore.length - 1);
    }
  }

  // Helper methods
  async fillForm(data) {
    const descriptionInput = document.querySelector('input[placeholder*="description" i]');
    const amountInput = document.querySelector('input[type="number"]');
    const categorySelect = document.querySelector('select:nth-of-type(1)');
    const typeSelect = document.querySelector('select:nth-of-type(2)');

    if (descriptionInput) descriptionInput.value = data.description;
    if (amountInput) amountInput.value = data.amount;
    if (categorySelect) categorySelect.value = data.category;
    if (typeSelect) typeSelect.value = data.type;

    // Trigger change events
    [descriptionInput, amountInput, categorySelect, typeSelect].forEach(input => {
      if (input) input.dispatchEvent(new Event('change', { bubbles: true }));
    });
  }

  async submitForm() {
    const submitButton = document.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.click();
    }
  }

  async waitForEntry(description) {
    const maxAttempts = 50;
    for (let i = 0; i < maxAttempts; i++) {
      const entries = await this.getVisibleEntries();
      if (entries.some(entry => entry.includes(description))) {
        return;
      }
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    throw new Error(`Entry "${description}" not found after waiting`);
  }

  async waitForEntryCount(expectedCount) {
    const maxAttempts = 50;
    for (let i = 0; i < maxAttempts; i++) {
      const entries = await this.getVisibleEntries();
      if (entries.length === expectedCount) {
        return;
      }
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    throw new Error(`Expected ${expectedCount} entries, got ${await this.getVisibleEntries().length}`);
  }

  async waitForModal() {
    const maxAttempts = 50;
    for (let i = 0; i < maxAttempts; i++) {
      const modal = document.querySelector('[role="dialog"]') || document.querySelector('.modal');
      if (modal) return;
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    throw new Error('Modal did not appear');
  }

  async waitForPageLoad() {
    const maxAttempts = 100;
    for (let i = 0; i < maxAttempts; i++) {
      const entries = await this.getVisibleEntries();
      if (entries.length > 0 || document.querySelector('.text-xl.font-semibold')) {
        return;
      }
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  async getVisibleEntries() {
    const entryElements = document.querySelectorAll('[data-testid="entry"]') || 
                         document.querySelectorAll('.entry') ||
                         Array.from(document.querySelectorAll('div')).filter(el => 
                           el.textContent && el.textContent.includes('₱') && !el.textContent.includes('Balance')
                         );
    
    return Array.from(entryElements).map(el => el.textContent.trim());
  }

  async getBalance() {
    const balanceElement = document.querySelector('.text-xl.font-semibold');
    return balanceElement ? balanceElement.textContent.replace('₱', '').trim() : '0.00';
  }

  async getIncome() {
    const incomeElements = document.querySelectorAll('.text-lg.font-semibold.text-green-600');
    return incomeElements[0] ? incomeElements[0].textContent.replace('₱', '').trim() : '0.00';
  }

  async getExpense() {
    const expenseElements = document.querySelectorAll('.text-lg.font-semibold.text-red-600');
    return expenseElements[0] ? expenseElements[0].textContent.replace('₱', '').trim() : '0.00';
  }

  async selectFilter(type, value) {
    const filterSelects = document.querySelectorAll('select');
    const targetSelect = type === 'category' ? filterSelects[0] : filterSelects[1];
    
    if (targetSelect) {
      targetSelect.value = value;
      targetSelect.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }

  async clearAllEntries() {
    const deleteButtons = document.querySelectorAll('button[title="Delete"]');
    for (const button of deleteButtons) {
      button.click();
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  async addTestEntries() {
    const testEntries = [
      { description: 'Test Income 1', amount: '1000', category: 'Salary', type: 'Income' },
      { description: 'Test Income 2', amount: '500', category: 'Allowance', type: 'Income' },
      { description: 'Test Expense 1', amount: '200', category: 'Food', type: 'Expense' },
      { description: 'Test Expense 2', amount: '150', category: 'Transport', type: 'Expense' }
    ];

    for (const entry of testEntries) {
      await this.fillForm(entry);
      await this.submitForm();
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  generateReport() {
    console.log('\n📊 TestSprite Test Report');
    console.log('========================');
    
    const passed = this.testResults.filter(r => r.status === 'PASSED').length;
    const failed = this.testResults.filter(r => r.status === 'FAILED').length;
    const total = this.testResults.length;
    
    console.log(`Total Tests: ${total}`);
    console.log(`Passed: ${passed} ✅`);
    console.log(`Failed: ${failed} ❌`);
    console.log(`Success Rate: ${((passed / total) * 100).toFixed(1)}%`);
    
    console.log('\nDetailed Results:');
    this.testResults.forEach(result => {
      const status = result.status === 'PASSED' ? '✅' : '❌';
      console.log(`${status} ${result.name} (${result.duration}ms)`);
      if (result.error) {
        console.log(`   Error: ${result.error}`);
      }
    });

    // Save report to file
    const reportData = {
      timestamp: new Date().toISOString(),
      summary: {
        total,
        passed,
        failed,
        successRate: (passed / total) * 100
      },
      results: this.testResults
    };

    // Create downloadable report
    const reportBlob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const reportUrl = URL.createObjectURL(reportBlob);
    
    const downloadLink = document.createElement('a');
    downloadLink.href = reportUrl;
    downloadLink.download = 'testsprite-report.json';
    downloadLink.textContent = 'Download Test Report';
    downloadLink.style.cssText = 'position: fixed; top: 10px; right: 10px; background: #007bff; color: white; padding: 10px; border-radius: 5px; text-decoration: none; z-index: 9999;';
    document.body.appendChild(downloadLink);
    
    console.log('\n🎯 TestSprite-style testing completed! Report saved as JSON.');
  }
}

// Initialize and run tests
const tester = new ExpenseTrackerTests();
tester.runAllTests();
