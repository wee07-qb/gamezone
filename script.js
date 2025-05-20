 const bigLink = document.getElementById('bigLink');
    const redirectUrl = "https://s.shopee.co.th/2B1jiJVvRR";
    const waitTime = 60000; // 1 นาทีเป็นมิลลิวินาที
    const storageKey = 'bigLinkLastClicked';

    function enableLink() {
      bigLink.classList.remove('hidden');
    }

    function disableLink() {
      bigLink.classList.add('hidden');
    }

    function checkAndUpdateLinkStatus() {
      const lastClicked = localStorage.getItem(storageKey);
      if (lastClicked) {
        const elapsed = Date.now() - parseInt(lastClicked, 10);
        if (elapsed < waitTime) {
          // ยังไม่ครบ 1 นาที ให้ซ่อน link และตั้ง timeout เพื่อแสดงใหม่เมื่อครบเวลา
          disableLink();
          setTimeout(enableLink, waitTime - elapsed);
        } else {
          // ครบเวลาแล้ว แสดง link
          enableLink();
        }
      } else {
        // ยังไม่เคยคลิก ให้แสดง link
        enableLink();
      }
    }

    bigLink.addEventListener('click', () => {
      window.open(redirectUrl);
      disableLink();
      localStorage.setItem(storageKey, Date.now());
      setTimeout(enableLink, waitTime);
    });

    // เรียกเช็คสถานะตอนโหลดหน้าเว็บ
    checkAndUpdateLinkStatus();