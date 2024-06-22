const express = require('express')
const { getProfile } = require('../middleware/getProfile')
const { getContract } = require('../services/contract-service')

const router = express.Router()

router.get('/:id', getProfile, get)

async function get(req, res) {
  const contract = await getContract(req.params.id, req.profile.id)

  if (!contract) {
    res.status(404).end('Contract not found.')
    return
  }

  res.json(contract)
}

module.exports = router
