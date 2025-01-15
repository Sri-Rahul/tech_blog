# Tech Blog - Full Stack Web Application
![Screenshot 2025-01-15 150607](https://github.com/user-attachments/assets/2d883f88-9c76-426e-bbcf-5223bd5ff734)


A responsive tech blog website featuring a dynamic article showcase with a slider for highlighted posts and a paginated article grid. Built with HTML, CSS, JavaScript, and PHP.

## 📋 Features

- Responsive design that works on desktop and mobile devices
- Dynamic article slider for featured/highlighted posts
- Article grid with pagination ("Load More" functionality)
- Search functionality for articles
- Mobile-friendly navigation menu
- Dark theme with modern UI elements
- Proper error handling and loading states
- SEO-friendly structure

## 🛠 Technologies Used

- **Frontend:**
  - HTML5
  - CSS3 (with CSS Variables for theming)
  - JavaScript (ES6+)
  - Swiper.js for the slider component

- **Backend:**
  - PHP 7.4+
  - MySQL Database
  - PDO for database connections

- **Development Environment:**
  - XAMPP (Apache, MySQL)

## 🚀 Setup Instructions

### Prerequisites

1. [XAMPP](https://www.apachefriends.org/download.html) installed on your system
2. Git for version control
3. A modern web browser

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/tech_blog.git
   ```

2. **Move project to XAMPP's htdocs**
   - Copy the project folder to `C:\xampp\htdocs\` (Windows) or `/Applications/XAMPP/htdocs/` (Mac)

3. **Start XAMPP Services**
   - Start Apache and MySQL services from XAMPP Control Panel

4. **Database Setup**
   - Open phpMyAdmin (http://localhost/phpmyadmin)
   - Create a new database called `tech_blog`
   - Import the database structure:
   ```sql
     CREATE TABLE articles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    image VARCHAR(255) DEFAULT NULL,
    highlighted TINYINT(1) DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
   );
     ```
   - Add some test data:
     ```sql
     INSERT INTO articles (title, author, description, image, highlighted, created_at) VALUES
     ('The Future of AI in Everyday Life', 'John Doe', 'An in-depth look at how artificial intelligence is shaping our daily activities, from smart homes to personal assistants.', 'images/articles/article1.jpg', 
     1, '2023-10-01 10:00:00'),
     ('Top 10 Programming Languages to Learn in 2024', 'Jane Smith', 'Explore the most popular and emerging programming languages that are set to dominate the tech landscape in the coming year.', 
     'images/articles/article2.jpg', 0, '2023-09-15 14:30:00'),
     ('Cybersecurity Best Practices for Remote Workers', 'Alice Johnson', 'With the rise of remote work, ensuring the security of your data has never been more critical. Discover essential tips to protect 
     yourself.', 'images/articles/article3.jpg', 1, '2023-08-20 09:15:00'),
     ('The Rise of Quantum Computing: What You Need to Know', 'Bob Williams', 'Quantum computing is poised to revolutionize industries. Understand the basics and potential applications of this groundbreaking 
     technology.', 'images/articles/article1.jpg', 0, '2023-07-05 16:45:00'),
     ('Sustainable Tech: Innovations Driving Green Computing', 'Clara Davis', 'Sustainability meets technology. Learn about the latest innovations that are making computing more environmentally friendly.', ' 
     images/articles/article2.jpg', 0, '2023-06-18 11:20:00'),
     ('Understanding Blockchain Beyond Cryptocurrency', 'David Lee', 'Blockchain technology offers more than just the backbone of cryptocurrencies. Explore its diverse applications across various sectors.', ' 
     images/articles/article3.jpg', 1, '2023-05-22 13:50:00');
     ```

5. **Configure Database Connection**
   - Navigate to `includes/config.php`
   - Update database credentials if needed:
     ```php
     define('DB_USER', 'root');
     define('DB_PASS', '');
     ```

6. **File Permissions** (for Linux/Mac)
   ```bash
   chmod 755 -R /Applications/XAMPP/htdocs/tech_blog
   chmod 777 -R /Applications/XAMPP/htdocs/tech_blog/images
   ```

### 📁 Project Structure

```
tech-blog/
├── index.html          # Main entry point
├── css/
│   └── styles.css      # Main stylesheet
├── js/
│   └── script.js       # Main JavaScript file
├── api/
│   └── articles.php    # API endpoint for articles
├── includes/
│   └── config.php      # Database configuration
├── images/
│   └── articles/...
│   └── icons/...
│   └── placeholders/...
└── manifest.json       # PWA manifest file
```

## 🌐 Running the Application

1. Open your web browser
2. Navigate to `http://localhost/tech_blog`
3. The application should now be running

## 🔧 Troubleshooting

- **Articles not showing up?**
  - Check if MySQL service is running
  - Verify database credentials in `config.php`
  - Check browser console for JavaScript errors
  - Ensure PHP error reporting is enabled in development

- **Images not loading?**
  - Verify image paths are correct
  - Check file permissions
  - Ensure placeholder images exist in the correct directory

- **XAMPP Issues**
  - Make sure both Apache and MySQL are running
  - Check XAMPP error logs for detailed information
  - Verify ports 80 (Apache) and 3306 (MySQL) are not in use by other applications

## 💡 Additional Notes

- The application uses a responsive design approach
- CSS variables are used for easy theming
- JavaScript is modular and follows modern practices
- Error handling is implemented throughout the application
- The search functionality works on both titles and descriptions

## 👥 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## 📞 Support

For support, please open an issue in the GitHub repository.
