// grayscale.js - CDN for automatic grayscale mode (50%)
(function() {
    'use strict';
    
    // สร้างและเพิ่ม CSS
    var style = document.createElement('style');
    style.id = 'grayscale-cdn-50percent';
    style.textContent = `
        html {
            filter: grayscale(50%) !important;
            -webkit-filter: grayscale(50%) !important;
            -moz-filter: grayscale(50%) !important;
            -ms-filter: grayscale(50%) !important;
            -o-filter: grayscale(50%) !important;
        }
        body, div, section, article, header, footer, main, nav, aside, figure, img, video, canvas, svg {
            filter: grayscale(50%) !important;
            -webkit-filter: grayscale(50%) !important;
        }
    `;
    
    // รอจน DOM พร้อมแล้วเพิ่ม style
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            document.head.appendChild(style);
        });
    } else {
        document.head.appendChild(style);
    }
    
})();
