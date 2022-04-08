import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { Loader, Message } from '../components/shared'

import {
    listDocuments,
    deleteDocument,
    createDocument,
} from '../redux/actions/documentActions'
import { DOCUMENT_CREATE_RESET } from '../redux/constants/documentConstants'
import { useNavigate } from 'react-router-dom'

const AdminPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const documentList = useSelector(state => state.documentList)
    const { loading, error, documents, page, pages } = documentList

    const documentDelete = useSelector(state => state.documentDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = documentDelete

    const documentCreate = useSelector(state => state.documentCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, document: createdDocument } = documentCreate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        dispatch({ type: DOCUMENT_CREATE_RESET })

        if (!userInfo || userInfo.role !== 9) {
            navigate('/login')
        }

        if (successCreate) {
            navigate(`/admin/document/${createdDocument._id}/edit`)
        } else {
            dispatch(listDocuments(''))
        }
    }, [
        dispatch,
        navigate,
        userInfo,
        successCreate,
        successDelete,
        createdDocument,
    ])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure')) {
            dispatch(deleteDocument(id))
        }
    }

    const createDocumentHandler = (url) => {
        dispatch(createDocument())
    }

    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h1>Documents</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={createDocumentHandler}>
                        <i className='fas fa-plus'></i> Create Document
                    </Button>
                </Col>
            </Row>
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>NAME</th>
                                <th>ASSIGNED AT</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {documents.map((document) => (
                                <tr key={document._id}>
                                    <td>{document.title}</td>
                                    <td>{document.createdAt.substring(0,10)}</td>
                                    <td>
                                        <LinkContainer to={`/admin/document/${document._id}/edit`}>
                                            <Button variant='light' className='btn-sm'>
                                                <i className='fas fa-edit'></i>
                                            </Button>
                                        </LinkContainer>
                                        <Button
                                            variant='danger'
                                            className='btn-sm'
                                            onClick={() => deleteHandler(document._id)}
                                        >
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </>
            )}
        </>
    )
}

export default AdminPage