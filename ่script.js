// Grayscale Mode CDN - Auto apply grayscale filter to entire webpage
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
        }
        
        // ฟังก์ชันสำหรับลบโหมดสีเทา (optional)
        function removeGrayscale() {
            const styleElement = document.getElementById('grayscale-mode-cdn');
            if (styleElement) {
                styleElement.remove();
            }
            document.documentElement.style.filter = '';
            document.documentElement.style.webkitFilter = '';
        }
        
        // ตรวจสอบและเรียกใช้เมื่อ DOM พร้อม
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', applyGrayscale);
        } else {
            applyGrayscale();
        }
        
        // ทำให้ฟังก์ชันสามารถเรียกใช้จากภายนอกได้
        window.GrayscaleMode = {
            apply: applyGrayscale,
            remove: removeGrayscale
        };
        
        // Log สำหรับ debugging
        console.log('Grayscale Mode CDN: Activated');
    })();
