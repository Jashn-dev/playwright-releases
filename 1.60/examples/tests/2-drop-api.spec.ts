import { test, expect } from '@playwright/test';

test.describe('The Drop API', () => {
  test('upload via drag and drop', async ({ page }) => {
    await page.setContent(`
      <div style="font-family: 'Inter', sans-serif; padding: 40px; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; background-color: #f8fafc;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h2 style="margin: 0; color: #0f172a; font-size: 24px;">Upload Document</h2>
          <p style="color: #64748b; margin-top: 8px;">Upload your receipt or invoice to complete the process</p>
        </div>
        
        <div id="dropzone" style="width: 400px; height: 200px; background: #ffffff; border: 2px dashed #cbd5e1; border-radius: 12px; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s ease; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 16px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
          <span style="color: #334155; font-weight: 500;">Drag and drop your file here</span>
          <span style="color: #94a3b8; font-size: 14px; margin-top: 4px;">Supports PDF, PNG, JPG</span>
        </div>
        
        <div id="status-container" style="display: none; margin-top: 24px; padding: 16px; background: #ecfdf5; border: 1px solid #10b981; border-radius: 8px; width: 400px; box-sizing: border-box;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            <div>
              <div style="color: #065f46; font-weight: 600; font-size: 14px;">Upload Successful</div>
              <div class="upload-status" style="color: #047857; font-size: 13px;"></div>
            </div>
          </div>
        </div>
        
        <script>
          const dropzone = document.getElementById('dropzone');
          const statusContainer = document.getElementById('status-container');
          const uploadStatus = document.querySelector('.upload-status');
          
          dropzone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropzone.style.borderColor = '#3b82f6';
            dropzone.style.backgroundColor = '#eff6ff';
          });
          
          dropzone.addEventListener('dragleave', (e) => {
            e.preventDefault();
            dropzone.style.borderColor = '#cbd5e1';
            dropzone.style.backgroundColor = '#ffffff';
          });
          
          dropzone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropzone.style.borderColor = '#10b981';
            dropzone.style.backgroundColor = '#ffffff';
            
            if (e.dataTransfer.files.length > 0) {
              statusContainer.style.display = 'block';
              uploadStatus.innerText = e.dataTransfer.files[0].name;
            }
          });
        </script>
      </div>
    `);

    await page.locator('#dropzone').drop({
      files: {
        name: 'receipt.pdf',
        mimeType: 'application/pdf',
        buffer: Buffer.from('mock pdf content'),
      },
    });

    await expect(page.locator('.upload-status')).toContainText('receipt.pdf');
  });

  test('drop rich text into editor', async ({ page }) => {
    await page.setContent(`
      <div style="font-family: 'Inter', sans-serif; padding: 40px; background-color: #f8fafc; min-height: 100vh; display: flex; justify-content: center; align-items: center;">
        <div style="width: 600px; background: white; border-radius: 8px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); overflow: hidden; border: 1px solid #e2e8f0; display: flex; flex-direction: column;">
          
          <div style="padding: 12px 16px; background: #f1f5f9; border-bottom: 1px solid #e2e8f0; display: flex; gap: 8px;">
            <button style="border: 1px solid #cbd5e1; background: white; border-radius: 4px; padding: 6px 10px; font-weight: bold; cursor: pointer; color: #475569;">B</button>
            <button style="border: 1px solid #cbd5e1; background: white; border-radius: 4px; padding: 6px 10px; font-style: italic; cursor: pointer; color: #475569;">I</button>
            <button style="border: 1px solid #cbd5e1; background: white; border-radius: 4px; padding: 6px 10px; text-decoration: underline; cursor: pointer; color: #475569;">U</button>
            <div style="width: 1px; background: #cbd5e1; margin: 0 4px;"></div>
            <button style="border: 1px solid #cbd5e1; background: white; border-radius: 4px; padding: 6px 10px; cursor: pointer; color: #475569;">🔗</button>
          </div>
          
          <div id="rich-editor" style="padding: 24px; min-height: 250px; outline: none; color: #334155; line-height: 1.6; transition: background-color 0.2s;" contenteditable="true">
            <p style="color: #94a3b8; margin: 0; pointer-events: none;">Drag and drop rich content here...</p>
          </div>
          
        </div>
        
        <script>
          const editor = document.getElementById('rich-editor');
          
          editor.addEventListener('dragover', (e) => {
            e.preventDefault();
            editor.style.backgroundColor = '#f8fafc';
          });
          
          editor.addEventListener('dragleave', (e) => {
            e.preventDefault();
            editor.style.backgroundColor = 'transparent';
          });
          
          editor.addEventListener('drop', (e) => {
            e.preventDefault();
            editor.style.backgroundColor = 'transparent';
            editor.innerHTML = ''; // Clear placeholder
            
            const text = e.dataTransfer.getData('text/plain');
            const uri = e.dataTransfer.getData('text/uri-list');
            
            if (uri) {
              editor.innerHTML += '<a href="' + uri + '" style="color: #3b82f6; text-decoration: underline;">' + uri + '</a><br>';
            }
            if (text && text !== uri) {
              editor.innerHTML += '<p style="margin-top: 8px;">' + text + '</p>';
            }
          });
        </script>
      </div>
    `);

    await page.locator('#rich-editor').drop({
      data: {
        'text/plain': 'Hello world',
        'text/uri-list': 'https://storedemo.testdino.com',
      },
    });

    await expect(page.locator('#rich-editor')).toContainText('Hello world');
  });
});
