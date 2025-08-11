// ----- Demo data sản phẩm -----
const products = [
  { id:1, title:"Acc Liên Quân — Rank Cao", desc:"Rank Cao + skin VIP", price:"250.000đ", img:"images/IMG_0976.jpeg" },
  { id:2, title:"Acc Liên Quân — Skin Đẹp", desc:"Skin đẹp, tài khoản ổn định", price:"200.000đ", img:"images/IMG_0977.jpeg" },
  { id:3, title:"Acc Đột Kích — Skin VIP", desc:"Skin VVIP hoành tráng", price:"300.000đ", img:"images/placeholder_cf.jpg" },
  { id:4, title:"Acc Free Fire — Elite Skin", desc:"Acc Elite + skin hiếm", price:"150.000đ", img:"images/placeholder_ff.jpg" },
  { id:5, title:"Acc LMHT — Prestige/Ultimate", desc:"Skin Ultimate / Prestige hiếm", price:"300.000đ", img:"images/placeholder_lmht.jpg" }
];

// render products
const grid = document.getElementById('product-grid');
const modal = document.getElementById('buyModal');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalClose = document.getElementById('modalClose');
const confirmBuy = document.getElementById('confirmBuy');
let selectedProduct = null;

function renderProducts(){
  grid.innerHTML = '';
  products.forEach(p => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${p.img}" alt="${p.title}">
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
      <div class="meta">
        <div class="price">${p.price}</div>
        <button class="btn small" data-id="${p.id}">Mua</button>
      </div>
    `;
    grid.appendChild(card);
  });

  grid.querySelectorAll('button[data-id]').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      const id = +e.currentTarget.dataset.id;
      openModal(products.find(x=>x.id===id));
    });
  });
}

// modal functions
function openModal(product){
  selectedProduct = product;
  modalTitle.textContent = `Mua: ${product.title}`;
  modalDesc.textContent = `${product.desc} — Giá: ${product.price}`;
  modal.classList.remove('hidden');
}
function closeModal(){ modal.classList.add('hidden'); }
modalClose?.addEventListener('click', closeModal);
modal.addEventListener('click', (e)=>{ if(e.target === modal) closeModal(); });

confirmBuy?.addEventListener('click', ()=>{
  const name = document.getElementById('buyerName').value?.trim();
  const contact = document.getElementById('buyerContact').value?.trim();
  if(!name || !contact) return alert('Nhập tên và thông tin liên hệ (Zalo/Phone).');
  alert(`Cảm ơn ${name}!\nYêu cầu mua "${selectedProduct.title}" đã được ghi. Chúng tôi sẽ liên hệ qua ${contact} (demo).`);
  closeModal();
});

// contact form
document.getElementById('contactForm')?.addEventListener('submit', e=>{
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const message = document.getElementById('message').value.trim();
  if(!name || !message) return alert('Vui lòng nhập tên và nội dung.');
  alert('Cảm ơn bạn đã liên hệ! Shop sẽ phản hồi sớm. (demo)');
  e.target.reset();
});

// simple chatbot toggle & logic
const chat = document.getElementById('chatbot');
const chatHeader = document.getElementById('chat-header');
const chatBody = document.getElementById('chat-body');
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');

let chatOpen = false;
chatHeader?.addEventListener('click', ()=>{
  chatOpen = !chatOpen;
  chat.classList.toggle('chatbot-closed', !chatOpen);
  chat.setAttribute('aria-hidden', String(!chatOpen));
});

// send message
function addChatMessage(sender, text, cls){
  const div = document.createElement('div');
  div.className = 'chat-msg';
  div.innerHTML = `<b>${sender}:</b> ${text}`;
  chatBody.appendChild(div);
  chatBody.scrollTop = chatBody.scrollHeight;
}
function botReply(userMsg){
  const lower = userMsg.toLowerCase();
  if(lower.includes('mua')) addChatMessage('Shop', 'Bạn cho biết tên sản phẩm hoặc nhấn nút Mua, shop sẽ liên hệ.', '');
  else if(lower.includes('giá')) addChatMessage('Shop', 'Giá từng sản phẩm hiển thị ngay trên thẻ sản phẩm.', '');
  else addChatMessage('Shop', 'Xin chào! Shop Acc Game Trùng Khánh, bạn cần hỗ trợ gì? (gõ "mua", "giá", hoặc để lại SĐT).');
}

chatSend?.addEventListener('click', ()=>{
  const msg = chatInput.value.trim();
  if(!msg) return;
  addChatMessage('Bạn', msg, '');
  chatInput.value = '';
  setTimeout(()=> botReply(msg), 600);
});
chatInput?.addEventListener('keypress', e=>{ if(e.key==='Enter') chatSend.click(); });

// header login button (demo)
document.getElementById('btn-login')?.addEventListener('click', ()=> alert('Chức năng đăng nhập đang phát triển.'));

// init
document.getElementById('year').textContent = new Date().getFullYear();
renderProducts();
