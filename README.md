# Dharitri Explorer

A blockchain explorer for the Dharitri network, built with React and Tailwind CSS. This explorer provides a comprehensive interface for exploring blocks, transactions, accounts, tokens, NFTs, and validators on the Dharitri blockchain.

## Features

- **Dashboard**: Overview of network statistics and recent activity
- **Blocks Explorer**: View detailed information about blocks and their transactions
- **Transactions Explorer**: Search and browse transactions with filtering options
- **Accounts Explorer**: View account balances, transactions, and other details
- **Tokens Explorer**: Browse and search tokens on the network
- **NFTs Explorer**: View NFT collections and individual NFTs
- **Validators**: Monitor validator performance, stake, and other metrics
- **Statistics & Analytics**: Visualize network performance and metrics
- **Search**: Universal search across blocks, transactions, accounts, tokens, and NFTs
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Dark/Light Mode**: Toggle between dark and light themes

## Installation and Setup

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Installation

1. Clone this repository:

   ```
   git clone https://github.com/yourusername/dharitri-explorer.git
   cd dharitri-explorer
   ```

2. Install dependencies:

   ```
   npm install
   # or
   yarn install
   ```

3. Start the development server:

   ```
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

The project is organized into the following main directories:

- **src/components**: Reusable UI components

  - **common**: Basic UI elements (buttons, cards, tables, etc.)
  - **layout**: Layout components (navbar, footer, etc.)
  - **pages**: Page components for specific sections
  - **ui**: Enhanced UI components

- **src/pages**: Main page components for each route
- **src/utils**: Utility functions for formatting, API calls, etc.
- **src/context**: React context providers for state management

## Main Components

### Pages

- **Home**: Landing page with network overview
- **Blocks & BlockDetails**: Block explorer and details view
- **Transactions & TransactionDetails**: Transaction explorer and details view
- **Accounts & AccountDetails**: Accounts explorer and details view
- **Tokens & TokenDetails**: Tokens explorer and details view
- **NFTs & NFTDetails**: NFT explorer and details view
- **Validators**: Validator explorer with statistics
- **Statistics**: General network statistics
- **Analytics**: Advanced analytics and charts
- **SearchResults**: Universal search results page

### Utility Components

- **formatters.js**: Functions for formatting numbers, addresses, dates, etc.
- **api.js**: Functions for API interactions

## Development

### Technical Stack

- **React**: Frontend library
- **React Router**: For routing
- **Tailwind CSS**: For styling
- **Chart.js**: For charts in Analytics
- **React Icons**: For icons

### Mock Data

In the current version, we're using mock data simulating the Dharitri blockchain. In a production environment, you would replace these with actual API calls to the Dharitri blockchain.

## Future Improvements

- Connect to actual Dharitri API endpoints
- Add WebSocket support for real-time updates
- Implement more detailed analytics
- Add multi-language support
- Expand the search functionality
- Add user accounts and favorites

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Dharitri Network for providing the blockchain infrastructure
- The open-source community for the amazing tools and libraries
