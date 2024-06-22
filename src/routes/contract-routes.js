const express = require('express')
const { getProfile } = require('../middleware/getProfile')
const { getContract, getAllContracts } = require('../services/contract-service')

const router = express.Router()

router.get('/', getProfile, async (req, res) => {
  const contracts = await getAllContracts(req.profile.id)

  res.json(contracts)
})

router.get('/:id', getProfile, async (req, res) => {
  const contract = await getContract(req.params.id, req.profile.id)

  if (!contract) {
    res.status(404).end('Contract not found.')
    return
  }

  res.json(contract)
})

module.exports = router
