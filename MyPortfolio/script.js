function toggleOverlay(){
            const box =
            document.getElementById("overlaybox");
            box.style.display = 
            (box.style.display === "block") ?
            "none" : "block";
        }
        window.addEventListener('click',function(e) {
            const box = 
            document.getElementById("overlaybox");
            const burger = 
            document.querySelector(".hamburger");

            if(!box.contains(e.target) && ! burger.contains(e.target)){
                box.style.display = "none";
            }
        });



        function resizeMasonryItem(item) {
    const grid = document.getElementById("masonry-grid");
    const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('gap'));
    const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));

    // Temporarily reset height
    item.style.gridRowEnd = null;

    const contentHeight = item.scrollHeight;
    const rowSpan = Math.ceil((contentHeight + rowGap) / (rowHeight + rowGap));
    item.style.gridRowEnd = `span ${rowSpan}`;
  }

  function resizeAllMasonryItems() {
    const grid = document.getElementById("masonry-grid");
    const items = grid.querySelectorAll(".grid-item");
    items.forEach(item => resizeMasonryItem(item));
  }

  // Handle image load
  function onImagesLoaded(callback) {
    const images = document.querySelectorAll(".grid-item img");
    let loadedCount = 0;

    if (images.length === 0) callback();

    images.forEach(img => {
      if (img.complete) {
        loadedCount++;
        if (loadedCount === images.length) callback();
      } else {
        img.addEventListener("load", () => {
          loadedCount++;
          if (loadedCount === images.length) callback();
        });
        img.addEventListener("error", () => {
          loadedCount++;
          if (loadedCount === images.length) callback();
        });
      }
    });
  }

  window.addEventListener("load", () => {
    onImagesLoaded(() => {
      resizeAllMasonryItems();
    });
  });

  window.addEventListener("resize", resizeAllMasonryItems);

  