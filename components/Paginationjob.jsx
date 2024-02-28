import React from 'react'
import Pagination from 'react-bootstrap/Pagination';
import { Container, Row } from 'react-bootstrap'
import { useState } from 'react';
import { useRouter } from 'next/router';

const Paginationjob = (props) => {

    const totalResults = props?.totalResults;
    const resultsPerPage = 10;
    const totalPages = Math.ceil(totalResults / resultsPerPage);
    const [currentPage, setCurrentPage] = useState(1);
    const router = useRouter();

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
            const { query } = router;
            query.page = pageNumber;
            router.push({
                pathname: '/jobs',
                query: query,
            });
        }
    };

    return (
        <>
            <Container className="my-5">
                <Row>
                    <Pagination className="justify-content-center align-items-center">
                        <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />

                        {Array.from({ length: totalPages }).map((_, index) => (
                            <Pagination.Item
                                key={index}
                                active={index + 1 === currentPage}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </Pagination.Item>
                        ))}
                        <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
                    </Pagination>

                </Row>
            </Container>
        </>
    )
}

export default Paginationjob