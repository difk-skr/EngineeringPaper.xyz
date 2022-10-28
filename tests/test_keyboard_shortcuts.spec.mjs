import { test, expect } from '@playwright/test';

// number of digits of accuracy after decimal point for .toBeCloseTo() calls
const precision = 13; 

test('Test keyboard shortcuts', async ({ page, browserName }) => {
  page.setLatex = async function (cellIndex, latex) {
    await this.evaluate(([cellIndex, latex]) => window.setCellLatex(cellIndex, latex),
      [cellIndex, latex]);
  }

  await page.goto('/');

  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  // Create a new document to test saving capability
  await page.locator('div.bx--modal-container').waitFor();
  await page.keyboard.press('Escape');
  await page.locator('#new-sheet').click();

  await page.locator('#delete-0').click();
  await page.locator('#delete-0').click(); // delete twice to delete the undo cell

  // add math cell with shift-Enter keyboard shortcut with now no cell selected
  await page.keyboard.press('Shift+Enter');

  // add math cell with shift-Enter with first cell selected 
  await page.keyboard.press('Shift+Enter');

  // add math cell with Enter shortcut from a math cell
  await page.keyboard.press('Enter');

  // select first cell using modifier-Uparrow shortcut
  await page.keyboard.press(modifierKey+"+ArrowUp");
  await page.keyboard.press(modifierKey+"+ArrowUp");
  await page.keyboard.type('x=2');

  await page.keyboard.press(modifierKey+"+ArrowDown");
  await page.keyboard.type('y=3');

  await page.keyboard.press(modifierKey+"+ArrowDown");
  await page.keyboard.type('x*y=');

  await page.waitForSelector('.status-footer', { state: 'detached', timeout: 100000 });
  let content = await page.textContent('#result-value-2');
  expect(parseFloat(content)).toBeCloseTo(6, precision);

  // make sure delete undo works
  await page.keyboard.press(modifierKey+"+ArrowUp");
  await page.keyboard.press(modifierKey+"+D");
  await page.locator('text=Undo Delete', {timeout: 100}).click();

  await page.waitForSelector('.status-footer', { state: 'detached', timeout: 100000 });
  content = await page.textContent('#result-value-2');
  expect(parseFloat(content)).toBeCloseTo(6, precision);

  // use control D to delete and let timer count down to delete
  await page.keyboard.press(modifierKey+"+D");
  await page.locator('text=Undo Delete').waitFor({state: "detached", timeout: 4000});

  // insert math cell using modifier-Enter
  await page.keyboard.press(modifierKey+"+Enter");
  await page.locator('text=Math Cell').waitFor({timeout: 100});
  await page.keyboard.press('1');
  
  await page.keyboard.type('y=4');

  await page.waitForSelector('.status-footer', { state: 'detached', timeout: 100000 });
  content = await page.textContent('#result-value-1');
  expect(parseFloat(content)).toBeCloseTo(8, precision);

  // test escape out of insert cell dialog
  await page.keyboard.press(modifierKey+"+Enter");
  await page.locator('text=Math Cell').waitFor({timeout: 100});
  await page.keyboard.press('Escape');
  await page.locator('text=Math Cell').waitFor({state: "detached", timeout: 100});

  // test double modifier-D to delete cell
  await page.keyboard.press(modifierKey+"+D");
  await page.keyboard.press(modifierKey+"+D");

  // test add system solve cell with insert cell dialog
  await page.keyboard.press(modifierKey+"+Enter");
  await page.locator('text=Math Cell').waitFor({timeout: 100});
  await page.keyboard.press('6');

  await page.keyboard.type('8=y');
  await page.locator('#system-parameterlist-2 textarea').type('y');

  await page.waitForSelector('.status-footer', { state: 'detached', timeout: 100000 });
  content = await page.textContent('#result-value-1');
  expect(parseFloat(content)).toBeCloseTo(16, precision);

  // test add documentation cell with insert cell dialog 
  await page.keyboard.press(modifierKey+"+Enter");
  await page.locator('text=Math Cell').waitFor({timeout: 100});
  await page.keyboard.press('2');

  await page.locator('.ql-toolbar').waitFor({timeout: 100});

  // test add plot cell with insert cell dialog
  await page.keyboard.press(modifierKey+"+Enter");
  await page.locator('text=Math Cell').waitFor({timeout: 100});
  await page.keyboard.press('3');

  await page.locator('text=log x').waitFor({timeout: 500});

  // test add table
  await page.keyboard.press(modifierKey+"+Enter");
  await page.locator('text=Math Cell').waitFor({timeout: 100});
  await page.keyboard.press('4');

  await page.locator('text=Option 1').waitFor({timeout: 100});

  // test add piecewise
  await page.keyboard.press(modifierKey+"+Enter");
  await page.locator('text=Math Cell').waitFor({timeout: 100});
  await page.keyboard.press('5');

  await page.locator('text=otherwise').waitFor({timeout: 100});

  // delete piecewise and plot with errors 
  await page.keyboard.press(modifierKey+"+D");
  await page.keyboard.press(modifierKey+"+D");
  await page.keyboard.press(modifierKey+"+ArrowUp")
  await page.keyboard.press(modifierKey+"+D");
  await page.keyboard.press(modifierKey+"+D");

  await page.waitForSelector('.status-footer', { state: 'detached', timeout: 100000 });
  content = await page.textContent('#result-value-1');
  expect(parseFloat(content)).toBeCloseTo(16, precision);

});