document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const elements = {
        menuBtn: document.querySelector('.menu-btn'),
        navMenu: document.querySelector('.nav-menu'),
        articleGrid: document.querySelector('.article-grid'),
        searchInput: document.getElementById('search-input'),
        searchBtn: document.getElementById('search-btn'),
        loadMoreBtn: document.getElementById('load-more-btn'),
        currentYear: document.getElementById('current-year'),
        swiperWrapper: document.querySelector('.swiper-wrapper')
    };

    // State
    let articles = [];
    let highlightedArticles = [];
    let currentPage = 1;
    const articlesPerPage = 6;
    let isFetching = false;
    let allArticlesLoaded = false;

    // Initialize
    init();

    function init() {
        setupEventListeners();
        displayCurrentYear();
        fetchHighlightedArticles();
        fetchArticles(); // Initial articles fetch
    }

    function setupEventListeners() {
        // Mobile menu toggle
        elements.menuBtn?.addEventListener('click', () => {
            elements.navMenu.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('nav') && !e.target.closest('.menu-btn')) {
                elements.navMenu.classList.remove('active');
            }
        });

        // Search functionality
        elements.searchBtn?.addEventListener('click', handleSearch);
        elements.searchInput?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });

        // Load more articles
        elements.loadMoreBtn?.addEventListener('click', loadMoreArticles);
    }

    function displayCurrentYear() {
        if (elements.currentYear) {
            elements.currentYear.textContent = new Date().getFullYear();
        }
    }

    async function fetchHighlightedArticles() {
        try {
            const response = await fetch('api/articles.php?action=highlighted');
            if (!response.ok) throw new Error('Network response was not ok');
            
            const data = await response.json();
            if (data.success && data.data.length > 0) {
                highlightedArticles = data.data;
                displayHighlightedArticles(highlightedArticles);
                initializeSwiper();
            } else {
                console.error('No highlighted articles available.');
                document.querySelector('.featured-slider').style.display = 'none';
            }
        } catch (error) {
            console.error('Error fetching highlighted articles:', error);
            document.querySelector('.featured-slider').style.display = 'none';
        }
    }

    function displayHighlightedArticles(articles) {
        if (!elements.swiperWrapper) return;
        
        const slidesHTML = articles.map(article => `
            <div class="swiper-slide">
                <img src="${article.image || 'images/placeholders/article-default.jpg'}" 
                     alt="${escapeHTML(article.title)}" 
                     onerror="this.src='images/placeholders/article-default.jpg'">
                <div class="swiper-slide-content">
                    <h2>${escapeHTML(article.title)}</h2>
                    <div class="slide-meta">
                        <span>${escapeHTML(article.author)}</span> • 
                        <span>${formatDate(article.created_at)}</span>
                    </div>
                </div>
            </div>
        `).join('');
        
        elements.swiperWrapper.innerHTML = slidesHTML;
    }

    function initializeSwiper() {
        new Swiper('.swiper-container', {
            loop: true,
            autoplay: {
                delay: 7000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            effect: 'coverflow',
            coverflowEffect: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
            },
            speed: 800,
            spaceBetween: 30,
        });
    }

    async function fetchArticles(page = 1, searchQuery = '') {
        if (isFetching || allArticlesLoaded) return;
        isFetching = true;

        try {
            const queryParams = new URLSearchParams({
                page: page.toString(),
                limit: articlesPerPage.toString()
            });

            if (searchQuery) {
                queryParams.append('search', searchQuery);
            }

            const response = await fetch(`api/articles.php?${queryParams}`);
            if (!response.ok) throw new Error('Network response was not ok');

            const data = await response.json();

            if (data.success) {
                if (data.data.length === 0) {
                    allArticlesLoaded = true;
                    elements.loadMoreBtn.style.display = 'none';
                    if (currentPage === 1) {
                        elements.articleGrid.innerHTML = '<p class="no-articles">No articles found.</p>';
                    }
                } else {
                    articles = page === 1 ? data.data : [...articles, ...data.data];
                    displayArticles(data.data, page === 1);
                    currentPage++;
                }
            } else {
                throw new Error(data.error || 'Failed to fetch articles');
            }
        } catch (error) {
            console.error('Error fetching articles:', error);
            elements.articleGrid.innerHTML += '<p class="error-message">Failed to load articles. Please try again later.</p>';
        } finally {
            isFetching = false;
        }
    }

    function displayArticles(articlesToDisplay, clearExisting = false) {
        if (!elements.articleGrid) return;

        if (clearExisting) {
            elements.articleGrid.innerHTML = '';
        }

        const articlesHTML = articlesToDisplay.map(article => `
            <article class="article-card">
                <div class="article-image">
                    <img src="${article.image || 'images/placeholders/article-default.jpg'}" 
                         alt="${escapeHTML(article.title)}"
                         onerror="this.src='images/placeholders/article-default.jpg'">
                </div>
                <div class="article-content">
                    <h2 class="article-title">${escapeHTML(article.title)}</h2>
                    <p class="article-description">${escapeHTML(article.description)}</p>
                    <div class="article-meta">
                        <span class="article-author">${escapeHTML(article.author)}</span>
                        <span class="article-date">${formatDate(article.created_at)}</span>
                    </div>
                </div>
            </article>
        `).join('');

        elements.articleGrid.insertAdjacentHTML('beforeend', articlesHTML);
    }

    function handleSearch() {
        if (!elements.searchInput) return;
        
        const query = elements.searchInput.value.trim();
        elements.articleGrid.innerHTML = '';
        articles = [];
        currentPage = 1;
        allArticlesLoaded = false;
        elements.loadMoreBtn.style.display = 'block';
        
        fetchArticles(1, query);
    }

    function loadMoreArticles() {
        const query = elements.searchInput?.value.trim() || '';
        fetchArticles(currentPage, query);
    }

    // Utility Functions
    function escapeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    function formatDate(dateString) {
        try {
            const options = { year: 'numeric', month: 'short', day: 'numeric' };
            return new Date(dateString).toLocaleDateString(undefined, options);
        } catch (error) {
            console.error('Error formatting date:', error);
            return dateString;
        }
    }
});