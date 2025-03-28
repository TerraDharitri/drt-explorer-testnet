import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../common/Card";
import Table from "../common/Table";
import apiService from "../../utils/api";
import {
  formatAddress,
  formatTimestamp,
  formatRelativeTime,
  formatTokenAmount,
  formatCurrency,
} from "../../utils/formatters";
import Pagination from "../common/Pagination";
import Loading from "../common/Loading";
import Badge from "../common/Badge";
import HashLink from "../common/HashLink";
import TimeAgo from "../common/TimeAgo";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 20;
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await apiService.getTransactions(
          currentPage,
          pageSize
        );

        // Extract transactions and pagination from the response
        const { transactions, pagination } = response.data;

        setTransactions(transactions);
        setTotalPages(Math.ceil(pagination.totalCount / pageSize));

        // Calculate pagination UI data
        const totalPages = pagination.totalPages;
        const pageNumbers = [];

        // Create array of page numbers to display
        if (totalPages <= 7) {
          for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
          }
        } else {
          if (currentPage <= 4) {
            pageNumbers.push(1, 2, 3, 4, 5, "...", totalPages);
          } else if (currentPage >= totalPages - 3) {
            pageNumbers.push(
              1,
              "...",
              totalPages - 4,
              totalPages - 3,
              totalPages - 2,
              totalPages - 1,
              totalPages
            );
          } else {
            pageNumbers.push(
              1,
              "...",
              currentPage - 1,
              currentPage,
              currentPage + 1,
              "...",
              totalPages
            );
          }
        }

        setPagination({
          ...pagination,
          pageNumbers,
          startItem: (pagination.currentPage - 1) * pagination.itemsPerPage + 1,
          endItem: Math.min(
            pagination.currentPage * pagination.itemsPerPage,
            pagination.totalItems
          ),
        });
      } catch (err) {
        setError("Failed to fetch transactions");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, [currentPage, pageSize]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      success: { variant: "success", label: "Success" },
      pending: { variant: "warning", label: "Pending" },
      failed: { variant: "danger", label: "Failed" },
      invalid: { variant: "danger", label: "Invalid" },
    };

    const { variant, label } = statusMap[status] || {
      variant: "default",
      label: status,
    };

    return <Badge variant={variant}>{label}</Badge>;
  };

  // Table columns for transactions
  const txColumns = [
    {
      header: "Hash",
      accessor: "hash",
      cell: (row) => <HashLink hash={row.hash} type="tx" />,
    },
    {
      header: "From",
      accessor: "from",
      cell: (row) => <HashLink hash={row.from} type="account" length="short" />,
    },
    {
      header: "To",
      accessor: "to",
      cell: (row) => <HashLink hash={row.to} type="account" length="short" />,
    },
    {
      header: "Value",
      accessor: "value",
      cell: (row) => formatCurrency(row.value),
    },
    {
      header: "Fee",
      accessor: "fee",
      cell: (row) => formatCurrency(row.fee),
    },
    {
      header: "Status",
      accessor: "status",
      cell: (row) => getStatusBadge(row.status),
    },
    {
      header: "Time",
      accessor: "timestamp",
      cell: (row) => <TimeAgo timestamp={row.timestamp} />,
    },
  ];

  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Transactions</h1>

      <Card>
        <Table
          columns={txColumns}
          data={transactions}
          isLoading={isLoading}
          pagination={pagination}
          onPageChange={handlePageChange}
          emptyMessage="No transactions found"
        />
      </Card>
    </div>
  );
};

export default Transactions;
