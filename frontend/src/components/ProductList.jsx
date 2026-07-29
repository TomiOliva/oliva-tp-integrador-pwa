import { ProductCard } from './ProductCard'

export function ProductList({
  products,
  categories,
  page,
  categoryId,
  sortValue,
  totalProducts,
  totalPages,
  pageNumbers,
  hasPreviousPage,
  hasNextPage,
  onSelectProduct,
  onAddToCart,
  onPreviousPage,
  onNextPage,
  onGoToPage,
  onChangeCategory,
  onChangeSort,
  onClearFilters,
}) {
  const hasActiveFilters = categoryId !== '' || sortValue !== 'id-asc'

  return (
    <section className="products-section">
      <div className="section-heading">
        <h2>Productos destacados</h2>
        <p>
          Pagina {page} de {totalPages} - {totalProducts} productos
        </p>
      </div>

      <div className="product-controls">
        <label>
          Categoria
          <select
            value={categoryId}
            onChange={(event) => onChangeCategory(event.target.value)}
          >
            <option value="">Todas</option>
            {categories.map((category) => (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Ordenar por
          <select
            value={sortValue}
            onChange={(event) => onChangeSort(event.target.value)}
          >
            <option value="id-asc">Orden original</option>
            <option value="name-asc">Nombre A-Z</option>
            <option value="name-desc">Nombre Z-A</option>
            <option value="price-asc">Menor precio</option>
            <option value="price-desc">Mayor precio</option>
          </select>
        </label>

        {hasActiveFilters && (
          <button
            className="clear-filters-button"
            type="button"
            onClick={onClearFilters}
          >
            Limpiar filtros
          </button>
        )}
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onSelectProduct={onSelectProduct}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>

      <div className="pagination">
        <button
          type="button"
          onClick={onPreviousPage}
          disabled={!hasPreviousPage}
        >
          Anterior
        </button>
        <div className="pagination__numbers">
          {pageNumbers.map((pageNumber) => (
            <button
              className={pageNumber === page ? 'is-active' : ''}
              type="button"
              key={pageNumber}
              onClick={() => onGoToPage(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}
        </div>
        <button type="button" onClick={onNextPage} disabled={!hasNextPage}>
          Siguiente
        </button>
      </div>
    </section>
  )
}
