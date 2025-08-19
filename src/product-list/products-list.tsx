import { useCallback, useEffect, useState } from "react"
import Pagination from "./pagination"

type Product = {
    id: number;
    title: string;
    price: number;
}

const ProductsList = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [pageSize, setPageSize] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    const fetchProducts = useCallback(async () => {
        const response = await fetch(`https://dummyjson.com/products?limit=${pageSize + 1}&skip=${pageSize * (currentPage - 1)}&select=title,price`)
        const data = await response.json()
        setProducts(data.products)
        setTotalPages(Math.ceil(data.total / pageSize))
    }, [pageSize, currentPage])

    useEffect(() => {
        fetchProducts()
    }, [fetchProducts])
    return (
        <div className="flex flex-col items-center justify-between h-screen py-10">
            <h1 className="font-bold text-2xl">ProductsList</h1>
            <div className="flex flex-col gap-4 max-h-1/2 overflow-y-auto px-4">
                {products.map((product) => (
                    <div key={product.id} className="flex justify-between gap-4">
                        <h2>{product.id}. {product.title}</h2>
                        <p className="font-semibold">${product.price}</p>
                    </div>
                ))}
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} pageSize={pageSize} setPageSize={setPageSize} setCurrentPage={setCurrentPage} />
        </div>
    )
}

export default ProductsList