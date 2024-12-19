# CS465-Full Stack Development

<b>Architecture</b> 

In this project, I worked with different types of frontend development approaches:

I started with a simple Express HTML website for the customer-facing side, which works like a traditional website where each page requires a new request to the server. I then enhanced it with JavaScript to make it more interactive. 

For the admin side, I built a Single-Page Application (SPA) using Angular. Unlike the customer-facing site, the SPA loads once and updates content dynamically without refreshing the page, making it faster and more responsive for administrators managing the travel data.

The backend uses MongoDB, a NoSQL database, because it handles unstructured data well and is ideal for our travel listings where content and fields might change frequently. Its flexibility allowed us to easily modify our travel packages without having to redesign the database structure each time - something that would be more challenging with a traditional SQL database.

<b>Functionality</b>

JSON and JavaScript serve different but complementary roles in our application. While JavaScript is the programming language that powers our application's behavior, JSON acts as the standardized format for data exchange. JSON made it possible for our frontend and backend to communicate efficiently by providing a consistent way to format data, whether we were storing travel listings in MongoDB or sending trip details to the browser.

Throughout development, I improved our code through refactoring. A key example was when I moved from hard-coded HTML to reusable UI components. For instance, I created a standardized trip card component that could display any trip's details. This not only made my code more maintainable but also ensured a consistent look across the site. When I needed to update how trips were displayed, I only had to change the code in one place instead of updating multiple pages. This same approach helped when I added features like the admin login - I could reuse components and be confident they would work consistently across the application.

<b>Testing</b>

In developing my full stack application, testing was crucial at multiple levels. My API endpoints needed thorough testing to ensure they could handle different types of requests (GET, POST, PUT) correctly. Using tools like Postman made it easier to test these endpoints by simulating requests and verifying the responses before implementing them in the actual application.

Security testing became particularly important when I added user authentication. I needed to verify that protected routes could only be accessed with valid JWT tokens, ensuring that sensitive operations like creating or modifying trips were restricted to authenticated administrators. This involved testing both successful scenarios (valid tokens) and failure scenarios (invalid or missing tokens) to ensure my security measures were working as intended. I used the website jwt.io to decode and verify the JWT tokens as part of my development process. 

The process of testing helped identify and fix several challenges, such as handling date formats correctly in the database and ensuring proper data validation before storage. MongoDB Compass proved invaluable for verifying that my data was being stored and retrieved correctly, while Chrome's Developer Tools helped track down and resolve frontend issues.

<b>Reflection</b>

This course has significantly enhanced my professional development by providing hands-on experience with full stack development. One of the most valuable skills I gained was the ability to work with multiple frameworks and technologies simultaneously - combining Express, Angular, Node.js, and MongoDB to create a complete web application. This experience is particularly relevant in today's job market where full stack developers need to be comfortable working across different layers of application development.

The project also strengthened my troubleshooting abilities. Through debugging challenges like API integration issues and database connections, I learned to use various development tools effectively. Working with Chrome Developer Tools, Postman, and MongoDB Compass gave me practical experience with the actual tools used in professional development environments.

Beyond technical skills, this course helped develop crucial project management capabilities. Breaking down the application development into manageable modules required careful planning and time management. Each phase built upon the previous one, teaching me the importance of thinking ahead and organizing code in a maintainable way.

The most valuable skill I developed was critical thinking - particularly when facing technical challenges. Rather than just following tutorials, I learned to analyze problems, research solutions, and implement fixes independently. This problem-solving approach, combined with the technical and management skills gained, has made me a more well-rounded and marketable developer.
