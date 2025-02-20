import { useMediaQuery } from "@/hooks/ui/useMediaQuery"
import { DESKTOP_BREAKPOINT } from "@/config/constants"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination"


interface IShowingDisplay {
	currentPage: number;
	totalItemAmount: number;
	itemsPerPage: number;
}

const ShowingDisplay = ({
	currentPage,
	totalItemAmount,
	itemsPerPage,
}: IShowingDisplay) => {
	if (totalItemAmount === 0) {
		return null;
	}
	if (totalItemAmount === 1) {
		return <p className="text-sm md:text-base">Showing 1 item</p>;
	}
	return (
		<p className="text-sm md:text-base">
			Showing {(currentPage - 1) * itemsPerPage + 1} -{" "}
			{currentPage * itemsPerPage > totalItemAmount
				? totalItemAmount
				: currentPage * itemsPerPage}{" "}
			of {totalItemAmount} items
		</p>
	);
};

const calculatePaginationRange = (
	currentPage: number,
	maxPage: number,
	maxPagesInPagination: number,
) => {
	// Ensure we don't exceed the maxPage limit
	const totalPages = Math.min(maxPage, maxPagesInPagination);

	// Calculate the start page
	let startPage = Math.max(currentPage - Math.floor(totalPages / 2), 1);
	let endPage = startPage + totalPages - 1;

	// Adjust if endPage goes beyond maxPage
	if (endPage > maxPage) {
		endPage = maxPage;
		// Adjust startPage to ensure we always show the same number of pages
		startPage = Math.max(1, endPage - totalPages + 1);
	}

	// Generate the range of page numbers
	return Array.from(
		{ length: endPage - startPage + 1 },
		(_, index) => startPage + index,
	);
};

interface ITablePaginator {
	needsPagination: boolean;
	currentPage: number;
	maxPage: number;
	loadPage: (pageNum: number) => void;
}

const TablePaginator = ({
	needsPagination,
	currentPage,
	maxPage,
	loadPage,
}: ITablePaginator) => {
	const isDesktop = useMediaQuery(DESKTOP_BREAKPOINT);
	const maxPagesInPagination = isDesktop ? 7 : 5;
	if (!needsPagination) {
		return null;
	}

	const pagesInPagination = calculatePaginationRange(
		currentPage,
		maxPage,
		maxPagesInPagination,
	);

	return (
		<Pagination className="pt-10 md:pt-2">
			<PaginationContent>
				<PaginationItem className="hover:cursor-pointer">
					<PaginationPrevious
						onClick={() => (currentPage > 1 ? loadPage(currentPage - 1) : null)}
						className={cn(
							buttonVariants({ variant: "secondary", size: "sm" }),
							"hover:bg-ocean",
							currentPage === 1
								? "cursor-not-allowed opacity-30 hover:bg-ocean focus:bg-none"
								: "",
						)}
					/>
				</PaginationItem>

				{pagesInPagination.map((pageNum, index) => (
					<PaginationItem
						onClick={() => loadPage(pageNum)}
						className="hover:cursor-pointer"
						key={`page-${pageNum}`}
					>
						<PaginationLink isActive={currentPage === pageNum}>
							{pageNum}
						</PaginationLink>
					</PaginationItem>
				))}
				<PaginationItem className="hover:cursor-pointer">
					<PaginationNext
						onClick={() =>
							currentPage < maxPage ? loadPage(currentPage + 1) : null
						}
						className={cn(
							buttonVariants({ variant: "secondary", size: "sm" }),
							"hover:bg-ocean",
							currentPage === maxPage
								? "cursor-not-allowed opacity-30 hover:bg-ocean focus:bg-none"
								: "",
						)}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
};

export { ShowingDisplay, TablePaginator }