  // Camera setup
  const video = document.getElementById('video');
  const scanButton = document.getElementById('scanButton');
  const scanMessage = document.getElementById('scanMessage');

  const injuryDatabase = [
    {
      type: "Cut or Laceration",
      remedies: [
        "Clean the wound gently with warm water",
        "Apply antiseptic solution safe for pets",
        "Bandage the wound to keep it clean",
        "Take to vet if bleeding continues more than 10 minutes"
      ]
    },
    {
      type: "Bruise or Swelling",
      remedies: [
        "Apply a cold compress for 10-15 min every 2-3 hours",
        "Limit the pet's movement",
        "Monitor the area for worsening",
        "Consult vet if swelling grows or lasts more than 2 days"
      ]
    },
    {
      type: "Burns",
      remedies: [
        "Cool the burn area immediately with cool (not cold) water",
        "Do not apply ice directly on skin",
        "Cover with a clean, non-stick bandage",
        "Seek veterinary care urgently"
      ]
    },
    {
      type: "Puncture wound",
      remedies: [
        "Clean area carefully with vet-approved antiseptic",
        "Watch for infection: redness, pus, odor or warmth",
        "Keep pet calm to avoid further injury",
        "See vet as puncture wounds can be deep and risky"
      ]
    },
    {
      type: "Eye or Ear Injury",
      remedies: [
        "Avoid touching affected areas",
        "Prevent pet from scratching or rubbing",
        "Contact vet immediately",
        "Provide gentle care and prevent dirt exposure"
      ]
    }
  ];

  async function startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      video.srcObject = stream;
      scanMessage.textContent = "Place the dog or cat in view and click \"Scan for Injuries\"";
    } catch (error) {
      scanMessage.textContent = "Unable to access camera. Please allow camera permissions.";
      scanButton.disabled = true;
    }
  }

  function detectInjury() {
    const chance = Math.random();
    if (chance <= 0.65) {
      const injury = injuryDatabase[Math.floor(Math.random() * injuryDatabase.length)];
      return injury;
    } else {
      return null;
    }
  }

  scanButton.addEventListener('click', () => {
    scanMessage.textContent = "🔍 Scanning...";
    scanButton.disabled = true;

    setTimeout(() => {
      const injuryDetected = detectInjury();
      if (injuryDetected) {
        let remediesList = injuryDetected.remedies.map(remedy => `<li>${remedy}</li>`).join('');
        scanMessage.innerHTML = `<strong>Injury Detected: ${injuryDetected.type}</strong><br /><br /><strong>Recommended Remedies / Medications:</strong><ul>${remediesList}</ul>`;
      } else {
        scanMessage.innerHTML = "<span style='color:#2e7d32; font-weight:700;'>✅ No injury detected. Your pet looks healthy and happy! 🐾</span>";
      }
      scanButton.disabled = false;
    }, 2600);
  });

  startCamera();

  const products = [
    {id:1, name: "Premium Dog Food", price: 29.99, img: "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?auto=format&fit=crop&w=400&q=80"},
    {id:2, name: "Chew Toys Set (Dog)", price: 15.99, img: "https://images.unsplash.com/photo-1537151673435-94a6e5957824?auto=format&fit=crop&w=400&q=80"},
    {id:3, name: "Dog Collar", price: 13.50, img: "https://images.unsplash.com/photo-1525253086316-d0c936c814f8?auto=format&fit=crop&w=400&q=80"},
    {id:4, name: "Pet First Aid Kit", price: 39.99, img: "https://images.unsplash.com/photo-1558024920-b6e22aa09325?auto=format&fit=crop&w=400&q=80"},
    {id:5, name: "Dog Leash", price: 12.99, img: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=400&q=80"},
    {id:6, name: "Comfortable Dog Bed", price: 59.99, img: "https://images.unsplash.com/photo-1560807707-8cc77767d783?auto=format&fit=crop&w=400&q=80"},
    {id:7, name: "Premium Cat Food", price: 25.99, img: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80"},
    {id:8, name: "Cat Scratch Post", price: 22.49, img: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=400&q=80"},
    {id:9, name: "Cat Collar with Bell", price: 9.99, img: "https://images.unsplash.com/photo-1482292209215-83fd0cd5bb80?auto=format&fit=crop&w=400&q=80"},
    {id:10, name: "Cat Toy Set", price: 14.99, img: "https://images.unsplash.com/photo-1532465615-ce683e96f82b?auto=format&fit=crop&w=400&q=80"},
    {id:11, name: "Cat Bed Hammock", price: 29.99, img: "https://images.unsplash.com/photo-1517423440428-a5a00ad493e7?auto=format&fit=crop&w=400&q=80"},
    {id:12, name: "Grooming Brush", price: 11.99, img: "https://images.unsplash.com/photo-1534126511673-b6899657816a?auto=format&fit=crop&w=400&q=80"}
  ];

  const shopGrid = document.getElementById('shop-grid');
  const cartDiv = document.getElementById('cart');
  const cartItemsList = document.getElementById('cartItems');
  const cartTotalDiv = document.getElementById('cart-total');
  let cart = {};

  function renderProducts() {
    shopGrid.innerHTML = '';
    products.forEach(product => {
      const card = document.createElement('div');
      card.classList.add('product-card');
      card.innerHTML = `
        <img src="${product.img}" alt="${product.name}" loading="lazy" />
        <div class="product-name">${product.name}</div>
        <div class="product-price">$${product.price.toFixed(2)}</div>
        <button class="add-btn" data-id="${product.id}" aria-label="Add ${product.name} to cart">Add to Cart</button>
      `;
      shopGrid.appendChild(card);
    });
  }

  function renderCart() {
    if (Object.keys(cart).length === 0) {
      cartDiv.style.display = 'none';
      return;
    }
    cartDiv.style.display = 'block';
    cartItemsList.innerHTML = '';
    let total = 0;
    for (const id in cart) {
      const product = products.find(p => p.id == id);
      const qty = cart[id];
      const lineTotal = product.price * qty;
      total += lineTotal;
      const li = document.createElement('li');
      li.textContent = `${product.name} x${qty} - $${lineTotal.toFixed(2)}`;
      cartItemsList.appendChild(li);
    }
    cartTotalDiv.textContent = `Total: $${total.toFixed(2)}`;
  }

  shopGrid.addEventListener('click', e => {
    if(e.target.classList.contains('add-btn')) {
      const id = e.target.getAttribute('data-id');
      if (cart[id]) {
        cart[id]++;
      } else {
        cart[id] = 1;
      }
      renderCart();
      showToast(`Added "${products.find(p => p.id==id).name}" to cart!`);
    }
  });

  const vetForm = document.getElementById('vetForm');
  const vetConfirmation = document.getElementById('vetConfirmation');
  vetForm.addEventListener('submit', e => {
    e.preventDefault();
    vetConfirmation.style.display = 'block';
    vetConfirmation.textContent = '🌟 Thank you for requesting a consultation! Our vet team will contact you soon.';
    vetForm.reset();
    setTimeout(() => { vetConfirmation.style.display = 'none'; }, 6000);
  });

  function showToast(message) {
    let toast = document.createElement('div');
    toast.textContent = message;
    toast.style.position = 'fixed';
    toast.style.bottom = '30px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.background = '#ff7d45';
    toast.style.color = 'white';
    toast.style.padding = '12px 28px';
    toast.style.borderRadius = '30px';
    toast.style.fontWeight = '700';
    toast.style.fontSize = '1.2rem';
    toast.style.boxShadow = '0 6px 18px rgba(255,125,69,0.8)';
    toast.style.zIndex = 9999;
    toast.style.userSelect = 'none';
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.4s ease';
    document.body.appendChild(toast);
    setTimeout(() => { toast.style.opacity = '1'; }, 100);
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => { document.body.removeChild(toast); }, 400);
    }, 3000);
  }

  renderProducts();
  renderCart();

