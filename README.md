# MarvelPedia

MarvelPedia is an open-source project dedicated to one of my passions, the Marvel universe. This app uses the Marvel Comics API and is built as a React application utilizing the following technologies:

- Vite for the project setup
- React Router for dynamic routing
- RTK Query to manage API calls
- Redux to handle the storage of some data and limit API calls
- React Bootstrap as a framework for components and styles

## Installation

To get started with MarvelPedia, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/MarvelPedia.git
   cd MarvelPedia
   ```
2. **Create a Marvel API key**:
    Go to [Marvel Developer Portal](https://developer.marvel.com/) and create an account to obtain a Marvel API key.

3. **Create a .env.local file**:
    Create a .env.local file in the root directory of the project with the following content:

```
    VITE_MARVEL_API_KEY=your_public_key_here
    VITE_MARVEL_API=https://gateway.marvel.com:443/v1/public/
```
4. Install dependencies:

    ```bash
    
    npm install

    ```
    
 5. Run the application:
    
    ```bash
    
        npm run dev
    ```
## Usage

Once the application is up and running, you can explore the vast Marvel universe. Use the search feature to find your favorite characters, comics, and more. The application dynamically routes through different sections using React Router and handles data fetching efficiently with RTK Query and Redux.
Features:

- Search: Quickly find characters, comics, and other Marvel-related data.
- Dynamic Routing: Navigate through the application seamlessly with React Router.
- Efficient Data Management: Utilize RTK Query and Redux for optimized API calls and state management.
- Responsive Design: Enjoy a responsive and visually appealing UI with React Bootstrap.

Contributing

We welcome contributions from the community! If you'd like to contribute, please follow these steps:

 - Fork the repository.
 - Create a new branch (git checkout -b feature/your-feature-name).
 - Commit your changes (git commit -m 'Add some feature').
 - Push to the branch (git push origin feature/your-feature-name).
 - Open a pull request.

License

This project is licensed under the MIT License. See the LICENSE file for more information.

Acknowledgments

    Thanks to Marvel for providing the API.
    Inspired by the amazing Marvel universe.

Enjoy exploring the Marvel universe with MarvelPedia!
