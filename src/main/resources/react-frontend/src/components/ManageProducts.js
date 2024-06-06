import React, { useEffect, useState } from 'react';
import { Table, Button, Form, Modal, Alert } from 'react-bootstrap';
import { FaPen, FaTrash, FaEye, FaPlus } from 'react-icons/fa';
import ProductService from '../services/ProductService';
import CategoryService from '../services/CategoryService';
import '../styles/ManageProducts.css';
import { withRouter } from 'react-router-dom';

const ManageProducts = (props) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterType, setFilterType] = useState('All');
  const [sortCriteria, setSortCriteria] = useState('priceAsc');
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [modalDescription, setModalDescription] = useState('');
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [deleteError, setDeleteError] = useState('');
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: '',
    stockQuantity: '',
    description: '',
    productType: ''
  });
  const [addError, setAddError] = useState('');

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const loadProducts = () => {
    ProductService.getAllProducts()
      .then(data => setProducts(data))
      .catch(err => {
        setError('Failed to retrieve products.');
        console.error(err);
      });
  };

  const loadCategories = () => {
    CategoryService.getAllCategories()
      .then(data => setCategories(data))
      .catch(err => {
        setError('Failed to retrieve categories.');
        console.error(err);
      });
  };

  const handleClose = () => setShowModal(false);
  const handleShow = (description) => {
    setShowModal(true);
    setModalDescription(description);
  };

  const handleDeleteClose = () => {
    setShowDeleteModal(false);
    setDeleteError('');
  };
  const handleDeleteShow = (id) => {
    setShowDeleteModal(true);
    setDeleteProductId(id);
  };

  const handleDeleteConfirm = () => {
    ProductService.deleteProduct(deleteProductId)
      .then(() => {
        setShowDeleteModal(false);
        setDeleteProductId(null);
        loadProducts();
      })
      .catch(err => {
        setDeleteError('Product can\'t be deleted because it appears in orders.');
        console.error(err);
      });
  };

  const handleEdit = (product) => {
    props.history.push({
      pathname: `/admin/products/edit/${product.id}`,
      state: { product }
    });
  };

  const handleAddShow = () => setShowAddModal(true);
  const handleAddClose = () => {
    setShowAddModal(false);
    setNewProduct({
      name: '',
      category: '',
      price: '',
      stockQuantity: '',
      description: '',
      productType: ''
    });
    setAddError('');
  };

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    ProductService.createProduct(newProduct)
      .then(() => {
        handleAddClose();
        loadProducts();
      })
      .catch(err => {
        setAddError('Failed to add product.');
        console.error(err);
      });
  };

  const handleSortChange = (e) => {
    setSortCriteria(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredAndSortedProducts = products
    .filter(product => filterCategory === 'All' || product.category === filterCategory)
    .filter(product => filterType === 'All' || product.productType === filterType)
    .filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortCriteria === 'priceAsc') {
        return a.price - b.price;
      } else if (sortCriteria === 'priceDesc') {
        return b.price - a.price;
      } else if (sortCriteria === 'quantityAsc') {
        return a.stockQuantity - b.stockQuantity;
      } else if (sortCriteria === 'quantityDesc') {
        return b.stockQuantity - a.stockQuantity;
      }
      return 0;
    });

  return (
    <div className="manage-products-container">
      <div className='title-add-container'>
        <h1 className="page-title">Manage Products</h1>
        <Button className='add-button' variant="primary" onClick={handleAddShow}>
          <FaPlus /> Add Product
        </Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}
      <div className="filters-container">
        <Form.Group controlId="searchName" className="filter-field">
          <Form.Label>Search by Name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product name"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Form.Group>
        <Form.Group controlId="filterCategory" className="filter-field">
          <Form.Label>Filter by Category:</Form.Label>
          <Form.Control
            as="select"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="All">All</option>
            {categories.map(category => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="filterType" className="filter-field">
          <Form.Label>Filter by Type:</Form.Label>
          <Form.Control
            as="select"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="All">All</option>
            <option value="BIO">Bio</option>
            <option value="NATURAL">Natural</option>
            <option value="ORGANIC">Organic</option>
            <option value="CONVENTIONAL">Conventional</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="sortCriteria" className="filter-field">
          <Form.Label>Sort by:</Form.Label>
          <Form.Control as="select" value={sortCriteria} onChange={handleSortChange}>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
            <option value="quantityAsc">Quantity: Low to High</option>
            <option value="quantityDesc">Quantity: High to Low</option>
          </Form.Control>
        </Form.Group>
      </div>
      <Table striped bordered hover className="products-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th className="category-column">Category</th>
            <th className="type-column">Type</th>
            <th className="price-column">Price</th>
            <th className="stock-column">Stock Quantity</th>
            <th style={{ width: '150px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedProducts.map((product, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td className="category-column">{product.category}</td>
              <td className="type-column">{product.productType}</td>
              <td className="price-column">${product.price}</td>
              <td className="stock-column">{product.stockQuantity}</td>
              <td>
                <Button variant="info" size="sm" className="mr-2" onClick={() => handleShow(product.description)}>
                  <FaEye />
                </Button>
                <Button variant="warning" size="sm" className="mr-2" onClick={() => handleEdit(product)}>
                  <FaPen />
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDeleteShow(product.id)}>
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Product Description</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalDescription}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteModal} onHide={handleDeleteClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {deleteError && <Alert variant="danger">{deleteError}</Alert>}
          Are you sure you want to delete this product?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showAddModal} onHide={handleAddClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {addError && <Alert variant="danger">{addError}</Alert>}
          <Form onSubmit={handleAddSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" value={newProduct.name} onChange={handleAddChange} required />
            </Form.Group>
            <Form.Group controlId="formCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                name="category"
                value={newProduct.category}
                onChange={handleAddChange}
                required
              >
                <option value="">Select Category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formType">
              <Form.Label>Type</Form.Label>
              <Form.Control
                as="select"
                name="productType"
                value={newProduct.productType}
                onChange={handleAddChange}
                required
              >
                <option value="">Select Type</option>
                <option value="BIO">Bio</option>
                <option value="NATURAL">Natural</option>
                <option value="ORGANIC">Organic</option>
                <option value="CONVENTIONAL">Conventional</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" name="price" value={newProduct.price} onChange={handleAddChange} required />
            </Form.Group>
            <Form.Group controlId="formStockQuantity">
              <Form.Label>Stock Quantity</Form.Label>
              <Form.Control type="number" name="stockQuantity" value={newProduct.stockQuantity} onChange={handleAddChange} required />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" name="description" value={newProduct.description} onChange={handleAddChange} required />
            </Form.Group>
            <Button variant="primary" type="submit" block>
              Add Product
            </Button>
            <Button variant="secondary" onClick={handleAddClose} block>
              Cancel
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default withRouter(ManageProducts);
