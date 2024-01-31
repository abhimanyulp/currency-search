
# Currency to Country Converter

This is a simple web application built with React that allows users to search for countries associated with a particular currency.

## Features

- **Search**: Users can enter a currency code (e.g., USD, EUR) to find countries that use that currency.
- **Pagination**: Results are paginated to improve user experience.
- **Debouncing**: Search input is debounced to reduce unnecessary API requests.
- **Responsive Design**: The application is responsive and works well on different screen sizes.

## Installation

1. Clone the repository:

    ```bash
    git clone <repository_url>
    ```

2. Navigate to the project directory:

    ```bash
    cd currency-to-country-converter
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Start the development server:

    ```bash
    npm start
    ```

5. Open your browser and visit `http://localhost:3000` to view the application.

## Usage

1. Enter a currency code (e.g., USD, EUR) in the search bar.
2. Press Enter or wait for a moment to see the countries associated with the entered currency.
3. Use pagination buttons to navigate through the results.

## Dependencies

- React
- lodash.debounce
- react-flag-kit
- react-flag-icon-css