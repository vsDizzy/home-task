const {
  getContract,
  getAllContracts,
} = require('../src/services/contract-service')
const { describe, it } = require('node:test')
const assert = require('node:assert/strict')

describe(getContract.name, () => {
  it('gets contract for contractor', async () => {
    const contract = await getContract(1, 5)
    assert.notEqual(contract, null)
  })

  it('gets contract for client', async () => {
    const contract = await getContract(1, 1)
    assert.notEqual(contract, null)
  })

  it('cannot get unrelated contract', async () => {
    const contract = await getContract(1, 4)
    assert.equal(contract, null)
  })
})

describe(getAllContracts.name, () => {
  it('omits terminated contracts', async () => {
    const contracts = await getAllContracts(1)
    assert.equal(contracts.length, 1)
  })

  it('return multiple contracts', async () => {
    const contracts = await getAllContracts(3)
    assert.equal(contracts.length, 2)
  })
})
