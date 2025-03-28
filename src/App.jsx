import React, { Suspense, lazy } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { ThemeProvider } from "./context/ThemeContext";
import ErrorBoundary from "./components/common/ErrorBoundary";
import "./App.css";

// Loading component for suspense fallback
const Loading = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

// Lazy-loaded components
const Home = lazy(() => import("./pages/Home"));
const Transactions = lazy(() => import("./pages/Transactions"));
const TransactionDetails = lazy(() => import("./pages/TransactionDetails"));
const Blocks = lazy(() => import("./pages/Blocks"));
const BlockDetails = lazy(() => import("./pages/BlockDetails"));
const Accounts = lazy(() => import("./pages/Accounts"));
const AccountDetails = lazy(() => import("./components/pages/AccountDetails"));
const Validators = lazy(() => import("./components/pages/Validators"));
const Tokens = lazy(() => import("./pages/Tokens"));
const TokenDetails = lazy(() => import("./pages/TokenDetails"));
const Statistics = lazy(() => import("./pages/Statistics"));
const Analytics = lazy(() => import("./components/pages/Analytics"));
const SearchResults = lazy(() => import("./pages/SearchResults"));
const NFTs = lazy(() => import("./pages/NFTs"));
const NFTDetails = lazy(() => import("./pages/NFTDetails"));
const Apps = lazy(() => import("./pages/Apps"));
const AppDetails = lazy(() => import("./pages/AppDetails"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  // Log that App component is initializing
  console.log("App component initializing");

  return (
    // Place Router first in the hierarchy to ensure Router context is available to all children
    <Router>
      <ThemeProvider>
        <ErrorBoundary>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow pt-16">
              <Suspense fallback={<Loading />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/transactions" element={<Transactions />} />
                  <Route
                    path="/transaction/:txHash"
                    element={<TransactionDetails />}
                  />
                  <Route path="/blocks" element={<Blocks />} />
                  <Route path="/block/:blockId" element={<BlockDetails />} />
                  <Route path="/accounts" element={<Accounts />} />
                  <Route
                    path="/account/:address"
                    element={<AccountDetails />}
                  />
                  <Route path="/validators" element={<Validators />} />
                  <Route path="/tokens" element={<Tokens />} />
                  <Route path="/token/:tokenId" element={<TokenDetails />} />
                  <Route path="/nfts" element={<NFTs />} />
                  <Route path="/nft/:nftId" element={<NFTDetails />} />
                  <Route path="/apps" element={<Apps />} />
                  <Route path="/app/:appId" element={<AppDetails />} />
                  <Route path="/statistics" element={<Statistics />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/search" element={<SearchResults />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </div>
        </ErrorBoundary>
      </ThemeProvider>
    </Router>
  );
}

export default App;
