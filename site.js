// ================================================
// LUMIÈRE BEAUTÉ - INTERAÇÕES & FUNCIONALIDADES
// ================================================

class LumièreApp {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('lumiere-cart')) || [];
        this.products = this.getProductsData();
        this.init();
    }

    init() {
        this.bindEvents();
        this.renderProducts();
        this.updateCartUI();
        this.setupFilters();
        this.setupModal();
        this.setupForm();
        this.setupScrollAnimations();
    }

    // Produtos de exemplo (em produção, viria de API)
    getProductsData() {
        return [
            {
                id: 1,
                name: "Sérum Hidratante Glow",
                category: "skincare",
                price: 129.90,
                image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop",
                rating: 4.9,
                reviews: 127,
                badge: "Mais Vendido"
            },
            {
                id: 2,
                name: "Base Líquida Matte",
                category: "makeup",
                price: 89.90,
                image: "https://images.unsplash.com/photo-1689436723133-47d2471fb4aa?w=400&h=300&fit=crop",
                rating: 4.7,
                reviews: 89,
                badge: "Novo"
            },
            {
                id: 3,
                name: "Shampoo Nutritivo",
                category: "hair",
                price: 69.90,
                image: "https://images.unsplash.com/photo-1611100481087-2eb83c6dd97b?w=400&h=300&fit=crop",
                rating: 4.8,
                reviews: 203,
                badge: "Promoção"
            },
            {
                id: 4,
                name: "Máscara Facial Detox",
                category: "skincare",
                price: 79.90,
                image: "https://images.unsplash.com/photo-1610981659387-2648de1d479b?w=400&h=300&fit=crop",
                rating: 4.9,
                reviews: 156,
                badge: "Best Seller"
            },
            {
                id: 5,
                name: "Batom Velvet Rose",
                category: "makeup",
                price: 59.90,
                image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
                rating: 4.6,
                reviews: 94,
                badge: "Lançamento"
            },
            {
                id: 6,
                name: "Condicionador Repair",
                category: "hair",
                price: 74.90,
                image: "https://images.unsplash.com/photo-1625772299848-361b803ffa27?w=400&h=300&fit=crop",
                rating: 4.8,
                reviews: 178,
                badge: "-20%"
            }
        ];
    }

    bindEvents() {
        // Mobile menu
        document.getElementById('menuToggle').addEventListener('click', () => {
            document.querySelector('.nav-menu').classList.toggle('active');
            document.getElementById('mobileMenuOverlay').classList.add('active');
        });

        document.getElementById('mobileMenuOverlay').addEventListener('click', () => {
            document.querySelector('.nav-menu').classList.remove('active');
            document.getElementById('mobileMenuOverlay').classList.remove('active');
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const header = document.querySelector('.header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
            }
        });

        // Smooth scroll for nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                target.scrollIntoView({ behavior: 'smooth' });
                // Close mobile menu
                document.querySelector('.nav-menu').classList.remove('active');
                document.getElementById('mobileMenuOverlay').classList.remove('active');
            });
        });
    }

    renderProducts(products = this.products) {
        const grid = document.getElementById('productsGrid');
        grid.innerHTML = products.map(product => `
            <div class="product-card" data-category="${product.category}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                    ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
                </div>
                <div class="product-info">
                    <div class="product-category">${this.getCategoryName(product.category)}</div>
                    <h3 class="product-name">${product.name}</h3>
                    <div class="product-price">R$ ${product.price.toFixed(2).replace('.', ',')}</div>
                    <div class="product-rating">
                        <div class="stars">${this.renderStars(product.rating)}</div>
                        <span class="rating-text">${product.rating} (${product.reviews})</span>
                    </div>
                    <div class="product-actions">
                        <button class="btn-add-cart" onclick="app.addToCart(${product.id})">
                            <svg viewBox="0 0 24 24" width="20" height="20" style="margin-right: 0.25rem;">
                                <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM17 18c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zM2 2v2h1.8l3.5 7.6-1.3 2.3c-.1.2-.1.4-.1.6 0 1.1.9 2 2 2h12v-2H7.4l.5-1h11.1c.6 0 1.1-.5 1.1-1.1 0-.2 0-.4-.1-.5l-1.8-3.2h-9.6l-.6-1H20c.6 0 1.1-.5 1.1-1.1 0-.6-.5-1.1-1.1-1.1h-17z" fill="currentColor"/>
                            </svg>
                            Adicionar
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    getCategoryName(category) {
        const names = {
            skincare: 'Skincare',
            makeup: 'Maquiagem',
            hair: 'Cabelos'
        };
        return names[category] || category;
    }

    renderStars(rating) {
        return '★'.repeat(Math.floor(rating)) + 
               '☆'.repeat(5 - Math.floor(rating));
    }

    setupFilters() {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filter = btn.dataset.filter;
                if (filter === 'all') {
                    this.renderProducts();
                } else {
                    const filtered = this.products.filter(p => p.category === filter);
                    this.renderProducts(filtered);
                }
            });
        });
    }

    addToCart(productId) {
        const product = this.products.find(p => p.id === productId);
        const existing = this.cart.find(item => item.id === productId);
        
        if (existing) {
            existing.quantity += 1;
        } else {
            this.cart.push({ ...product, quantity: 1 });
        }
        
        this.saveCart();
        this.updateCartUI();
        this.showToast('Produto adicionado ao carrinho!');
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartUI();
        this.renderCartItems();
    }

    updateQuantity(productId, change) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                this.removeFromCart(productId);
            } else {
                this.saveCart();
                this.updateCartUI();
                this.renderCartItems();
            }
        }
    }

    saveCart() {
        localStorage.setItem('lumiere-cart', JSON.stringify(this.cart));
    }

    getCartTotal() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    updateCartUI() {
        const count = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        const cartCount = document.querySelector('.cart-count');
        cartCount.textContent = count;
        cartCount.style.display = count > 0 ? 'flex' : 'none';
    }

    setupModal() {
        const cartBtn = document.getElementById('cartBtn');
        const cartModal = document.getElementById('cartModal');
        const cartClose = document.getElementById('cartClose');

        cartBtn.addEventListener('click', () => {
            cartModal.classList.add('active');
            this.renderCartItems();
        });

        cartClose.addEventListener('click', () => {
            cartModal.classList.remove('active');
        });

        cartModal.addEventListener('click', (e) => {
            if (e.target === cartModal) {
                cartModal.classList.remove('active');
            }
        });

        document.getElementById('checkoutBtn').addEventListener('click', () => {
            if (this.cart.length === 0) {
                this.showToast('Seu carrinho está vazio!');
            } else {
                this.showToast('Redirecionando para checkout...');
                // Em produção: redirecionar para checkout
            }
        });
    }

    renderCartItems() {
        const cartItems = document.getElementById('cartItems');
        const total = document.getElementById('cartTotal');
        
        if (this.cart.length === 0) {
            cartItems.innerHTML = '<p class="empty-cart">Seu carrinho está vazio</p>';
        } else {
            cartItems.innerHTML = this.cart.map(item => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" width="60" height="60">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <div class="cart-price">R$ ${item.price.toFixed(2).replace('.', ',')} x ${item.quantity}</div>
                    </div>
                    <div class="cart-quantity">
                        <button onclick="app.updateQuantity(${item.id}, -1)">−</button>
                        <span>${item.quantity}</span>
                        <button onclick="app.updateQuantity(${item.id}, 1)">+</button>
                    </div>
                    <button class="cart-remove" onclick="app.removeFromCart(${item.id})">×</button>
                </div>
            `).join('');
        }
        
        total.textContent = `R$ ${this.getCartTotal().toFixed(2).replace('.', ',')}`;
    }

    setupForm() {
        const form = document.getElementById('contactForm');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simular envio
            this.showToast('Mensagem enviada com sucesso! 😊');
            form.reset();
            
            // Em produção: enviar para API
            console.log('Form submitted:', { name, email, message });
        });
    }

    showToast(message) {
        // Toast notification
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--gradient-gold);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            box-shadow: var(--shadow);
            z-index: 3000;
            transform: translateX(400px);
            transition: var(--transition);
            font-weight: 500;
        `;
        
        document.body.appendChild(toast);
        setTimeout(() => toast.style.transform = 'translateX(0)', 100);
        
        setTimeout(() => {
            toast.style.transform = 'translateX(400px)';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.product-card, .feature, .about-image').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            observer.observe(el);
        });
    }
}

// Inicializar aplicação
const app = new LumièreApp();

// Adicionar estilos para cart modal e itens
const style = document.createElement('style');
style.textContent = `
    .cart-item {
        display: flex;
        gap: 1rem;
        padding: 1rem 0;
        border-bottom: 1px solid #eee;
        align-items: center;
    }
    .cart-item:last-child { border-bottom: none; }
    .cart-item img { border-radius: 12px; }
    .cart-item-info h4 { margin-bottom: 0.25rem; font-size: 1rem; }
    .cart-price { color: var(--text-light); font-size: 0.9rem; }
    .cart-quantity {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        background: #f8f9fa;
        padding: 0.5rem;
        border-radius: 12px;
        min-width: 90px;
        justify-content: center;
    }
    .cart-quantity button {
        width: 28px;
        height: 28px;
        border: none;
        background: white;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: var(--transition-fast);
    }
    .cart-quantity button:hover { background: var(--primary-gold); color: white; }
    .cart-remove {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #999;
        padding: 0.5rem;
        border-radius: 50%;
        transition: var(--transition-fast);
        margin-left: auto;
    }
    .cart-remove:hover { color: #ff4444; background: #ffe6e6; }
    .toast { font-family: 'Poppins', sans-serif; }
`;
document.head.appendChild(style);