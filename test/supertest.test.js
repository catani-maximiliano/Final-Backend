const chai = require("chai");
const supertest = require("supertest");

const expect = chai.expect

const requester = supertest('')

describe('Testing', () => {
  describe('Test de Products', () => {
    it('El endpoint GET /api/products debe devuelve el Status y un Payload con todos los productos', async () => {
      const { _body, status } = await requester.get('/api/products')
      expect(_body).to.have.property('payload')
      expect(status).is.equal(200)
    })

    it('El endpoint GET /api/products/pid debe devolver el producto con el id ', async () => {
      const id = '63ed6ef62c4930c20f2e046e'
      const { _body } = await requester.get(`/api/products/${id}`)

      expect(_body.payload).to.have.property('status').is.true
    })

    it('El endpoint GET /api/products/mockingproducts debe devolver mocks para 50 elementos', async () => {
      const { _body, status } = await requester.get('/api/products/mockingproducts')
      expect(_body.payload).to.have.lengthOf(50)
      expect(status).is.equal(200)
    })
  })

  describe('Testing Carts', () => {
    it('El endpoint GET /api/cart debe devuelve todos los carts', async () => {
      const { _body, status } = await requester.get('/api/carts')
      expect(_body).to.have.property('payload')
      expect(status).is.equal(200)
    })

    it('El endpoint GET /api/cart/c:id debe devuelve un cart con su id ', async () => {
      const id = '63f937f964537d9ae62d015b'
      const { _body } = await requester.get(`/api/carts/${id}`)

      expect(_body.payload).to.have.property('products')
    })
  })

  describe('Test de sessions', () => {
    it('El endpoint GET /api/sessions/current debe devuelve el Status y un Payload ', async () => {
      const { _body, status } = await requester.get('/api/sessions/current')
      expect(_body.payload.message).is.equal('No estas Logueado')
      expect(status).is.equal(200)
    })
  })

  
})