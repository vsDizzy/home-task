const { getContract } = require('../src/services/contract-service')
const { describe, it } = require('node:test')
const assert = require('node:assert/strict')

describe(getContract.name, () => {
  it('gets contract for contractor', async () => {
    const actual = await getContract(1, 5)
    assert.notEqual(actual, null)
  })

  it('gets contract for client', async () => {
    const actual = await getContract(1, 1)
    assert.notEqual(actual, null)
  })

  it('cannot get unrelated contract', async () => {
    const actual = await getContract(1, 4)
    assert.equal(actual, null)
  })
})
