// grayscale-mode.js - CDN สำหรับเปลี่ยนสีหน้าเว็บเป็นโหมดสีเทา
(function() {
    'use strict';
    
    // ฟังก์ชันหลักสำหรับเปลี่ยนเป็นโหมดสีเทา
    function applyGrayscale() {
        // สร้าง style element ถ้ายังไม่มี
        let styleElement = document.getElementById('grayscale-mode-cdn');
        if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.id = 'grayscale-mode-cdn';
            styleElement.textContent = `
                html {
                    filter: grayscale(100%) !important;
                    -webkit-filter: grayscale(100%) !important;
                    -moz-filter: grayscale(100%) !important;
                    -ms-filter: grayscale(100%) !important;
                    -o-filter: grayscale(100%) !important;
                }
                
                /* สำหรับภาพและวิดีโอที่อาจมีปัญหา */
                img, video, iframe, canvas, svg {
                    filter: grayscale(100%) !important;
                    -webkit-filter: grayscale(100%) !important;
                }
            `;
            document.head.appendChild(styleElement);
        }
        
        // ใช้ inline style เป็น fallback
        document.documentElement.style.filter = 'grayscale(100%)';
        document.documentElement.style.webkitFilter = 'grayscale(100%)';
        
        // อัพเดทสถานะปุ่ม
        updateButtonState(true);
    }
    
    // ฟังก์ชันสำหรับลบโหมดสีเทา
    function removeGrayscale() {
        const styleElement = document.getElementById('grayscale-mode-cdn');
        if (styleElement) {
            styleElement.remove();
        }
        document.documentElement.style.filter = '';
        document.documentElement.style.webkitFilter = '';
        
        // อัพเดทสถานะปุ่ม
        updateButtonState(false);
    }
    
    // สร้างปุ่มควบคุม
    function createControlButton() {
        // เพิ่ม CSS สำหรับปุ่มควบคุม
        const controlCSS = `
            #grayscale-control {
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                background: rgba(44, 62, 80, 0.95);
                padding: 15px;
                text-align: center;
                z-index: 10000;
                box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.3);
            }
            .grayscale-control-panel {
                display: inline-flex;
                align-items: center;
                gap: 15px;
                background: white;
                padding: 10px 20px;
                border-radius: 50px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
            }
            .control-label {
                font-weight: bold;
                color: #2c3e50;
                font-size: 14px;
            }
            .grayscale-btn {
                background: #f8f9fa;
                border: 2px solid #dee2e6;
                padding: 8px 16px;
                border-radius: 25px;
                cursor: pointer;
                font-size: 14px;
                font-weight: 600;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                gap: 5px;
            }
            .grayscale-btn:hover {
                background: #e9ecef;
                transform: translateY(-2px);
            }
            .grayscale-btn.active {
                background: #2c3e50;
                color: white;
                border-color: #2c3e50;
            }
            .btn-icon {
                font-size: 16px;
            }
            @media (max-width: 768px) {
                .grayscale-control-panel {
                    flex-direction: column;
                    border-radius: 15px;
                    gap: 10px;
                }
                .control-label {
                    border-bottom: 1px solid #dee2e6;
                    padding-bottom: 5px;
                    width: 100%;
                }
            }
        `;
        
        const style = document.createElement('style');
        style.textContent = controlCSS;
        document.head.appendChild(style);
        
        // สร้างปุ่มควบคุม
        const buttonContainer = document.createElement('div');
        buttonContainer.id = 'grayscale-control';
        buttonContainer.innerHTML = `
            <div class="grayscale-control-panel">
                <span class="control-label">โหมดสีเทา:</span>
                <button id="grayscale-toggle" class="grayscale-btn active">
                    <span class="btn-icon">⚫</span> เปิด
                </button>
                <button id="grayscale-off" class="grayscale-btn">
                    <span class="btn-icon">⚪</span> ปิด
                </button>
            </div>
        `;
        document.body.appendChild(buttonContainer);
        
        // เพิ่ม event listeners
        document.getElementById('grayscale-toggle').addEventListener('click', applyGrayscale);
        document.getElementById('grayscale-off').addEventListener('click', removeGrayscale);
        
        // เพิ่ม padding ให้ body เพื่อไม่ให้เนื้อหาถูกปุ่มบัง
        document.body.style.paddingBottom = '70px';
    }
    
    // อัพเดทสถานะปุ่ม
    function updateButtonState(isActive) {
        const toggleBtn = document.getElementById('grayscale-toggle');
        const offBtn = document.getElementById('grayscale-off');
        
        if (toggleBtn && offBtn) {
            if (isActive) {
                toggleBtn.classList.add('active');
                offBtn.classList.remove('active');
            } else {
                toggleBtn.classList.remove('active');
                offBtn.classList.add('active');
            }
        }
    }
    
    // ตรวจสอบและเรียกใช้เมื่อ DOM พร้อม
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            applyGrayscale();
            createControlButton();
        });
    } else {
        applyGrayscale();
        createControlButton();
    }
    
    // ทำให้ฟังก์ชันสามารถเรียกใช้จากภายนอกได้
    window.GrayscaleMode = {
        apply: applyGrayscale,
        remove: removeGrayscale
    };
    
    // Log สำหรับ debugging
    console.log('Grayscale Mode CDN: Activated');
})();
